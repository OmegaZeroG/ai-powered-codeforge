export type Language =
  | "javascript"
  | "python"
  | "cpp"
  | "java"

export type AIAction =
  | "explain"
  | "fix"
  | "complete"
  | "chat"
  | "hint"
  | "rate"
  | "review"

export type Difficulty = "EASY" | "MEDIUM" | "HARD"

export type Verdict =
  | "PENDING"
  | "ACCEPTED"
  | "WRONG_ANSWER"
  | "RUNTIME_ERROR"
  | "TIME_LIMIT_EXCEEDED"
  | "COMPILE_ERROR"

// Lifecycle of a submission in the async judging pipeline (mirrors the Prisma
// enum SubmissionStatus). QUEUED/RUNNING are transient; DONE/ERROR terminal.
export type SubmissionStatus = "QUEUED" | "RUNNING" | "DONE" | "ERROR"

export type ProgressStatus = "NOT_STARTED" | "IN_PROGRESS" | "SOLVED"

export interface Topic {
  id: string
  name: string
  slug: string
  description: string | null
  order: number
}

export interface Problem {
  id: string
  title: string
  slug: string
  statement: string
  constraints: string | null
  difficulty: Difficulty
  order: number
  starterCode: Partial<Record<Language, string>> | null
  copyProtected: boolean
  topicId: string
}

export interface SampleTestCase {
  input: string
  expected: string
  isSample: boolean
}

export interface ProblemDetail {
  id: string
  title: string
  slug: string
  statement: string
  constraints: string | null
  difficulty: Difficulty
  starterCode: Partial<Record<Language, string>> | null
  copyProtected: boolean
  topic: { id: string; name: string; slug: string }
  sampleTestCases: SampleTestCase[]
}

export interface TestCaseResult {
  input: string
  expected: string
  actual: string
  passed: boolean
  isSample: boolean
}

export interface SubmitRequest {
  problemId: string
  code: string
  language: Language
}

export interface SubmitResponse {
  status: SubmissionStatus
  verdict: Verdict
  testResults: TestCaseResult[]
  runtimeMs: number | null
  // Set only when status is ERROR: the judge itself failed (e.g. Piston
  // unreachable) rather than the code producing a verdict.
  error?: string | null
}

// Immediate response from POST /api/execute: the job is queued, not yet judged.
export interface EnqueueResponse {
  submissionId: string
  status: SubmissionStatus
}

// Response from POST /api/run: a one-off scratchpad execution (no problem, no
// test cases). Just the raw program output, run synchronously through Piston.
export interface RunResponse {
  stdout: string
  stderr: string
  exitCode: number
  signal: string | null
  timedOut: boolean
  compileFailed: boolean
  runtimeMs: number
}

export interface AIRequest {
  action: AIAction
  code: string
  language: Language
  problemStatement?: string
  failingTestCase?: TestCaseResult
  message?: string
}

export interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  createdAt: Date
}