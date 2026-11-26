import { NextResponse } from "next/server";

// Release notes from this project's GitHub repo, cached for an hour so we
// stay well under GitHub's unauthenticated rate limit (60 req/hour/IP).
export const revalidate = 3600

const REPO = process.env.GITHUB_REPO || "ryuatnorcal/portfolio"

type GitHubRelease = {
  id: number
  name: string | null
  tag_name: string
  body: string | null
  html_url: string
  published_at: string | null
  draft: boolean
}

export const GET = async () => {
  try {
    const headers: Record<string, string> = {
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
    }
    if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`

    const res = await fetch(`https://api.github.com/repos/${REPO}/releases?per_page=10`, {
      headers,
      next: { revalidate: 3600 },
    })
    if (!res.ok) throw new Error(`GitHub responded ${res.status}`)

    const data: GitHubRelease[] = await res.json()
    const releases = data
      .filter((r) => !r.draft)
      .map((r) => ({
        id: r.id,
        name: r.name || r.tag_name,
        tag: r.tag_name,
        body: r.body ?? "",
        url: r.html_url,
        publishedAt: r.published_at,
      }))

    return NextResponse.json({ releases, repoUrl: `https://github.com/${REPO}/releases` })
  } catch (error) {
    console.error("Failed to fetch releases:", error)
    return NextResponse.json({ error: "Failed to fetch releases" }, { status: 500 })
  }
}
