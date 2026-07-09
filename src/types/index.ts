export type Language =
  | "javascript"
  | "typescript"
  | "python"
  | "cpp"
  | "go"

export type AIAction = "explain" | "fix" | "complete" | "chat" | "hint"

export type Difficulty = "EASY" | "MEDIUM" | "HARD"

export type Verdict =
  | "PENDING"
  | "ACCEPTED"
  | "WRONG_ANSWER"
  | "RUNTIME_ERROR"
  | "TIME_LIMIT_EXCEEDED"
  | "COMPILE_ERROR"

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
  starterCode: Record<Language, string> | null
  topicId: string
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
  verdict: Verdict
  testResults: TestCaseResult[]
  runtimeMs: number | null
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