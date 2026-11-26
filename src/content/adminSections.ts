// Dashboard sections, for the sidebar (a client component) and the overview
// page (a server component). Kept out of the 'use client' file: a server
// component importing a value from there gets a client reference, not the
// array.
export const adminSections = [
  { href: '/admin/text', label: 'Text & labels' },
  { href: '/admin/bio', label: 'Bio' },
  { href: '/admin/services', label: 'Services' },
  { href: '/admin/experience', label: 'Experience' },
  { href: '/admin/projects', label: 'Projects' },
  { href: '/admin/tech', label: 'Tech stack' },
  { href: '/admin/banner', label: 'Banner images' },
]
