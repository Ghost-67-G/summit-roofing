import { Clock, Mail, MapPin, Phone } from 'lucide-react'
import { CertifiedBadge } from '@/components/ui/CertifiedBadge'
import { Container } from '@/components/ui/Container'
import { StarRating } from '@/components/ui/StarRating'
import { business } from '@/config/site'
import { serviceAreas } from '@/data/service-areas'
import { services } from '@/data/services'
import { Logo } from './Logo'

const companyLinks = [
  { label: 'About us', href: '/about/' },
  { label: 'Our work', href: '/our-work/' },
  { label: 'Reviews', href: '/#reviews' },
  { label: 'Financing', href: '/#financing' },
  { label: 'FAQ', href: '/#faq' },
  { label: 'Free inspection', href: '/contact/#inspection' },
]

function FooterLinks({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <h2 className="text-sm font-bold tracking-[0.16em] text-white uppercase">{title}</h2>
      <ul className="mt-4 space-y-1">
        {links.map((link) => (
          <li key={link.href}>
            <a href={link.href} className="inline-block py-1 text-brand-200 transition-colors hover:text-white">
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}

export function SiteFooter() {
  const { address } = business

  return (
    <footer className="on-dark border-t border-white/10 bg-[#0d1013] text-brand-200">
      <Container className="grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1.1fr] lg:gap-10 lg:py-20">
        <div className="max-w-sm">
          <a href="/" className="inline-block rounded-xl">
            <Logo tone="dark" />
            <span className="sr-only">, home</span>
          </a>
          <p className="mt-5 leading-relaxed">
            {business.tagline}. Locally owned and serving the Charlotte region since {business.foundedYear}.
          </p>

          <ul className="mt-6 space-y-3">
            <li>
              <a href={business.phone.href} className="flex items-center gap-3 text-lg font-bold text-white hover:text-accent-300">
                <Phone className="size-5 text-accent-400" aria-hidden="true" />
                {business.phone.display}
              </a>
            </li>
            <li>
              <a href={`mailto:${business.email}`} className="flex items-center gap-3 break-all hover:text-white">
                <Mail className="size-5 shrink-0 text-accent-400" aria-hidden="true" />
                {business.email}
              </a>
            </li>
            <li className="flex gap-3">
              <MapPin className="mt-0.5 size-5 shrink-0 text-accent-400" aria-hidden="true" />
              <address className="not-italic">
                {address.street}
                <br />
                {address.city}, {address.region} {address.postalCode}
              </address>
            </li>
          </ul>

          <div className="mt-8 flex items-center gap-4">
            <CertifiedBadge className="w-14" />
            <p className="text-sm leading-snug">
              <StarRating rating={5} className="text-sm" tone="dark" />
              <span className="mt-1 block">
                <strong className="text-white">{business.rating.value}/5</strong> from {business.rating.label} reviews
              </span>
            </p>
          </div>
        </div>

        <FooterLinks title="Services" links={services.map((s) => ({ label: s.name, href: `/services/#${s.slug}` }))} />

        <div className="grid content-start gap-10">
          <FooterLinks title="Company" links={companyLinks} />
        </div>

        <div className="grid content-start gap-10">
          <div>
            <h2 className="flex items-center gap-2 text-sm font-bold tracking-[0.16em] text-white uppercase">
              <Clock className="size-4 text-accent-400" aria-hidden="true" />
              Office hours
            </h2>
            <dl className="mt-4 space-y-1.5 text-sm">
              {business.hours.map((row) => (
                <div key={row.days} className="flex justify-between gap-4">
                  <dt>{row.days}</dt>
                  <dd className="text-right text-white">{row.time}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-3 text-sm font-semibold text-accent-300">{business.emergencyNote}</p>
          </div>
          <div>
            <h2 className="text-sm font-bold tracking-[0.16em] text-white uppercase">Service areas</h2>
            <ul className="mt-4 flex flex-wrap gap-2">
              {serviceAreas.map((area) => (
                <li key={area.slug}>
                  <a
                    href={`/service-areas/#${area.slug}`}
                    className="inline-block rounded-full border border-white/15 px-3 py-1.5 text-sm text-brand-100 transition-colors hover:border-white/40 hover:text-white"
                  >
                    {area.city}, {area.state}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>

      <div className="border-t border-white/10">
        <Container className="flex flex-col gap-3 py-6 text-sm text-brand-300 md:flex-row md:items-center md:justify-between">
          <p>
            © {__BUILD_YEAR__} {business.name} · {business.license} · Licensed &amp; insured in NC and SC
          </p>
          <p>
            Demo website designed by <span className="font-semibold text-white">CodingStack</span>
            <span> · Fictional business for demonstration</span>
          </p>
        </Container>
      </div>
    </footer>
  )
}
