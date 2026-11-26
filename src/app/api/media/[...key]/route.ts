import { GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { isMediaKey, MEDIA_ROUTE, r2, r2Bucket } from "@/utils/r2";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = 'force-dynamic'

// Signed links last an hour; the redirect is cached for less than that so a
// cached redirect never points at an expired link.
const SIGNED_FOR = 60 * 60
const CACHE_FOR = 15 * 60

// Serves a project / internal tool media file from the private R2 bucket by
// redirecting to a short-lived signed URL. R2 then handles range requests,
// so videos can seek.
export const GET = async (req: NextRequest) => {
  // read from the raw path so each segment is decoded exactly once
  let key: string
  try {
    key = req.nextUrl.pathname.slice(MEDIA_ROUTE.length).split('/').map(decodeURIComponent).join('/')
  } catch {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }
  if (!isMediaKey(key)) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }
  try {
    const url = await getSignedUrl(r2, new GetObjectCommand({ Bucket: r2Bucket, Key: key }), { expiresIn: SIGNED_FOR })
    return NextResponse.redirect(url, {
      status: 302,
      headers: { 'Cache-Control': `public, max-age=${CACHE_FOR}, s-maxage=${CACHE_FOR}` },
    })
  } catch (error) {
    console.error(`Failed to sign media ${key}:`, error)
    return NextResponse.json({ error: 'Failed to load media' }, { status: 500 })
  }
}
