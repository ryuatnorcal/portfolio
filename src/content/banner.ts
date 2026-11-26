import { ListObjectsV2Command } from "@aws-sdk/client-s3"
import { backgroundsPrefix, isBackgroundKey, r2, r2Bucket } from "@/utils/r2"
import { prisma } from "@/utils/prisma"

export type BannerObject = { key: string, etag: string }

// Banner images in R2, in display order: the order saved in the dashboard,
// then any images not ordered yet by file name. If the database is down the
// banner still works, in file name order.
export const listBannerImages = async (): Promise<BannerObject[]> => {
  const images: BannerObject[] = []
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
  try {
    const order = new Map((await prisma.bannerImage.findMany()).map(({ key, position }) => [key, position]))
    const rank = (key: string) => order.get(key) ?? Number.MAX_SAFE_INTEGER
    images.sort((a, b) => rank(a.key) - rank(b.key))   // stable: unordered keep file name order
  } catch (error) {
    console.error('Banner order unavailable, using file name order:', error)
  }
  return images
}

// URL of the resizing image route for one banner image.
export const bannerImageUrl = ({ key, etag }: BannerObject) =>
  `/api/backgrounds/image?${new URLSearchParams({ key, v: etag })}`
