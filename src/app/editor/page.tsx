"use client"

import { Editor } from "@/components/Editor"
import { Toolbar } from "@/components/Toolbar"
import { OutputPanel } from "@/components/OutputPanel"
import { AIPanelMount } from "@/components/AIPanelMount"

export default function EditorPage() {
  return (
    <div className="h-screen w-screen bg-ink flex flex-col overflow-hidden">
      {/* Top bar */}
      <Toolbar />

      {/* Main area */}
      <div className="flex-1 flex overflow-hidden min-h-0">
        {/* Editor */}
        <div className="flex-1 flex flex-col overflow-hidden min-h-0">
          {/* Code editor takes the top; output panel is fixed-height below */}
          <div className="flex-1 overflow-hidden min-h-0">
            <Editor />
          </div>

          <div className="h-56 shrink-0">
            <OutputPanel />
          </div>
        </div>

        {/* AI assistant panel (mounts when toggled open). In the scratchpad it
            acts as a code reviewer, not the Socratic problem tutor. */}
        <AIPanelMount />
      </div>
    </div>
  )
}