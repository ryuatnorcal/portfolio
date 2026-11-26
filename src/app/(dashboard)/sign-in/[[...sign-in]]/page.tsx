import { SignIn } from "@clerk/nextjs";

export const metadata = { title: 'Sign in', robots: { index: false } }

// No sign-up: the footer link is hidden here, and sign-ups should also be
// set to Restricted in the Clerk dashboard so the API refuses them too.
export default function SignInPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-bg p-4">
      <SignIn
        fallbackRedirectUrl="/admin"
        appearance={{ elements: { footerAction: { display: 'none' } } }}
      />
    </main>
  );
}
