import { Phone } from 'lucide-react'
import { ButtonLink } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { business, navigation } from '@/config/site'
import type { PageMeta } from '@/lib/seo'

export const notFoundMeta: PageMeta = {
  path: '/404/',
  title: 'Page Not Found | Summit Roofing Co.',
  description: 'The page you’re looking for doesn’t exist. Find roofing services, our work and free inspections from Summit Roofing Co.',
  noindex: true,
}

export function NotFoundPage() {
  return (
    <section className="py-24 sm:py-32">
      <Container className="max-w-2xl text-center">
        <p className="text-sm font-bold tracking-[0.16em] text-accent-700 uppercase">Error 404</p>
        <h1 className="mt-4 text-4xl font-black sm:text-6xl">This page blew off in the storm</h1>
        <p className="mt-6 text-lg leading-relaxed">
          We couldn’t find the page you were looking for. It may have moved, or the link might be wrong.
        </p>
        <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
          <ButtonLink href="/">Back to home</ButtonLink>
          <ButtonLink href={business.phone.href} variant="outline">
            <Phone className="size-4.5" aria-hidden="true" />
            Call {business.phone.display}
          </ButtonLink>
        </div>
        <nav aria-label="Popular pages" className="mt-12">
          <ul className="flex flex-wrap justify-center gap-2">
            {navigation.slice(1).map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="inline-block rounded-full border border-brand-100 px-4 py-2 font-semibold text-brand-800 hover:border-brand-300"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </Container>
    </section>
  )
}
