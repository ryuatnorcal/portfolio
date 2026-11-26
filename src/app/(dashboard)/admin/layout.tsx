import { auth } from "@clerk/nextjs/server";
import { SignOutButton, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { isAdmin } from "@/utils/admin";
import AdminNav from "@/components/Admin/AdminNav";
import { buttonClass } from "@/components/Admin/ui";

export const metadata = { title: 'Dashboard', robots: { index: false } }
export const dynamic = 'force-dynamic'

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { userId } = await auth()

  if (!isAdmin(userId)) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-bg p-4 text-fg">
        <div className="max-w-md rounded-md border border-border bg-surface p-6">
          <h1 className="mb-2 font-display text-2xl font-semibold">Not authorised</h1>
          <p className="mb-4 text-sm text-fg-muted">
            This account can&apos;t use the dashboard. To allow it, add its user ID to <code>ADMIN_USER_IDS</code>:
          </p>
          <code className="mb-6 block break-all rounded bg-surface-2 p-3 text-sm">{userId}</code>
          <SignOutButton redirectUrl="/sign-in">
            <button type="button" className={buttonClass.secondary}>Sign out</button>
          </SignOutButton>
        </div>
      </main>
    )
  }

  return (
    <div className="min-h-screen bg-bg text-fg md:flex">
      <aside className="border-b border-border bg-surface md:sticky md:top-0 md:h-screen md:w-60 md:shrink-0 md:border-b-0 md:border-r">
        <div className="flex items-center justify-between gap-3 p-4">
          <Link href="/admin" className="font-display text-lg font-semibold text-fg no-underline hover:no-underline">Portfolio CMS</Link>
          <UserButton />
        </div>
        <AdminNav />
        <div className="hidden p-4 md:block">
          <Link href="/" target="_blank" className="text-sm text-fg-muted">View site ↗</Link>
        </div>
      </aside>
      <main className="min-w-0 flex-1 px-4 py-8 md:px-10">{children}</main>
    </div>
  )
}
