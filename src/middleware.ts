import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server"

const isAdminRoute = createRouteMatcher(['/admin(.*)'])

// Signed-out visitors to /admin go to the sign-in page. Whether a signed-in
// user is allowed in is checked in the admin layout and every server action.
export default clerkMiddleware(async (auth, req) => {
  if (isAdminRoute(req)) await auth.protect()
})

// Only the dashboard and sign-in run Clerk; the public site doesn't need it.
export const config = {
  matcher: ['/admin(.*)', '/sign-in(.*)'],
}
