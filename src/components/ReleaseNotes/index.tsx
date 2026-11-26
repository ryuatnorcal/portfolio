'use client'
import { useCallback, useEffect, useRef, useState } from "react"

type Release = {
  id: number
  name: string
  tag: string
  body: string
  url: string
  publishedAt: string | null
}

type State =
  | { status: "idle" | "loading" }
  | { status: "error" }
  | { status: "ready"; releases: Release[]; repoUrl: string }

const SEEN_KEY = "release-notes-seen"

// Minimal markdown: headings, bullets and paragraphs. Release notes rarely
// need more, and it keeps us from pulling in a markdown library.
const ReleaseBody = ({ body }: { body: string }) => {
  const lines = body.replace(/\r/g, "").split("\n")
  const clean = (s: string) => s.replace(/\*\*(.+?)\*\*/g, "$1").replace(/`([^`]+)`/g, "$1")
  return (
    <div className="space-y-1 text-sm text-black">
      {lines.map((line, i) => {
        const t = line.trim()
        if (!t) return null
        const heading = t.match(/^#{1,6}\s+(.*)/)
        if (heading) return <p key={i} className="pt-1 font-semibold">{clean(heading[1])}</p>
        const bullet = t.match(/^[-*+]\s+(.*)/)
        if (bullet) return <p key={i} className="pl-3 -indent-3">• {clean(bullet[1])}</p>
        return <p key={i}>{clean(t)}</p>
      })}
    </div>
  )
}

const ReleaseNotes = () => {
  const [open, setOpen] = useState(false)
  const [state, setState] = useState<State>({ status: "idle" })
  const [hasNew, setHasNew] = useState(false)
  const panelRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)

  const load = useCallback(async () => {
    setState({ status: "loading" })
    try {
      const res = await fetch("/api/releases")
      if (!res.ok) throw new Error()
      const data = await res.json()
      setState({ status: "ready", releases: data.releases, repoUrl: data.repoUrl })
      return data.releases as Release[]
    } catch {
      setState({ status: "error" })
      return []
    }
  }, [])

  // Load once on mount so we can show a dot when there's an unseen release.
  useEffect(() => {
    load().then((releases) => {
      const latest = releases[0]
      if (latest && localStorage.getItem(SEEN_KEY) !== String(latest.id)) setHasNew(true)
    })
  }, [load])

  // Mark the latest release as seen when the panel is opened.
  useEffect(() => {
    if (!open || state.status !== "ready") return
    const latest = state.releases[0]
    if (latest) localStorage.setItem(SEEN_KEY, String(latest.id))
    setHasNew(false)
  }, [open, state])

  // Close on Escape or a click outside.
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false)
        buttonRef.current?.focus()
      }
    }
    const onClick = (e: MouseEvent) => {
      const target = e.target as Node
      if (!panelRef.current?.contains(target) && !buttonRef.current?.contains(target)) setOpen(false)
    }
    document.addEventListener("keydown", onKey)
    document.addEventListener("mousedown", onClick)
    return () => {
      document.removeEventListener("keydown", onKey)
      document.removeEventListener("mousedown", onClick)
    }
  }, [open])

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3">
      {open && (
        <div
          ref={panelRef}
          id="release-notes-panel"
          role="dialog"
          aria-label="Release notes"
          className="flex max-h-[70vh] w-[min(22rem,calc(100vw-2.5rem))] flex-col overflow-hidden border-2 border-black bg-white text-black shadow-[4px_4px_0_0_#000]"
        >
          <div className="flex items-center justify-between bg-black px-2 py-1 text-white">
            <h2 className="font-mono text-sm font-bold">What&apos;s new</h2>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close release notes"
              className="flex h-5 w-5 items-center justify-center border border-white bg-white text-xs font-bold leading-none text-black hover:bg-black hover:text-white"
            >
              ✕
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-4 py-3">
            {(state.status === "idle" || state.status === "loading") && (
              <p className="text-sm text-black">Loading…</p>
            )}
            {state.status === "error" && (
              <div className="space-y-2 text-sm text-black">
                <p>Couldn&apos;t load release notes.</p>
                <button type="button" onClick={load} className="text-black underline hover:underline">Try again</button>
              </div>
            )}
            {state.status === "ready" && state.releases.length === 0 && (
              <p className="text-sm text-black">No releases yet.</p>
            )}
            {state.status === "ready" && state.releases.length > 0 && (
              <ul className="space-y-5">
                {state.releases.map((r) => (
                  <li key={r.id} className="space-y-1">
                    <div className="flex items-baseline justify-between gap-2">
                      <a href={r.url} target="_blank" rel="noreferrer" className="font-semibold text-black hover:underline">
                        {r.name}
                      </a>
                      {r.publishedAt && (
                        <time dateTime={r.publishedAt} className="shrink-0 font-mono text-xs text-black">
                          {new Date(r.publishedAt).toLocaleDateString()}
                        </time>
                      )}
                    </div>
                    {r.body ? <ReleaseBody body={r.body} /> : null}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {state.status === "ready" && (
            <a
              href={state.repoUrl}
              target="_blank"
              rel="noreferrer"
              className="border-t-2 border-black px-4 py-2 text-center font-mono text-xs text-black hover:bg-black hover:text-white hover:no-underline"
            >
              View all on GitHub
            </a>
          )}
        </div>
      )}

      <button
        ref={buttonRef}
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls="release-notes-panel"
        aria-label={hasNew ? "Release notes (new)" : "Release notes"}
        className="relative flex h-12 w-12 items-center justify-center rounded-full bg-black text-white"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
          <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
        </svg>
        {hasNew && !open && (
          <span className="absolute right-1 top-1 h-3 w-3 rounded-full border-2 border-black bg-red-500" />
        )}
      </button>
    </div>
  )
}

export default ReleaseNotes
