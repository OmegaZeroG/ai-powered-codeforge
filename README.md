This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Code execution (Piston)

CodeForge runs submitted code through [Piston](https://github.com/engineer-man/piston), a sandboxed code execution engine, via `src/lib/piston.ts`. For local development you self-host it with Docker rather than depending on the public `emkc.org` API (which is rate-limited and not meant for production judging traffic).

### 1. Start the Piston container

Requires Docker Desktop with Linux containers (the image needs privileged mode to set up its sandboxing).

```bash
npm run piston:up
```

This brings up `docker-compose.piston.yml`, exposing the API on `http://localhost:2000`. Check status with:

```bash
npm run piston:logs
```

### 2. Install language runtimes

A fresh Piston container has no language packages installed. Install the runtimes CodeForge expects (JavaScript, TypeScript, Python, C++, Go — kept in sync with `RUNTIME_MAP` in `src/lib/piston.ts`):

```bash
npm run piston:setup
```

This polls the container until it's ready, then installs any missing packages. Safe to re-run — it skips packages that are already installed.

### 3. Point the app at it

In `.env`:

```
PISTON_URL=http://localhost:2000/api/v2
```

This is already the default if `PISTON_URL` is unset, so it only needs to be explicit if you're pointing at a remote/shared Piston instance instead.

### Shutting it down

```bash
npm run piston:down
```

Installed packages persist in a named Docker volume (`piston-packages`), so you won't need to reinstall them next time you run `piston:up`.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
