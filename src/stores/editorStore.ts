import { create } from "zustand"
import { Language, ExecuteResponse } from "@/types"

interface EditorState {
  code: string
  language: Language
  isRunning: boolean
  output: ExecuteResponse | null
  fontSize: number
  setCode: (code: string) => void
  setLanguage: (language: Language) => void
  setOutput: (output: ExecuteResponse | null) => void
  setIsRunning: (isRunning: boolean) => void
  clearOutput: () => void
}

const DEFAULT_CODE: Record<Language, string> = {
  javascript: `// JavaScript\nconsole.log("Hello, CodeForge!")`,
  typescript: `// TypeScript\nconst greet = (name: string): string => {\n  return \`Hello, \${name}!\`\n}\nconsole.log(greet("CodeForge"))`,
  python: `# Python\nprint("Hello, CodeForge!")`,
  cpp: `// C++\n#include <iostream>\nint main() {\n  std::cout << "Hello, CodeForge!" << std::endl;\n  return 0;\n}`,
  go: `// Go\npackage main\nimport "fmt"\nfunc main() {\n  fmt.Println("Hello, CodeForge!")\n}`,
}

export const useEditorStore = create<EditorState>((set) => ({
  code: DEFAULT_CODE.javascript,
  language: "javascript",
  isRunning: false,
  output: null,
  fontSize: 14,

  setCode: (code) => set({ code }),
  setLanguage: (language) =>
    set({ language, code: DEFAULT_CODE[language], output: null }),
  setOutput: (output) => set({ output }),
  setIsRunning: (isRunning) => set({ isRunning }),
  clearOutput: () => set({ output: null }),
}))