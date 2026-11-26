import Link from "next/link"
import { LOCALES } from "@/content/siteText"

// Small shared pieces of the dashboard UI.

export const LOCALE_NAMES: Record<string, string> = { en: 'English', jp: '日本語' }

export const buttonClass = {
  primary: 'inline-flex items-center justify-center rounded-md bg-fg px-4 py-2 text-sm font-semibold text-bg transition-opacity hover:opacity-85 disabled:opacity-50',
  secondary: 'inline-flex items-center justify-center rounded-md border border-border bg-surface px-3 py-1.5 text-sm transition-colors hover:bg-surface-2 disabled:opacity-50',
  danger: 'inline-flex items-center justify-center rounded-md border border-red-300 px-3 py-1.5 text-sm text-red-700 transition-colors hover:bg-red-50 disabled:opacity-50 dark:border-red-900 dark:text-red-400 dark:hover:bg-red-950',
  icon: 'inline-flex h-8 w-8 items-center justify-center rounded-md border border-border text-sm transition-colors hover:bg-surface-2 disabled:opacity-30',
}

export const inputClass = 'w-full rounded-md border border-border bg-bg px-3 py-2 text-sm text-fg outline-none focus:border-fg'

export const PageHeader = ({ title, description, children }: { title: string, description?: string, children?: React.ReactNode }) => (
  <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
    <div>
      <h1 className="font-display text-3xl font-semibold tracking-tight">{title}</h1>
      {description && <p className="mt-1 text-sm text-fg-muted">{description}</p>}
    </div>
    {children}
  </div>
)

// EN / JP switch; the page reads the choice from ?locale=.
export const LocaleTabs = ({ basePath, locale }: { basePath: string, locale: string }) => (
  <div className="mb-6 inline-flex rounded-md border border-border p-1" role="tablist">
    {LOCALES.map((l) => (
      <Link
        key={l}
        href={`${basePath}?locale=${l}`}
        role="tab"
        aria-selected={l === locale}
        className={`rounded px-4 py-1.5 text-sm no-underline hover:no-underline ${l === locale ? 'bg-fg text-bg' : 'text-fg-muted hover:text-fg'}`}
      >
        {LOCALE_NAMES[l]}
      </Link>
    ))}
  </div>
)

export const FormError = ({ error }: { error: string | null }) => error
  ? <p role="alert" className="text-sm text-red-700 dark:text-red-400">{error}</p>
  : null

export const pickLocale = (value: string | string[] | undefined) =>
  LOCALES.includes(value as typeof LOCALES[number]) ? value as typeof LOCALES[number] : 'en'
