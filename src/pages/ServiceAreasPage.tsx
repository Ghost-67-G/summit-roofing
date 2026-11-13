import { Car, MapPin, Phone } from 'lucide-react'
import { CoverageMap } from '@/components/sections/CoverageMap'
import { CtaBand } from '@/components/sections/CtaBand'
import { PageHero } from '@/components/sections/PageHero'
import { ButtonLink } from '@/components/ui/Button'
import { CheckList } from '@/components/ui/CheckList'
import { Container } from '@/components/ui/Container'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { business } from '@/config/site'
import { serviceAreas } from '@/data/service-areas'
import type { PageMeta } from '@/lib/seo'

export const serviceAreasMeta: PageMeta = {
  path: '/service-areas/',
  breadcrumb: 'Service Areas',
  title: 'Roofing Service Areas Around Charlotte, NC | Summit Roofing Co.',
  description:
    'Summit Roofing Co. serves Charlotte, Matthews, Huntersville, Concord, Gastonia and Fort Mill, SC. Free roof inspections and local crews within about 30 miles of uptown.',
}

const localPerks = [
  'Local crews who know Carolina storms, codes and HOAs',
  'Inspections usually scheduled within 48 hours',
  'Same-day emergency tarping across the whole region',
]

export function ServiceAreasPage() {
  return (
    <>
      <PageHero
        breadcrumb="Service Areas"
        eyebrow="Where we work"
        title="Proudly roofing the Charlotte region"
        description="From Lake Norman to the South Carolina line, our crews are never far away. If you’re within about 30 miles of uptown Charlotte, we’ve got you covered."
        image="charlotte-skyline"
      />

      <section aria-labelledby="coverage-heading" className="py-20 sm:py-24">
        <Container className="grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div>
            <SectionHeading
              id="coverage-heading"
              align="left"
              eyebrow="Coverage"
              title="Six core cities, one local team"
              description="We’re based in south Charlotte, which puts every city we serve within a short drive — so inspections, repairs and warranty visits happen fast."
            />
            <CheckList items={localPerks} className="mt-7" />
            <ButtonLink href={business.phone.href} variant="dark" className="mt-8">
              <Phone className="size-4.5" aria-hidden="true" />
              Not listed? Call {business.phone.display}
            </ButtonLink>
          </div>
          <CoverageMap />
        </Container>
      </section>

      <section aria-labelledby="areas-heading" className="bg-brand-50 py-20 sm:py-24">
        <Container>
          <h2 id="areas-heading" className="sr-only">
            Cities we serve
          </h2>
          <ul className="grid gap-6 md:grid-cols-2">
            {serviceAreas.map((area) => (
              <li key={area.slug} id={area.slug} className="flex flex-col rounded-3xl bg-white p-7 shadow-card sm:p-8">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h3 className="text-2xl">
                      Roofing in {area.city}, {area.state}
                    </h3>
                    <p className="mt-1 flex items-center gap-1.5 text-sm font-semibold">
                      <MapPin className="size-4 text-accent-600" aria-hidden="true" />
                      {area.county}
                    </p>
                  </div>
                  <p className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-3 py-1.5 text-sm font-bold text-brand-800">
                    <Car className="size-4" aria-hidden="true" />
                    {area.driveTime}
                  </p>
                </div>
                <p className="mt-5 leading-relaxed">{area.description}</p>

                <h4 className="mt-6 text-sm font-bold tracking-[0.16em] text-brand-950 uppercase">Areas &amp; neighborhoods</h4>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {area.neighborhoods.map((name) => (
                    <li key={name} className="rounded-full border border-brand-100 px-3 py-1 text-sm font-medium text-brand-700">
                      {name}
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-sm">
                  <span className="font-semibold text-brand-950">ZIP codes:</span> {area.zips.join(', ')}
                </p>

                <a
                  href="/contact/#inspection"
                  className="mt-auto inline-flex items-center gap-1 self-start pt-6 font-bold text-accent-700 underline-offset-4 hover:underline"
                >
                  Book a free inspection in {area.city}
                  <span aria-hidden="true">→</span>
                </a>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <CtaBand title="Live nearby? Your inspection is free." />
    </>
  )
}
