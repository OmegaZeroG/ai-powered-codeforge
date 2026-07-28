"use client"

import { Toolbar } from "@/components/Toolbar"
import { EditorOutputSplit } from "@/components/EditorOutputSplit"
import { AIPanelMount } from "@/components/AIPanelMount"

export default function EditorPage() {
  return (
    <div className="h-screen w-screen bg-ink flex flex-col overflow-hidden">
      {/* Top bar */}
      <Toolbar />

      {/* Main area */}
      <div className="flex-1 flex overflow-hidden min-h-0">
        <EditorOutputSplit />

        {/* AI assistant panel (mounts when toggled open, drag handle on its
            left edge). In the scratchpad it acts as a code reviewer, not the
            Socratic problem tutor. */}
        <AIPanelMount />
      </div>
    </div>
  )
}