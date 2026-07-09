const PISTON_URL = "https://emkc.org/api/v2/piston"

const RUNTIME_MAP: Record<string, { language: string; version: string }> = {
  javascript: { language: "javascript", version: "18.15.0" },
  typescript: { language: "typescript", version: "5.0.3" },
  python: { language: "python", version: "3.10.0" },
  cpp: { language: "cpp", version: "10.2.0" },
  go: { language: "go", version: "1.16.2" },
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
      files: [{ content: code }],
      stdin,
      compile_timeout: 10000,
      run_timeout: 5000,
    }),
  })

  if (!res.ok) {
    throw new Error(`Piston API error: ${res.status}`)
  }

  return res.json()
}