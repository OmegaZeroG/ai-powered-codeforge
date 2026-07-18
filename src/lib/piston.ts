const PISTON_URL = process.env.PISTON_URL || "http://localhost:2000/api/v2"

const RUNTIME_MAP: Record<
  string,
  { language: string; version: string; fileName?: string }
> = {
  javascript: { language: "javascript", version: "18.15.0" },
  python: { language: "python", version: "3.10.0" },
  cpp: { language: "c++", version: "10.2.0" },
  java: { language: "java", version: "15.0.2", fileName: "Main.java" },
}

interface PistonRunResult {
  run: {
    stdout: string
    stderr: string
    code: number
    signal: string | null
  }
  compile?: {
    stdout: string
    stderr: string
    code: number
  }
}

export async function runCode(
  language: string,
  code: string,
  stdin: string
): Promise<PistonRunResult> {
  const runtime = RUNTIME_MAP[language]
  if (!runtime) {
    throw new Error(`Unsupported language: ${language}`)
  }

  const res = await fetch(`${PISTON_URL}/execute`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      language: runtime.language,
      version: runtime.version,
      files: [
        runtime.fileName
          ? { name: runtime.fileName, content: code }
          : { content: code },
      ],
      stdin,
      compile_timeout: 10000,
      run_timeout: 5000,
    }),
  })

  if (!res.ok) {
    const body = await res.text()
    throw new Error(`Piston execution failed: ${res.status} ${body}`)
  }

  return res.json()
}
