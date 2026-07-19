import type { SubmissionStatus, SubmitResponse } from "@/types"

// Shape returned by GET /api/submissions/[id].
interface StatusPayload {
  status: SubmissionStatus
  verdict: SubmitResponse["verdict"]
  testResults: SubmitResponse["testResults"]
  runtimeMs: number | null
  error?: string | null
}

interface PollOptions {
  // Called on each poll with the current transient status, for UI text like
  // "Queued..." / "Judging...". Not called for the terminal state.
  onStatus?: (status: SubmissionStatus) => void
  intervalMs?: number
  // Give up after this long and surface a judge ERROR, so a wedged worker or
  // lost job never leaves the UI spinning forever.
  timeoutMs?: number
}

// Poll a submission until it reaches a terminal state (DONE or ERROR) and
// resolve with a SubmitResponse the existing result UI can render as-is.
// Shared by OutputPanel (practice) and ContestArena (contest).
export async function pollSubmission(
  submissionId: string,
  { onStatus, intervalMs = 700, timeoutMs = 60_000 }: PollOptions = {}
): Promise<SubmitResponse> {
  const deadline = Date.now() + timeoutMs

  // Small helper so we don't pull in a timers dependency.
  const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms))

  while (Date.now() <= deadline) {
    const res = await fetch(`/api/submissions/${submissionId}`)
    if (!res.ok) {
      throw new Error(
        res.status === 404 ? "Submission not found" : "Failed to read submission status"
      )
    }
    const data: StatusPayload = await res.json()

    if (data.status === "DONE") {
      return {
        status: "DONE",
        verdict: data.verdict,
        testResults: data.testResults,
        runtimeMs: data.runtimeMs,
      }
    }

    if (data.status === "ERROR") {
      return {
        status: "ERROR",
        verdict: data.verdict,
        testResults: data.testResults ?? [],
        runtimeMs: data.runtimeMs,
        error: data.error ?? "The judge is temporarily unavailable. Please try again.",
      }
    }

    onStatus?.(data.status)
    await sleep(intervalMs)
  }

  // Deadline passed without a terminal state: surface a judge timeout so a
  // wedged worker or lost job never leaves the UI spinning forever.
  return {
    status: "ERROR",
    verdict: "PENDING",
    testResults: [],
    runtimeMs: null,
    error: "Judging timed out. The judge may be busy -- please try again.",
  }
}
