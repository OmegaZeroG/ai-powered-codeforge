"use client"

import { useEffect } from "react"
import { useEditorStore } from "@/stores/editorStore"
import { ProblemDetail } from "@/types"

export function ProblemLoader({ problem }: { problem: ProblemDetail }) {
  const setProblem = useEditorStore((state) => state.setProblem)
  const clearProblem = useEditorStore((state) => state.clearProblem)

  useEffect(() => {
    setProblem(problem.id, problem.starterCode)
    return () => clearProblem()
  }, [problem.id, problem.starterCode, setProblem, clearProblem])

  return null
}
