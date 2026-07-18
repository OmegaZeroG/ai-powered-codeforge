"use client"

import { Editor } from "@/components/Editor"
import { Toolbar } from "@/components/Toolbar"
import { OutputPanel } from "@/components/OutputPanel"

export default function EditorPage() {
  return (
    <div className="h-screen w-screen bg-ink flex flex-col overflow-hidden">
      {/* Top bar */}
      <Toolbar />

      {/* Main area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Editor */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Code editor takes 65% height */}
          <div className="flex-1 overflow-hidden">
            <Editor />
          </div>

          {/* Output panel takes 35% height */}
          <div className="h-56">
            <OutputPanel />
          </div>
        </div>
      </div>
    </div>
  )
}