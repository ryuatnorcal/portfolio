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
