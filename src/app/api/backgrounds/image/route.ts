import { GetObjectCommand } from "@aws-sdk/client-s3";
import { isBackgroundKey, r2, r2Bucket } from "@/utils/r2";
import { NextRequest, NextResponse } from "next/server";
import sharp from "sharp";

export const dynamic = 'force-dynamic'
// resizing a full-size phone photo can take a few seconds on a cold start
export const maxDuration = 30

// Matches MAX_IMAGE_SIDE in LiquidBanner, which would downscale to this anyway.
const MAX_SIDE = 2048

// Serves a banner image from R2 resized to at most MAX_SIDE and re-encoded as
// WebP. URLs carry the object's ETag (see ../route.ts), so the CDN can cache
// each one for good and only the first request per image does the work.
export const GET = async (req: NextRequest) => {
  const key = req.nextUrl.searchParams.get('key') || ''
  if (!isBackgroundKey(key)) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }

  try {
    const object = await r2.send(new GetObjectCommand({ Bucket: r2Bucket, Key: key }))
    const original = await object.Body!.transformToByteArray()
    const resized = await sharp(original)
      .rotate()   // apply EXIF orientation from phone photos
      .resize({ width: MAX_SIDE, height: MAX_SIDE, fit: 'inside', withoutEnlargement: true })
      .webp({ quality: 80 })
      .toBuffer()

    return new NextResponse(new Uint8Array(resized), {
      headers: {
        'Content-Type': 'image/webp',
        'Cache-Control': 'public, max-age=31536000, s-maxage=31536000, immutable',
      },
    })
  } catch (error) {
    if ((error as { name?: string }).name === 'NoSuchKey') {
      return NextResponse.json({ error: 'Not found' }, { status: 404 })
    }
    console.error(`Failed to serve background ${key}:`, error)
    return NextResponse.json({ error: 'Failed to load image' }, { status: 500 })
  }
}
