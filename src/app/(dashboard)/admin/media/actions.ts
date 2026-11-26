'use server'
import { ListObjectsV2Command } from "@aws-sdk/client-s3"
import { isMediaKey, mediaPrefix, mediaUrl, r2, r2Bucket } from "@/utils/r2"
import { requireAdmin } from "@/utils/admin"

export type MediaFile = { key: string, name: string, url: string, video: boolean }
export type MediaListResult = { ok: true, files: MediaFile[] } | { ok: false, error: string }

const VIDEO_FILE = /\.(mp4|webm|mov|m4v|ogv)$/i

// Image and video files under R2_MEDIA_PREFIX, for the popup media picker.
export const listMediaFiles = async (): Promise<MediaListResult> => {
  try {
    await requireAdmin()
  } catch {
    return { ok: false, error: 'Not authorised' }
  }
  try {
    const files: MediaFile[] = []
    let token: string | undefined
    do {
      const page = await r2.send(new ListObjectsV2Command({
        Bucket: r2Bucket,
        Prefix: mediaPrefix || undefined,
        ContinuationToken: token,
      }))
      page.Contents?.forEach(({ Key }) => {
        if (Key && isMediaKey(Key)) {
          files.push({ key: Key, name: Key.slice(mediaPrefix.length), url: mediaUrl(Key), video: VIDEO_FILE.test(Key) })
        }
      })
      token = page.NextContinuationToken
    } while (token)
    files.sort((a, b) => a.name.localeCompare(b.name, undefined, { numeric: true }))
    return { ok: true, files }
  } catch (error) {
    console.error('Failed to list media files:', error)
    return { ok: false, error: 'Could not list the files in R2. Check the R2_* environment variables.' }
  }
}
