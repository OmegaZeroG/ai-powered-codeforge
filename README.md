# CodeForge

A full-stack, self-hosted **DSA judge and learning platform**. Users solve data-structures & algorithms problems in an in-browser editor; submissions are compiled and run against hidden test cases inside a sandboxed execution engine, graded with per-test-case verdicts, and folded into an adaptive-difficulty and gamification system. A Socratic AI tutor helps learners *without* handing them the answer, weekly rated contests run ICPC-style scoring, and a full RBAC admin panel with an append-only audit log handles moderation.

> Not a LeetCode clone. CodeForge pairs the judge with a guardrailed AI tutor, an adaptive difficulty engine, rated contests, anti-cheat, and audited moderation — each an intentional, self-contained subsystem.

---

## Table of contents

- [Feature overview](#feature-overview)
- [Architecture](#architecture)
- [Tech stack](#tech-stack)
- [The judge pipeline](#the-judge-pipeline)
- [Notable subsystems](#notable-subsystems)
- [Getting started](#getting-started)
- [Code execution (Piston)](#code-execution-piston)
- [Environment variables](#environment-variables)
- [Admin & operational scripts](#admin--operational-scripts)
- [Project structure](#project-structure)

---

## Feature overview

**Solving & learning**
- Monaco-based code editor with multi-language support (JavaScript, Python, C++, Java).
- Problems organized by topic, each with a statement, constraints, starter code, and sample + hidden test cases.
- **Sandboxed judging** against every test case, returning granular verdicts: `ACCEPTED`, `WRONG_ANSWER`, `RUNTIME_ERROR`, `TIME_LIMIT_EXCEEDED`, `COMPILE_ERROR`.
- **Socratic AI tutor** (streaming) that nudges with questions and concepts but is hard-guardrailed to never emit a full solution; it grows more concrete only after a few turns.
- **Adaptive difficulty** — a per-user skill score derived from solved difficulty and recent accuracy recommends the next problem's difficulty.

**Progression & competition**
- **Gamification**: XP by difficulty, tiered ranks (Iron → Master with divisions), daily/weekly claimable tasks, streaks, a solve calendar, and persisted badges — all derived from existing solve data.
- **Weekly rated contests**: an admin picks a difficulty; the system auto-selects three problems and schedules the round. Live arena with countdown, **ICPC-style scoring** (solves, then time + wrong-submission penalty), a live leaderboard, an "End Contest" early-finish flow, contest XP bonuses, and per-user result cards.

**Accounts & moderation**
- Auth via email/password (bcrypt) plus GitHub and Google OAuth, on a shared user row.
- Self-service password reset with single-use, SHA-256-hashed, expiring tokens delivered over SMTP.
- **RBAC admin panel** with granular permissions: inspect users/submissions, ban/unban (permanent or timed, profile-locked), warn, revoke/restore submissions, review the anti-cheat queue, manage contests and admins.
- **Append-only audit log** recording every privileged state change.
- **Anti-cheat**: copy-poisoning of problem statements and per-problem canary tokens that flag suspected AI-pasted submissions for review (detect-and-discourage, never auto-punished).

---

## Architecture

```
                          Browser (Next.js App Router, React 19)
   Monaco editor · AI tutor panel · contest arena · admin panel · profile
                                     │
                                     │  fetch / server actions
                                     ▼
        ┌───────────────────────────────────────────���──────────────┐
        │                Next.js server (route handlers)            │
        │                                                           │
        │   /api/execute ─ judge: validate → run tests → verdict    │
        │   /api/ai ─────── streaming Socratic tutor (guardrailed)  │
        │   /api/auth ───── NextAuth (JWT, 60s RBAC/ban re-read)    │
        │   admin/_actions ─ audited moderation server actions      │
        │                                                           │
        │   lib/  piston · gamification · adaptive · contest-score  │
        │         ban · authz · anticheat · rate-limit · email      │
        └───────┬─────────────────────────┬─────────────────┬──────┘
                │                          │                 │
                ▼                          ▼                 ▼
        Piston sandbox            PostgreSQL (Neon)      External APIs
        (Docker, self-hosted)     via Prisma 7           Gemini · SMTP · OAuth
        runs untrusted code
```

The judge, tutor, and moderation flows are deliberately isolated. Business logic in `src/lib` is written as **pure functions over already-fetched data** (scoring, skill, rank, ban-state) so it can be reasoned about — and later unit-tested — without a database.

---

## Tech stack

| Layer | Choice |
|---|---|
| Framework | Next.js 16 (App Router) · React 19 · TypeScript |
| Styling / UI | Tailwind CSS v4 · shadcn/base-ui · lucide-react · Motion |
| State | Zustand |
| Editor | Monaco (`@monaco-editor/react`) |
| Auth | NextAuth v5 (JWT) — Credentials + GitHub + Google |
| Database | PostgreSQL (Neon) via Prisma 7 (Neon serverless adapter) |
| Code execution | Self-hosted [Piston](https://github.com/engineer-man/piston) in Docker |
| AI | Google Gemini via the Vercel AI SDK (streaming) |
| Email | Nodemailer (Gmail SMTP) |

---

## The judge pipeline

Judging is **asynchronous**: the web request never runs code. Submissions go on a Postgres-backed queue and a standalone worker process judges them, so the API stays fast, Piston load is bounded, and transient sandbox failures retry instead of being recorded as wrong answers.

```
POST /api/execute ──► validate ──► INSERT submission {status: QUEUED} ──► return { submissionId }
                                                │
        judge worker (npm run judge) ◄──────────┘  claims oldest QUEUED via
        FOR UPDATE SKIP LOCKED, N lanes in parallel (JUDGE_CONCURRENCY)
                                                │
        runs test cases through Piston ─► writes verdict + status: DONE
                                                │
client polls GET /api/submissions/[id] ◄────────┘  until DONE / ERROR, renders result
```

**Enqueue** (`POST /api/execute`, `src/app/api/execute/route.ts`):
1. **Auth & ban gate** — ban state is re-read from the DB (not the up-to-60s-stale JWT) so a just-issued ban blocks the next submit; an expired timed ban is a no-op.
2. **Contest validation** (if `contestId` present) — the round must be live and actually contain the problem, so a stale/forged id can't attribute a solve.
3. **Enqueue** — the `Submission` is created `QUEUED` / `PENDING` with the canary flag; `createdAt` is stamped here and is the official submit time the contest leaderboard's penalty/timing math keys off, so judging a beat later stays fair. Returns `{ submissionId }` immediately.

**Worker** (`npm run judge`, `scripts/judge-worker.mts` → `src/lib/queue.ts` + `src/lib/judge.ts`):
4. **Claim** — `claimNextJob` atomically flips the oldest `QUEUED` row to `RUNNING` with `FOR UPDATE SKIP LOCKED` (a single statement, safe on the Neon HTTP adapter). `JUDGE_CONCURRENCY` lanes claim distinct rows, which is the backpressure/concurrency limit.
5. **Per-test-case execution** — each test case's input is piped as stdin to the code in Piston (`compile_timeout` 10s, `run_timeout` 5s); `SIGKILL` → TLE, non-zero compile → CE, non-zero run → RE, mismatch → WA. First failure short-circuits.
6. **Persistence & side effects** — verdict + per-test results + runtime are written with `status: DONE`; `UserProgress` is updated; badges are synced. A **transient** Piston failure re-queues the job (up to `MAX_ATTEMPTS`) and only then becomes a terminal `ERROR` — distinct from a `WRONG_ANSWER`, so infra hiccups never count against the user. A worker killed mid-judge leaves the row `RUNNING`; a stale-sweeper returns it to the queue.

The client (`OutputPanel`, `ContestArena`) enqueues then polls `GET /api/submissions/[id]` via `src/lib/poll.ts`, showing *Queued… / Judging…* until a terminal state.

> **Scaling note:** this is the classic "design an online judge" shape. The Postgres queue swaps cleanly for Redis+BullMQ or SQS at scale; the worker is already horizontally scalable (multiple processes claim safely via `SKIP LOCKED`).
>
> **Deploy note:** the Next.js app is serverless-friendly (Vercel), but `npm run judge` is a long-lived process and won't run on Vercel's request-scoped functions — host it somewhere always-on (Railway / Render / Fly / a small VM) pointed at the same `DATABASE_URL` and `PISTON_URL`. No worker running ⇒ submissions stay `QUEUED` forever.

---

## Notable subsystems

- **`lib/contest-score.ts`** — ICPC scoring as pure functions: a problem is solved on first `ACCEPTED`; ranking is (solved DESC, penalty ASC); penalty = minutes-to-solve + 5 min per earlier wrong attempt on solved problems only. Includes contest XP (participation + rank bonus + per-solve multiplier).
- **`lib/adaptive.ts`** — DB-free skill computation: weighted average of solved difficulties, nudged by recent accuracy, mapped to a target difficulty.
- **`lib/gamification.ts`** — rank tiers, XP, streaks, solve calendar, and daily/weekly tasks, all *derived* from submissions + progress so no extra schema is needed.
- **`lib/ban.ts`** — single source of truth for "is this ban currently active", supporting permanent and timed, reversible bans.
- **`lib/anticheat.ts`** — HMAC-derived per-problem canary tokens + statement copy-poisoning.
- **`lib/rate-limit.ts`** — in-process fixed-window limiter on auth/email endpoints (honestly scoped as per-instance; swappable for Redis).
- **`lib/authz.ts` + `admin/_actions`** — permission checks enforced server-side on every admin action, each writing an `AuditLog` row.

---

## Getting started

### Prerequisites
- Node.js 20+
- A PostgreSQL database (a [Neon](https://neon.tech) connection string works out of the box)
- Docker Desktop (for the Piston execution sandbox)

### Setup

```bash
# 1. Install dependencies
npm install

# 2. Configure environment (see "Environment variables" below)
cp .env.example .env
#   then fill in the values

# 3. Apply the schema and seed problems
npx prisma migrate deploy
npx prisma db seed

# 4. Start the execution sandbox (see "Code execution" for details)
npm run piston:up
npm run piston:setup

# 5. Run the app + judge worker (separate terminals)
npm run dev          # terminal A — Next.js
npm run judge        # terminal B — standalone judge worker (see "The judge pipeline")
```

Open [http://localhost:3000](http://localhost:3000).

> The judge worker is a **separate long-running process** — submissions sit `QUEUED` and never get a verdict without it. See [The judge pipeline](#the-judge-pipeline).

To grant yourself admin access, sign in once, add your email to `ADMIN_EMAILS` in `.env`, then run `npm run admin:bootstrap`.

---

## Code execution (Piston)

CodeForge runs submitted code through [Piston](https://github.com/engineer-man/piston), a sandboxed execution engine, via `src/lib/piston.ts`. For local development you self-host it with Docker rather than depending on the public `emkc.org` API (rate-limited and not meant for production judging traffic).

### 1. Start the Piston container

Requires Docker Desktop with Linux containers (the image needs privileged mode for its sandboxing).

```bash
npm run piston:up      # brings up docker-compose.piston.yml on http://localhost:2000
npm run piston:logs    # follow status
```

### 2. Install language runtimes

A fresh Piston container has no language packages. Install the runtimes CodeForge expects (JavaScript, Python, C++, Java — kept in sync with `RUNTIME_MAP` in `src/lib/piston.ts`):

```bash
npm run piston:setup
```

This polls until the container is ready, then installs any missing packages. Safe to re-run — it skips packages already installed.

### 3. Point the app at it

In `.env` (already the default if unset, so only needed for a remote/shared instance):

```
PISTON_URL=http://localhost:2000/api/v2
```

### Shutting it down

```bash
npm run piston:down
```

Installed packages persist in a named Docker volume (`piston-packages`), so they survive across restarts.

---

## Environment variables

Copy `.env.example` to `.env` and fill in:

| Variable | Purpose |
|---|---|
| `DATABASE_URL` | PostgreSQL / Neon connection string |
| `NEXTAUTH_SECRET` | NextAuth JWT signing secret |
| `NEXTAUTH_URL` | App base URL (`http://localhost:3000` in dev) |
| `PISTON_URL` | Piston API base (defaults to local Docker) |
| `JUDGE_CONCURRENCY` | Judge worker lanes — how many submissions it judges in parallel (default `4`) |
| `ANTICHEAT_SECRET` | Secret used to derive per-problem canary tokens |
| `GOOGLE_GENERATIVE_AI_API_KEY` | Gemini key for the AI tutor ([free tier](https://aistudio.google.com/apikey)) |
| `GITHUB_CLIENT_ID` / `GITHUB_CLIENT_SECRET` | GitHub OAuth (optional) |
| `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` | Google OAuth (optional) |
| `ADMIN_EMAILS` | Comma-separated emails granted full admin by `admin:bootstrap` |
| `SMTP_USER` / `SMTP_PASS` / `EMAIL_FROM` | Gmail SMTP for password-reset email (in dev, unset → reset links are logged to the console) |

---

## Admin & operational scripts

| Script | What it does |
|---|---|
| `npm run admin:bootstrap` | Grant full permissions to the emails in `ADMIN_EMAILS` (users must have signed in once) |
| `npm run admin:whoami` | Show the current admin(s) and their permissions |
| `npm run admin:reset-password` | Reset a user's password from the CLI |
| `npm run admin:check-password` | Verify a password hash |
| `npm run piston:up` / `:down` / `:logs` / `:setup` | Manage the Piston sandbox |
| `npm run judge` | Start the standalone judge worker (claims `QUEUED` submissions and judges them). Required for any verdict to appear; run it alongside `npm run dev`. Honors `JUDGE_CONCURRENCY`. |
| `npm run judge:backfill` | One-time after adopting the async pipeline: marks already-judged historical submissions `DONE` so the worker doesn't re-judge them. Run once after `prisma db push` / `migrate`, before the worker. Idempotent. |

---

## Project structure

```
src/
├── app/
│   ├── api/            # route handlers: execute (judge), ai (tutor), auth, signup, ...
│   ├── admin/          # RBAC admin panel + audited server actions (_actions)
│   ├── contests/       # contest list, live arena, history
│   ├── problems/       # problem solving pages
│   ├── topics/         # topic browse
│   ├── profile/        # profile + gamification
│   └── editor/         # standalone editor
├── components/         # editor, AI panel, contest arena, admin controls, gamification, landing
├── lib/                # judge, scoring, skill, gamification, ban, authz, anticheat, rate-limit, email
├── stores/             # Zustand stores (editor, AI)
└── types/              # shared + next-auth type augmentation
prisma/
├── schema.prisma       # Postgres schema (Timestamptz throughout)
├── migrations/
└── seed.ts
scripts/                # admin + Piston operational scripts
```

---

*Built with Next.js 16, React 19, TypeScript, Prisma, and PostgreSQL.*
