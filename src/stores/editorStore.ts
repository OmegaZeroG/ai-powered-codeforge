import { create } from "zustand"
import { Language, SubmitResponse } from "@/types"

interface EditorState {
  problemId: string | null
  problemStarterCode: Partial<Record<Language, string>> | null
  problemStatement: string | null
  problemConstraints: string | null
  code: string
  language: Language
  isRunning: boolean
  result: SubmitResponse | null
  fontSize: number
  setProblem: (
    problemId: string,
    starterCode: Partial<Record<Language, string>> | null,
    statement?: string | null,
    constraints?: string | null
  ) => void
  clearProblem: () => void
  resetCode: () => void
  setCode: (code: string) => void
  setLanguage: (language: Language) => void
  setResult: (result: SubmitResponse | null) => void
  setIsRunning: (isRunning: boolean) => void
  clearResult: () => void
}

const DEFAULT_CODE: Record<Language, string> = {
  javascript: `// JavaScript\nconsole.log("Hello, CodeForge!")`,
  python: `# Python\nprint("Hello, CodeForge!")`,
  cpp: `// C++\n#include <iostream>\nint main() {\n  std::cout << "Hello, CodeForge!" << std::endl;\n  return 0;\n}`,
  java: `// Java\npublic class Main {\n  public static void main(String[] args) {\n    System.out.println("Hello, CodeForge!");\n  }\n}`,
}

export const useEditorStore = create<EditorState>((set, get) => ({
  problemId: null,
  problemStarterCode: null,
  problemStatement: null,
  problemConstraints: null,
  code: DEFAULT_CODE.javascript,
  language: "javascript",
  isRunning: false,
  result: null,
  fontSize: 14,

  setProblem: (problemId, starterCode, statement = null, constraints = null) => {
    const { language } = get()
    set({
      problemId,
      problemStarterCode: starterCode,
      problemStatement: statement,
      problemConstraints: constraints,
      code: starterCode?.[language] ?? DEFAULT_CODE[language],
      result: null,
    })
  },
  clearProblem: () =>
    set((state) => ({
      problemId: null,
      problemStarterCode: null,
      problemStatement: null,
      problemConstraints: null,
      code: DEFAULT_CODE[state.language],
      result: null,
    })),
  resetCode: () =>
    set((state) => ({
      code: state.problemStarterCode?.[state.language] ?? DEFAULT_CODE[state.language],
      result: null,
    })),
  setCode: (code) => set({ code }),
  setLanguage: (language) =>
    set((state) => ({
      language,
      code: state.problemStarterCode?.[language] ?? DEFAULT_CODE[language],
      result: null,
    })),
  setResult: (result) => set({ result }),
  setIsRunning: (isRunning) => set({ isRunning }),
  clearResult: () => set({ result: null }),
}))
