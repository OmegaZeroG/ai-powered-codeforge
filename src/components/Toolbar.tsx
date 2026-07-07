"use client"

import { useSession, signOut } from "next-auth/react"
import { useEditorStore } from "@/stores/editorStore"
import { useAIStore } from "@/stores/aiStore"
import { Language } from "@/types"
import { Sparkles, Share2, Save, LogOut } from "lucide-react"

const LANGUAGES: { value: Language; label: string }[] = [
  { value: "javascript", label: "JavaScript" },
  { value: "typescript", label: "TypeScript" },
  { value: "python", label: "Python" },
  { value: "cpp", label: "C++" },
  { value: "go", label: "Go" },
]

export function Toolbar() {
  const { language, setLanguage } = useEditorStore()
  const { togglePanel, isPanelOpen } = useAIStore()
  const { data: session, status } = useSession()

  return (
    <div className="h-12 bg-[#111118] border-b border-[#2A2A38] flex items-center justify-between px-4">
      {/* Left — Logo */}
      <div className="flex items-center gap-3">
        <span className="text-white font-semibold text-base">
          CodeForge
        </span>

        {/* Language selector */}
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value as Language)}
          className="bg-[#1A1A24] text-[#F0F0FF] text-sm border border-[#2A2A38] rounded-md px-3 py-1 focus:outline-none focus:border-[#7C6AF7] cursor-pointer"
        >
          {LANGUAGES.map((lang) => (
            <option key={lang.value} value={lang.value}>
              {lang.label}
            </option>
          ))}
        </select>
      </div>

      {/* Right — Actions */}
      <div className="flex items-center gap-2">
        <button
          onClick={togglePanel}
          className={`flex items-center gap-2 text-sm px-3 py-1.5 rounded-md transition-colors ${
            isPanelOpen
              ? "bg-[#7C6AF7] text-white"
              : "text-[#8888A8] hover:text-white hover:bg-[#1A1A24]"
          }`}
        >
          <Sparkles size={14} />
          AI
        </button>

        <button className="flex items-center gap-2 text-sm px-3 py-1.5 rounded-md text-[#8888A8] hover:text-white hover:bg-[#1A1A24] transition-colors">
          <Save size={14} />
          Save
        </button>

        <button className="flex items-center gap-2 text-sm px-3 py-1.5 rounded-md text-[#8888A8] hover:text-white hover:bg-[#1A1A24] transition-colors">
          <Share2 size={14} />
          Share
        </button>

        {/* Session info + logout */}
        {status === "authenticated" && session?.user && (
          <div className="flex items-center gap-2 pl-3 ml-1 border-l border-[#2A2A38]">
            <span className="text-[#8888A8] text-sm max-w-[140px] truncate">
              {session.user.name || session.user.email}
            </span>
            <button
              onClick={() => signOut({ callbackUrl: "/login" })}
              className="flex items-center gap-1.5 text-sm px-2.5 py-1.5 rounded-md text-[#8888A8] hover:text-[#F87171] hover:bg-[#1A1A24] transition-colors"
              title="Log out"
            >
              <LogOut size={14} />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}