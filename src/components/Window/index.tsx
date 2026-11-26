'use client'
import { useEffect, useState } from "react"

type WindowProps = {
  title: string
  children: React.ReactNode
  className?: string
  bodyClassName?: string
  // Shows a ✕ box that calls this; content windows leave it out.
  onClose?: () => void
}

const boxClass =
  "flex h-5 w-5 items-center justify-center border border-bg bg-bg text-xs font-bold leading-none text-fg hover:bg-fg hover:text-bg hover:border-bg"

// A Windows 95-style window in black and white: hard border, offset shadow,
// solid title bar. The □ box maximizes it to fill the screen (Escape or ❐ restores).
// Uses fg/bg so it inverts in dark mode.
const Window = ({ title, children, className = "", bodyClassName = "p-5 sm:p-6", onClose }: WindowProps) => {
  const [maximized, setMaximized] = useState(false)

  useEffect(() => {
    if (!maximized) return
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setMaximized(false) }
    // keep the page behind from scrolling while the window fills the screen
    const overflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    document.addEventListener("keydown", onKey)
    return () => {
      document.body.style.overflow = overflow
      document.removeEventListener("keydown", onKey)
    }
  }, [maximized])

  // Title-bar clicks must not reach a clickable parent (e.g. a project card).
  const stop = (e: React.SyntheticEvent) => e.stopPropagation()

  return (
    <div
      // while maximized, clicks stay inside the window instead of reaching a clickable parent
      onClick={maximized ? stop : undefined}
      className={`flex flex-col border-2 border-fg bg-bg text-fg ${
        maximized ? "fixed inset-0 z-[70]" : `shadow-win ${className}`
      }`}
    >
      <div className="flex shrink-0 items-center justify-between gap-3 bg-fg px-2 py-1 text-bg">
        <span className="truncate font-mono text-sm font-bold">{title}</span>
        <div className="flex shrink-0 gap-1" onClick={stop} onKeyDown={stop}>
          <button
            type="button"
            onClick={() => setMaximized((m) => !m)}
            aria-label={maximized ? "Restore window" : "Maximize window"}
            aria-pressed={maximized}
            className={boxClass}
          >
            {maximized ? "❐" : "□"}
          </button>
          {onClose && (
            <button type="button" onClick={onClose} aria-label="Close" className={boxClass}>
              ✕
            </button>
          )}
        </div>
      </div>
      <div className={`${maximized ? "flex-1 overflow-y-auto" : "flex-1"} ${bodyClassName}`}>{children}</div>
    </div>
  )
}

export default Window
