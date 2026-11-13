import { Menu, Phone, X } from 'lucide-react'
import { ButtonLink } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { business, inspectionHref, navigation } from '@/config/site'
import { cn } from '@/lib/cn'
import { Logo } from './Logo'

/**
 * Sticky site header. Deliberately not an island: the mobile menu is a native
 * popover (`popover` + `popovertarget`), so opening, closing, Escape,
 * click-outside and `aria-expanded` all work without loading React.
 * entry-client.ts adds a small fallback for browsers without popover support.
 * The drawer sits outside <header> because the header's backdrop-filter would
 * otherwise trap the fallback's fixed positioning.
 */
export function SiteHeader({ currentPath }: { currentPath: string }) {
  const inspection = inspectionHref(currentPath)

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-brand-100 bg-white/95 backdrop-blur-md">
        <Container className="flex h-17 items-center gap-2 lg:h-20">
          <a href="/" className="shrink-0 rounded-xl">
            <Logo compact />
            <span className="sr-only">, home</span>
          </a>

          <nav aria-label="Main" className="ml-6 hidden xl:block">
            <ul className="flex items-center gap-0.5">
              {navigation.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    aria-current={item.href === currentPath ? 'page' : undefined}
                    className="relative rounded-full px-3.5 py-2 text-[0.9375rem] font-semibold text-brand-700 transition-colors hover:text-brand-950 aria-[current=page]:text-brand-950 aria-[current=page]:after:absolute aria-[current=page]:after:inset-x-3.5 aria-[current=page]:after:-bottom-0.5 aria-[current=page]:after:h-0.5 aria-[current=page]:after:rounded-full aria-[current=page]:after:bg-accent-600"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="ml-auto flex items-center gap-1.5 sm:gap-3">
            <a href={business.phone.href} className="group hidden items-center gap-3 rounded-full py-1 pr-1 md:flex">
              <span className="grid size-10 place-items-center rounded-full bg-accent-50 text-accent-700 transition-colors group-hover:bg-accent-100">
                <Phone className="size-4.5" aria-hidden="true" />
              </span>
              <span className="leading-tight">
                <span className="block text-xs font-semibold text-brand-600">Call for a free quote</span>
                <span className="block text-base font-extrabold text-brand-950">{business.phone.display}</span>
              </span>
            </a>

            <a
              href={business.phone.href}
              className="grid size-10 shrink-0 place-items-center rounded-full bg-accent-50 text-accent-700 md:hidden"
              aria-label={`Call ${business.phone.display}`}
            >
              <Phone className="size-4.5" aria-hidden="true" />
            </a>

            <ButtonLink href={inspection} size="sm" className="px-3.5 max-sm:h-10 max-sm:text-[0.8125rem] sm:px-5">
              Free Roof Inspection
            </ButtonLink>

            <button
              type="button"
              popoverTarget="mobile-menu"
              className="grid size-10 shrink-0 place-items-center rounded-full text-brand-950 hover:bg-brand-50 xl:hidden"
              aria-label="Open menu"
            >
              <Menu className="size-6" aria-hidden="true" />
            </button>
          </div>
        </Container>
      </header>

      <div
        id="mobile-menu"
        popover="auto"
        aria-label="Menu"
        className={cn(
          'fixed inset-y-0 right-0 left-auto m-0 h-dvh max-h-none w-[min(24rem,100%)] overflow-y-auto border-0 bg-white p-0 text-brand-950 shadow-2xl xl:hidden',
          'backdrop:bg-brand-950/60 backdrop:backdrop-blur-sm',
          // Slide in from the right; browsers without @starting-style just skip the animation.
          'translate-x-full transition-all transition-discrete duration-300 open:translate-x-0 starting:open:translate-x-full motion-reduce:transition-none',
        )}
      >
        <div className="flex h-17 items-center justify-between border-b border-brand-100 px-4 sm:px-6">
          <Logo />
          <button
            type="button"
            popoverTarget="mobile-menu"
            popoverTargetAction="hide"
            className="grid size-10 place-items-center rounded-full hover:bg-brand-50"
            aria-label="Close menu"
          >
            <X className="size-6" aria-hidden="true" />
          </button>
        </div>

        <nav aria-label="Mobile" className="px-4 py-5 sm:px-6">
          <ul className="grid gap-1">
            {navigation.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  aria-current={item.href === currentPath ? 'page' : undefined}
                  className="block rounded-xl px-4 py-3 text-lg font-semibold hover:bg-brand-50 aria-[current=page]:bg-accent-50 aria-[current=page]:text-accent-700"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="grid gap-3 border-t border-brand-100 px-4 py-6 sm:px-6">
          <ButtonLink href={inspection} size="lg">
            Book Free Inspection
          </ButtonLink>
          <ButtonLink href={business.phone.href} variant="dark" size="lg">
            <Phone className="size-5" aria-hidden="true" />
            Call {business.phone.display}
          </ButtonLink>
          <p className="mt-2 text-center text-sm text-brand-600">{business.emergencyNote}</p>
        </div>
      </div>
    </>
  )
}
