import { ListObjectsV2Command } from "@aws-sdk/client-s3";
import { backgroundsPrefix, isBackgroundKey, r2, r2Bucket } from "@/utils/r2";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic'

// Lists the banner images in the R2 bucket, in filename order, as URLs of the
// resizing image route. The ETag is in the URL so a re-uploaded image gets a
// new URL instead of the cached old one.
export const GET = async () => {
  try {
    const images: { key: string, etag: string }[] = []
    let token: string | undefined
    do {
      const page = await r2.send(new ListObjectsV2Command({
        Bucket: r2Bucket,
        Prefix: backgroundsPrefix || undefined,
        ContinuationToken: token,
      }))
      page.Contents?.forEach(({ Key, ETag }) => {
        if (Key && isBackgroundKey(Key)) images.push({ key: Key, etag: (ETag || '').replace(/"/g, '') })
      })
      token = page.NextContinuationToken
    } while (token)

    images.sort((a, b) => a.key.localeCompare(b.key, undefined, { numeric: true }))
    const urls = images.map(({ key, etag }) =>
      `/api/backgrounds/image?${new URLSearchParams({ key, v: etag })}`
    )
    // short CDN cache: new uploads show up within a few minutes
    return NextResponse.json(urls, { headers: { 'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=3600' } })
  } catch (error) {
    console.error('Failed to list backgrounds:', error)
    return NextResponse.json({ error: 'Failed to list backgrounds' }, { status: 500 })
  }
}
