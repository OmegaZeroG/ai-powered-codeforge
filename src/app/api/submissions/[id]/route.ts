import { NextResponse } from "next/server"
import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import type { TestCaseResult } from "@/types"

// Poll target for the async pipeline. The client enqueues via POST /api/execute,
// gets a submissionId, then polls here until status is DONE or ERROR. Only
// sample test results are exposed (same as the old synchronous response) so
// hidden test cases never leak to the browser. Owner-scoped: a user can only
// read their own submissions.
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { id } = await params

  const submission = await prisma.submission.findUnique({
    where: { id },
    select: {
      userId: true,
      status: true,
      verdict: true,
      testResults: true,
      runtimeMs: true,
      queueError: true,
    },
  })

  if (!submission || submission.userId !== session.user.id) {
    return NextResponse.json({ error: "Not found" }, { status: 404 })
  }

  // testResults is JSON on the row; it is null until the worker writes a
  // verdict. Filter to samples for the client, mirroring the old route.
  const all = (submission.testResults as TestCaseResult[] | null) ?? []
  const samples = all.filter((t) => t.isSample)

  return NextResponse.json({
    status: submission.status,
    verdict: submission.verdict,
    testResults: samples,
    runtimeMs: submission.runtimeMs,
    error: submission.status === "ERROR" ? submission.queueError : null,
  })
}
