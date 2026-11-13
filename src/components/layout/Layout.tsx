import { BadgeCheck, MapPin, Star } from 'lucide-react'
import type { ReactNode } from 'react'
import { Container } from '@/components/ui/Container'
import { business } from '@/config/site'
import { SiteFooter } from './SiteFooter'
import { SiteHeader } from './SiteHeader'

/** Thin trust strip above the header on larger screens. */
function TopBar() {
  return (
    <div className="hidden bg-brand-950 text-sm text-brand-200 md:block">
      <Container className="flex h-10 items-center justify-between gap-6">
        <p className="flex items-center gap-2">
          <MapPin className="size-4 text-accent-400" aria-hidden="true" />
          Locally owned in Charlotte since {business.foundedYear}
        </p>
        <ul className="flex items-center gap-6">
          <li className="flex items-center gap-2">
            <Star className="size-4 fill-star text-star" aria-hidden="true" />
            {business.rating.value} stars from {business.rating.label} reviews
          </li>
          <li className="hidden items-center gap-2 lg:flex">
            <BadgeCheck className="size-4 text-accent-400" aria-hidden="true" />
            Licensed &amp; insured · Certified Installer
          </li>
        </ul>
      </Container>
    </div>
  )
}

export function Layout({ currentPath, children }: { currentPath: string; children: ReactNode }) {
  return (
    <>
      <a
        href="#main"
        className="sr-only z-60 rounded-full bg-brand-950 px-5 py-3 font-semibold text-white focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        Skip to main content
      </a>
      <TopBar />
      <SiteHeader currentPath={currentPath} />
      <main id="main" tabIndex={-1}>
        {children}
      </main>
      <SiteFooter />
    </>
  )
}
