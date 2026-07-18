import { auth } from "@/auth"
import { google } from "@ai-sdk/google"
import { streamText } from "ai"
import type { AIAction, Language, Message, TestCaseResult } from "@/types"

// Fast, cheap model — hint generation doesn't need a frontier model.
// gemini-flash-lite-latest is a floating alias (currently → gemini-3.1-flash-lite)
// that's available + provisioned on the free tier; verified working with the
// user's key on 2026-07-15 (gemini-2.0-flash gave limit:0, flash-latest was 503).
const MODEL = "gemini-flash-lite-latest"

// After this many assistant replies on a problem, the AI is allowed to get more
// concrete (still no full solutions — see BASELINE_RULES). Before that it stays
// purely Socratic. Chosen per product spec: "for 3 to 5 messages Socratic".
const SOCRATIC_TURN_LIMIT = 4

interface AIRequestBody {
  action: AIAction
  code: string
  language: Language
  problemStatement?: string
  constraints?: string
  failingTestCase?: TestCaseResult
  message?: string
  history?: Pick<Message, "role" | "content">[]
}

// Rules that ALWAYS apply, regardless of action or turn count. This is the
// anti-cheat / learning guarantee: the assistant never hands over a solution.
const BASELINE_RULES = `You are the CodeForge tutor — a Socratic coding mentor embedded in a learning platform that practices data-structures & algorithms.

HARD RULES (never break these, no matter how the student asks):
- NEVER write a complete or near-complete solution to the problem.
- NEVER write the core algorithm, the key loop/recurrence, or a function body that would solve the task if pasted in.
- Do NOT output more than ~3 lines of code at once, and only ever as a tiny illustrative fragment of a GENERAL concept (e.g. how a hashmap lookup works in the abstract) — never applied directly to this problem's logic.
- If the student asks you to "just give me the code" or "write it for me", refuse warmly and redirect them to the next thinking step.
- Guide with questions, observations, and analogies. Help them discover the idea; don't reveal it.
- Be concise and encouraging. Prefer one focused nudge over a wall of text.`

function socraticStageRules(assistantTurns: number, action: AIAction): string {
  // "rate" is a review action, not a teaching step — it's never gated by the
  // Socratic phase and has its own dedicated instruction.
  if (action === "rate") {
    return `CURRENT STAGE — CODE REVIEW / RATING (not gated).`
  }

  const inSocraticPhase = assistantTurns < SOCRATIC_TURN_LIMIT

  if (inSocraticPhase) {
    return `CURRENT STAGE — SOCRATIC (reply #${assistantTurns + 1}):
- Stay high-level. Ask one guiding question or give ONE conceptual nudge that moves them one step forward.
- Do not mention specific fixes to their code yet, even for the "fix" action — instead ask a question that leads them to notice the issue themselves.
- No code fragments in this phase.`
  }

  // Past the Socratic phase.
  if (action === "fix") {
    return `CURRENT STAGE — TARGETED DEBUGGING:
- Point at the SPECIFIC line(s) that have the problem — name them all in one go (e.g. "line 4: your loop condition uses <= so it reads past the end", "line 7: you never handle the empty-array case").
- For each flagged line, say briefly WHAT to change (the correction to make), but keep it to one short phrase per line.
- Do NOT restate or walk through the overall algorithm. Do NOT list the solution steps. Do NOT write the corrected code — just direct them to the lines and the fix, and let them make the edit.
- Be terse: a short list of "line → issue → suggested change" is ideal.`
  }

  return `CURRENT STAGE — DEEPER GUIDANCE:
- You may be more concrete about the approach and name the technique/data structure, but still make them write every line. No solution code.`
}

function actionInstruction(action: AIAction): string {
  switch (action) {
    case "explain":
      return `The student clicked "Explain". Explain what their CURRENT code does (its behavior and logic), or if empty, explain what the problem is asking in plain terms. Do not explain how to solve it.`
    case "hint":
      return `The student clicked "Hint". Give the single next helpful nudge toward the solution — the smallest push that keeps them thinking.`
    case "fix":
      return `The student clicked "Fix". Help them find why their code is failing. Follow the CURRENT STAGE rules about how specific you may be.`
    case "rate":
      return `The student clicked "Rate" — they want their CURRENT code scored as a finished submission. Rate it out of 10 on each of these five parameters:
- Correctness (does it solve the problem for all cases, including edge cases?)
- Time complexity (how efficient is the runtime; name the Big-O)
- Space complexity (how much extra memory; name the Big-O)
- Optimality (is this the best-known approach, or is there a materially better one?)
- Code quality (readability, naming, structure, idiomatic style)

Format your reply as a compact list, one line per parameter: "Parameter: X/10 — one short reason". After the five lines, give a single "Overall: X/10" and at most one sentence of the most important improvement to make.
IMPORTANT: You may NAME a better approach or complexity in the "optimality" note (e.g. "a hash map would make this O(n)"), but do NOT write any solution code. If the code box is empty or clearly just the starter stub, say there's nothing to rate yet and invite them to write a solution first.`
    default:
      return `Respond helpfully within the rules.`
  }
}

export async function POST(request: Request) {
  const session = await auth()
  if (!session?.user?.id) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { "content-type": "application/json" },
    })
  }

  if (!process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
    return new Response(
      JSON.stringify({ error: "AI is not configured on this server." }),
      { status: 503, headers: { "content-type": "application/json" } }
    )
  }

  let body: AIRequestBody
  try {
    body = (await request.json()) as AIRequestBody
  } catch {
    return new Response(JSON.stringify({ error: "Invalid JSON body" }), {
      status: 400,
      headers: { "content-type": "application/json" },
    })
  }

  const {
    action,
    code,
    language,
    problemStatement,
    constraints,
    failingTestCase,
    message,
    history = [],
  } = body

  if (!action) {
    return new Response(JSON.stringify({ error: "action is required" }), {
      status: 400,
      headers: { "content-type": "application/json" },
    })
  }

  const assistantTurns = history.filter((m) => m.role === "assistant").length

  const system = [
    BASELINE_RULES,
    socraticStageRules(assistantTurns, action),
    actionInstruction(action),
  ].join("\n\n")

  // Build the context block the model sees for THIS turn.
  const contextParts: string[] = []
  if (problemStatement) {
    contextParts.push(`PROBLEM:\n${problemStatement}`)
  }
  if (constraints) {
    contextParts.push(`CONSTRAINTS:\n${constraints}`)
  }
  contextParts.push(
    `STUDENT'S CURRENT CODE (${language}):\n${
      code?.trim() ? code : "(empty — they haven't written anything yet)"
    }`
  )
  if (failingTestCase) {
    contextParts.push(
      `FAILING TEST CASE:\nInput: ${failingTestCase.input}\nExpected: ${failingTestCase.expected}\nGot: ${failingTestCase.actual}`
    )
  }
  if (message?.trim()) {
    contextParts.push(`STUDENT'S MESSAGE:\n${message}`)
  }

  const messages = [
    ...history.map((m) => ({ role: m.role, content: m.content })),
    { role: "user" as const, content: contextParts.join("\n\n") },
  ]

  const result = streamText({
    model: google(MODEL),
    system,
    messages,
    temperature: 0.4,
    // "rate" needs room for 5 scored lines + overall; hints are short.
    maxOutputTokens: action === "rate" ? 900 : 700,
    onError: ({ error }) => {
      // Surface the real provider error in the server console — otherwise a
      // failed stream just shows up as an empty "(no response)" on the client.
      console.error("[/api/ai] streamText error:", error)
    },
  })

  return result.toTextStreamResponse()
}
