import { create } from "zustand"
import { Language, SubmitResponse } from "@/types"

interface EditorState {
  problemId: string | null
  code: string
  language: Language
  isRunning: boolean
  result: SubmitResponse | null
  fontSize: number
  setProblemId: (problemId: string | null) => void
  setCode: (code: string) => void
  setLanguage: (language: Language) => void
  setResult: (result: SubmitResponse | null) => void
  setIsRunning: (isRunning: boolean) => void
  clearResult: () => void
}

const DEFAULT_CODE: Record<Language, string> = {
  javascript: `// JavaScript\nconsole.log("Hello, CodeForge!")`,
  typescript: `// TypeScript\nconst greet = (name: string): string => {\n  return \`Hello, \${name}!\`\n}\nconsole.log(greet("CodeForge"))`,
  python: `# Python\nprint("Hello, CodeForge!")`,
  cpp: `// C++\n#include <iostream>\nint main() {\n  std::cout << "Hello, CodeForge!" << std::endl;\n  return 0;\n}`,
  go: `// Go\npackage main\nimport "fmt"\nfunc main() {\n  fmt.Println("Hello, CodeForge!")\n}`,
}

export const useEditorStore = create<EditorState>((set) => ({
  problemId: null,
  code: DEFAULT_CODE.javascript,
  language: "javascript",
  isRunning: false,
  result: null,
  fontSize: 14,

  setProblemId: (problemId) => set({ problemId }),
  setCode: (code) => set({ code }),
  setLanguage: (language) =>
    set({ language, code: DEFAULT_CODE[language], result: null }),
  setResult: (result) => set({ result }),
  setIsRunning: (isRunning) => set({ isRunning }),
  clearResult: () => set({ result: null }),
}))