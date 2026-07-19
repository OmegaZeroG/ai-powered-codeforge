"use client"

import { useEffect } from "react"
import { useEditorStore } from "@/stores/editorStore"
import { ProblemDetail } from "@/types"

export function ProblemLoader({ problem }: { problem: ProblemDetail }) {
  const setProblem = useEditorStore((state) => state.setProblem)
  const clearProblem = useEditorStore((state) => state.clearProblem)

  // Seed the editor store from the server-provided problem. Keyed ONLY on
  // problem.id: the other fields (starterCode object, statement/constraints)
  // get fresh references on every server render, so including them would re-run
  // setProblem after each router.refresh() (e.g. the one fired on an ACCEPTED
  // submit) and clobber the user's code back to the starter. A problem's
  // content can't change without its id changing, so id is the only real dep.
  useEffect(() => {
    setProblem(
      problem.id,
      problem.starterCode,
      problem.statement,
      problem.constraints
    )
    return () => clearProblem()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [problem.id])

  return null
}
