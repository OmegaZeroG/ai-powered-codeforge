export type Language = 
  | "javascript"
  | "typescript" 
  | "python"
  | "cpp"
  | "go"

export type AIAction = "explain" | "fix" | "complete" | "chat"

export interface ExecuteRequest {
  code: string
  language: Language
}

export interface ExecuteResponse {
  stdout: string
  stderr: string
  exitCode: number
  executionTime: number
}

export interface AIRequest {
  action: AIAction
  code: string
  language: Language
  error?: string
  message?: string
  selectedCode?: string
}

export interface Snippet {
  id: string
  title: string
  code: string
  language: Language
  isPublic: boolean
  createdAt: Date
  updatedAt: Date
  userId?: string
}

export interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  createdAt: Date
}