import { bannerImageUrl, listBannerImages } from "@/content/banner";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic'

// Lists the banner images in the R2 bucket, in display order, as URLs of the
// resizing image route. The ETag is in the URL so a re-uploaded image gets a
// new URL instead of the cached old one.
export const GET = async () => {
  try {
    const urls = (await listBannerImages()).map(bannerImageUrl)
    // short CDN cache: new uploads show up within a few minutes
    return NextResponse.json(urls, { headers: { 'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=3600' } })
  } catch (error) {
    console.error('Failed to list backgrounds:', error)
    return NextResponse.json({ error: 'Failed to list backgrounds' }, { status: 500 })
  }
}
