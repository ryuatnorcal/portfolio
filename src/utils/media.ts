// Works out how to show a project popup's media field. It can be:
// - a Cloudflare Stream link (watch, iframe or videodelivery.net URL) -> embedded player
// - a URL to a video file (.mp4, .webm, ...), e.g. on R2               -> <video>
// - any other URL                                                      -> <img>
// - a /api/media/<key> path (file picked from R2 in the dashboard)     -> <video> or <img>
// - a bare file name (older entries)                                   -> public/screenshot/<name>

export type Media =
  | { kind: 'image', src: string }
  | { kind: 'video', src: string }
  | { kind: 'stream', src: string }

const VIDEO_FILE = /\.(mp4|webm|mov|m4v|ogv)$/i

export const resolveMedia = (value?: string | null): Media | null => {
  const raw = (value ?? '').trim()
  if (!raw) return null
  if (raw.startsWith('/api/media/')) return { kind: VIDEO_FILE.test(raw) ? 'video' : 'image', src: raw }
  if (!/^https?:\/\//i.test(raw)) return { kind: 'image', src: `/screenshot/${encodeURIComponent(raw)}` }

  let url: URL
  try {
    url = new URL(raw)
  } catch {
    return null
  }
  const host = url.hostname.toLowerCase()

  if (host.endsWith('.cloudflarestream.com') || host === 'videodelivery.net' || host.endsWith('.videodelivery.net')) {
    // already an embed URL
    if (host.startsWith('iframe.')) return { kind: 'stream', src: url.toString() }
    const id = url.pathname.split('/').filter(Boolean)[0]
    if (!id) return null
    // customer-<code>.cloudflarestream.com/<id>/watch -> .../<id>/iframe
    if (host.endsWith('.cloudflarestream.com')) return { kind: 'stream', src: `https://${host}/${id}/iframe` }
    return { kind: 'stream', src: `https://iframe.videodelivery.net/${id}` }
  }

  if (VIDEO_FILE.test(url.pathname)) return { kind: 'video', src: url.toString() }
  return { kind: 'image', src: url.toString() }
}
