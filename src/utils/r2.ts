import { S3Client } from "@aws-sdk/client-s3"

// Cloudflare R2 speaks the S3 API; the bucket is private, so everything goes
// through a client signed with an R2 API token.
export const r2Bucket = process.env.R2_BUCKET || 'portfolio'

export const r2 = new S3Client({
  region: 'auto',
  endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || '',
  },
})

// Banner images are the image files under this prefix (whole bucket if unset).
export const backgroundsPrefix = process.env.R2_BACKGROUNDS_PREFIX || ''
const IMAGE_EXTS = /\.(jpe?g|png|webp|avif)$/i

// Only keys that pass this are listed or served, so the image route can't be
// used to read anything else in the bucket.
export const isBackgroundKey = (key: string) =>
  key.startsWith(backgroundsPrefix) && IMAGE_EXTS.test(key) && !key.includes('..')
