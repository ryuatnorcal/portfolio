import { GetObjectCommand, ListObjectsV2Command } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { r2, r2Bucket } from "@/utils/r2";
import { NextResponse } from "next/server";

// Signed URLs expire, so never serve a cached list.
export const dynamic = 'force-dynamic'

const IMAGE_EXTS = /\.(jpe?g|png|webp|avif)$/i
const URL_TTL_SECONDS = 60 * 60

// Lists the banner images in the R2 bucket and returns short-lived signed URLs
// for them, in filename order.
export const GET = async () => {
  try {
    const keys: string[] = []
    let token: string | undefined
    do {
      const page = await r2.send(new ListObjectsV2Command({
        Bucket: r2Bucket,
        Prefix: process.env.R2_BACKGROUNDS_PREFIX || undefined,
        ContinuationToken: token,
      }))
      page.Contents?.forEach(({ Key }) => { if (Key && IMAGE_EXTS.test(Key)) keys.push(Key) })
      token = page.NextContinuationToken
    } while (token)

    keys.sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
    const urls = await Promise.all(keys.map((Key) =>
      getSignedUrl(r2, new GetObjectCommand({ Bucket: r2Bucket, Key }), { expiresIn: URL_TTL_SECONDS })
    ))
    return NextResponse.json(urls)
  } catch (error) {
    console.error('Failed to list backgrounds:', error)
    return NextResponse.json({ error: 'Failed to list backgrounds' }, { status: 500 })
  }
}
