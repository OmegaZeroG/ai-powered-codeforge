import { useEffect, useState } from "react"

const QUERY = "(min-width: 768px)"

/** True at md+ (Tailwind's `md` breakpoint). Used to skip drag-resize inline
 *  widths and resize handles on mobile, where panels stack full-width instead. */
export function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(false)

  useEffect(() => {
    const mql = window.matchMedia(QUERY)
    setIsDesktop(mql.matches)
    const onChange = (e: MediaQueryListEvent) => setIsDesktop(e.matches)
    mql.addEventListener("change", onChange)
    return () => mql.removeEventListener("change", onChange)
  }, [])

  return isDesktop
}
