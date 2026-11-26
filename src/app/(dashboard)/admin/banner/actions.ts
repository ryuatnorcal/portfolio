'use server'
import { DeleteObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3"
import { revalidatePath } from "next/cache"
import { backgroundsPrefix, isBackgroundKey, r2, r2Bucket } from "@/utils/r2"
import { prisma } from "@/utils/prisma"
import { requireAdmin } from "@/utils/admin"
import { listBannerImages } from "@/content/banner"
import type { ActionResult } from "../actions"

// Uploads are resized in the browser first, so they stay well under this.
const MAX_UPLOAD_BYTES = 4 * 1024 * 1024
const UPLOAD_TYPES: Record<string, string> = { 'image/webp': 'webp', 'image/jpeg': 'jpg', 'image/png': 'png' }

const run = async (fn: () => Promise<string | void>): Promise<ActionResult> => {
  try {
    await requireAdmin()
    const error = await fn()
    if (error) return { ok: false, error }
    revalidatePath('/admin/banner')
    return { ok: true }
  } catch (error) {
    console.error('Banner action failed:', error)
    return { ok: false, error: 'Something went wrong. Please try again.' }
  }
}

// Saves the current display order as positions 0..n-1.
const saveOrder = async (keys: string[]) => {
  await prisma.$transaction([
    prisma.bannerImage.deleteMany({ where: { key: { notIn: keys } } }),
    ...keys.map((key, position) => prisma.bannerImage.upsert({
      where: { key },
      create: { key, position },
      update: { position },
    })),
  ])
}

export const uploadBanner = async (formData: FormData): Promise<ActionResult> => run(async () => {
  const file = formData.get('file')
  if (!(file instanceof File) || !file.size) return 'Choose an image to upload'
  const ext = UPLOAD_TYPES[file.type]
  if (!ext) return 'Only JPEG, PNG or WebP images can be uploaded'
  if (file.size > MAX_UPLOAD_BYTES) return 'Image is too large'

  const base = (formData.get('name')?.toString() || 'banner')
    .replace(/\.[^.]+$/, '')
    .replace(/[^a-zA-Z0-9_-]+/g, '-')
    .slice(0, 60) || 'banner'
  const key = `${backgroundsPrefix}${Date.now()}-${base}.${ext}`
  await r2.send(new PutObjectCommand({
    Bucket: r2Bucket,
    Key: key,
    Body: Buffer.from(await file.arrayBuffer()),
    ContentType: file.type,
  }))
  // new images go last
  const keys = (await listBannerImages()).map((image) => image.key).filter((k) => k !== key)
  await saveOrder([...keys, key])
})

export const deleteBanner = async (key: string): Promise<ActionResult> => run(async () => {
  if (!isBackgroundKey(key)) return 'Unknown image'
  await r2.send(new DeleteObjectCommand({ Bucket: r2Bucket, Key: key }))
  await prisma.bannerImage.deleteMany({ where: { key } })
})

export const moveBanner = async (key: string, direction: -1 | 1): Promise<ActionResult> => run(async () => {
  const keys = (await listBannerImages()).map((image) => image.key)
  const from = keys.indexOf(key)
  const to = from + direction
  if (from < 0) return 'Unknown image'
  if (to < 0 || to >= keys.length) return
  ;[keys[from], keys[to]] = [keys[to], keys[from]]
  await saveOrder(keys)
})
