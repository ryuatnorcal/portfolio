import { auth } from "@clerk/nextjs/server"
import { notFound } from "next/navigation"

// Clerk user IDs allowed into the dashboard, from ADMIN_USER_IDS
// (comma-separated). Empty means nobody.
const adminIds = () => (process.env.ADMIN_USER_IDS || '')
  .split(',')
  .map((id) => id.trim())
  .filter(Boolean)

export const isAdmin = (userId: string | null | undefined) => !!userId && adminIds().includes(userId)

// Call first in every server action: signed-in alone is not enough.
export const requireAdmin = async () => {
  const { userId } = await auth()
  if (!isAdmin(userId)) throw new Error('Not authorised')
  return userId!
}

// For dashboard pages: the layout shows "Not authorised", but pages can be
// fetched on their own during client navigation, so each one checks too.
export const guardAdminPage = async () => {
  const { userId } = await auth()
  if (!isAdmin(userId)) notFound()
}
