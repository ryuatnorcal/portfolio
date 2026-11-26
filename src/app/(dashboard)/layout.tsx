import { ClerkProvider } from "@clerk/nextjs";

// Clerk is only loaded for the dashboard and its sign-in page. Rendered per
// request: Clerk needs its keys at runtime, not during the build.
export const dynamic = "force-dynamic";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <ClerkProvider>{children}</ClerkProvider>;
}
