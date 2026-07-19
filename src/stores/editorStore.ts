import { create } from "zustand"
import { Language, SubmitResponse } from "@/types"
import { type SaveMode, DEFAULT_SAVE_MODE, writeSaveMode } from "@/lib/draft"

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
  saveMode: SaveMode
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
  setSaveMode: (mode: SaveMode) => void
}

export const DEFAULT_CODE: Record<Language, string> = {
  javascript: `// JavaScript\nconsole.log("Hello, CodeForge!")`,
  python: `# Python\nprint("Hello, CodeForge!")`,
  cpp: `// C++\n#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n  cout << "Hello, CodeForge!" << endl;\n  return 0;\n}`,
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
  // Start from the default; the Toolbar hydrates the persisted preference on
  // mount (localStorage isn't available during SSR / store init).
  saveMode: DEFAULT_SAVE_MODE,

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
  setSaveMode: (saveMode) => {
    writeSaveMode(saveMode)
    set({ saveMode })
  },
}))
