import type { UserSkill } from "@/lib/adaptive"

/* ---------------------------------------------------------------------------
   SkillMeter — makes the adaptive engine visible.
   The track spans Easy → Hard in the shared verdict color language; the
   notch marks the user's current calibration score (1–3). Server-rendered,
   pure CSS, no motion.
--------------------------------------------------------------------------- */

const TARGET_LABEL: Record<string, string> = {
  EASY: "Easy",
  MEDIUM: "Medium",
  HARD: "Hard",
}

export function SkillMeter({ skill }: { skill: UserSkill }) {
  // score ∈ [1, 3] → position ∈ [0%, 100%]
  const position = ((skill.score - 1) / 2) * 100

  return (
    <div className="border border-edge rounded-lg p-4 bg-surface">
      <div className="flex items-center justify-between mb-3">
        <span className="font-mono text-[11px] uppercase tracking-wider text-fg-muted">
          Your calibration
        </span>
        <span className="font-mono text-[11px] text-fg-faint">
          {skill.solvedCount} solved
          {skill.recentAccuracy !== null &&
            ` · ${Math.round(skill.recentAccuracy * 100)}% recent accuracy`}
        </span>
      </div>

      {/* Track: three difficulty bands with the calibration notch on top */}
      <div className="relative">
        <div className="flex h-1.5 rounded-full overflow-hidden gap-px">
          <div className="flex-1 bg-ac/30" />
          <div className="flex-1 bg-tle/30" />
          <div className="flex-1 bg-wa/30" />
        </div>
        <div
          aria-hidden
          className="absolute -top-[3px] h-3 w-[3px] rounded-full bg-brand shadow-[0_0_6px_var(--color-brand)]"
          style={{ left: `calc(${position}% - 1.5px)` }}
        />
      </div>

      <div className="flex justify-between mt-2 font-mono text-[10px] uppercase tracking-wider">
        <span className={skill.targetDifficulty === "EASY" ? "text-ac" : "text-fg-faint"}>
          Easy
        </span>
        <span className={skill.targetDifficulty === "MEDIUM" ? "text-tle" : "text-fg-faint"}>
          Medium
        </span>
        <span className={skill.targetDifficulty === "HARD" ? "text-wa" : "text-fg-faint"}>
          Hard
        </span>
      </div>

      <p className="text-fg-muted text-xs mt-3">
        The judge is currently targeting{" "}
        <span className="text-fg-dim font-medium">
          {TARGET_LABEL[skill.targetDifficulty]}
        </span>{" "}
        problems for you — solve more, and the target moves.
      </p>
    </div>
  )
}
