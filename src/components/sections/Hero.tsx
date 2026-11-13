import { Award, Phone, ScanSearch, ShieldCheck, Wallet } from 'lucide-react'
import { ButtonLink } from '@/components/ui/Button'
import { CertifiedBadge } from '@/components/ui/CertifiedBadge'
import { Container } from '@/components/ui/Container'
import { Picture } from '@/components/ui/Picture'
import { StarRating } from '@/components/ui/StarRating'
import { business } from '@/config/site'

export const trustBadges = [
  { icon: ShieldCheck, label: 'Licensed & Insured' },
  { icon: ScanSearch, label: 'Free Inspections' },
  { icon: Award, label: 'Lifetime Workmanship Warranty' },
  { icon: Wallet, label: 'Financing Available' },
]

export function Hero() {
  return (
    <section aria-labelledby="hero-heading" className="on-dark relative isolate overflow-hidden bg-brand-950">
      {/* Full-bleed behind the text on phones; the right 60% on desktop, so the roofer stays in view. */}
      <div className="absolute inset-0 -z-20 lg:left-auto lg:w-[60%]">
        <Picture
          name="hero-roof-crew"
          alt="Roofer standing on a torn-off shingle roof during a replacement"
          sizes="(min-width: 1024px) 60vw, 100vw"
          priority
          className="size-full object-cover object-[60%_center]"
        />
      </div>
      <div className="absolute inset-0 -z-10 bg-linear-to-b from-brand-950/85 via-brand-950/75 to-brand-950/95 lg:bg-linear-to-r lg:from-brand-950 lg:from-40% lg:via-brand-950/55 lg:via-55% lg:to-brand-950/0 lg:to-75%" />

      <Container className="grid items-end gap-12 pt-14 pb-12 sm:pt-20 lg:grid-cols-[1fr_auto] lg:pt-28 lg:pb-16">
        <div className="max-w-3xl">
          <p className="inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/10 py-1.5 pr-4 pl-3 text-sm font-semibold text-white backdrop-blur-sm">
            <StarRating rating={5} className="text-sm" tone="dark" />
            {business.rating.value} stars from {business.rating.label} Charlotte-area homeowners
          </p>

          <h1 id="hero-heading" className="mt-6 text-[2.75rem] leading-[1.02] font-black text-white sm:text-6xl lg:text-7xl">
            Roofs built to last. <span className="block text-accent-400">Inspections are free.</span>
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-brand-100 sm:text-xl">
            Locally owned since {business.foundedYear}, Summit Roofing Co. replaces, repairs and storm-proofs roofs across the Charlotte
            region — backed by a lifetime workmanship warranty.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="#inspection" size="lg">
              Book Free Inspection
            </ButtonLink>
            <ButtonLink href={business.phone.href} variant="outline-light" size="lg">
              <Phone className="size-5" aria-hidden="true" />
              Call Now
              <span className="font-semibold text-brand-200">{business.phone.display}</span>
            </ButtonLink>
          </div>
        </div>

        <div className="hidden items-center gap-4 rounded-3xl border border-white/15 bg-brand-950/70 p-5 pr-7 backdrop-blur-md lg:flex">
          <CertifiedBadge className="w-16" />
          <p className="leading-tight">
            <span className="block text-lg font-extrabold text-white">Certified Installer</span>
            <span className="mt-1 block text-sm text-brand-200">
              Factory-trained crews · <br />
              enhanced material warranties
            </span>
          </p>
        </div>
      </Container>

      <div className="border-t border-white/10 bg-brand-950/70 backdrop-blur-md">
        <Container>
          <ul className="grid grid-cols-2 gap-x-4 gap-y-5 py-6 lg:grid-cols-4 lg:py-7">
            {trustBadges.map(({ icon: Icon, label }) => (
              <li key={label} className="flex items-center gap-3 text-sm leading-snug font-bold text-white sm:text-base">
                <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-accent-600 text-white">
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                {label}
              </li>
            ))}
          </ul>
        </Container>
      </div>
    </section>
  )
}
