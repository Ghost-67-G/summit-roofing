import { Phone } from 'lucide-react'
import { InspectionFormIsland } from '@/components/forms/InspectionForm'
import { CheckList } from '@/components/ui/CheckList'
import { Container } from '@/components/ui/Container'
import { business } from '@/config/site'
import { serviceOptions } from '@/data/services'

const included = [
  '21-point roof, attic and gutter inspection',
  'Photos of every issue we find — good news included',
  'Honest repair-or-replace recommendation',
  'Written, itemized quote with no obligation',
]

/** Final call to action with the inspection form. Used on the home page. */
export function InspectionCta() {
  return (
    <section
      aria-labelledby="inspection-heading"
      className="on-dark relative isolate overflow-hidden bg-brand-950 py-20 text-brand-200 sm:py-28"
    >
      <div className="bg-shingles absolute inset-0 -z-10" />
      <div className="absolute -top-48 -left-40 -z-10 size-[36rem] rounded-full bg-accent-600/25 blur-3xl" aria-hidden="true" />

      <Container className="grid items-center gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <div>
          <p className="eyebrow">Free roof inspection</p>
          <h2 id="inspection-heading" className="mt-4 text-3xl leading-[1.1] text-white sm:text-[2.75rem]">
            Know exactly where your roof stands — free.
          </h2>
          <p className="mt-5 text-lg leading-relaxed">
            Book a no-pressure inspection and we’ll call you within one business hour to schedule it. Here’s what you get:
          </p>
          <CheckList items={included} tone="dark" className="mt-7 text-white" />

          <a
            href={business.phone.href}
            className="mt-10 flex items-center gap-4 rounded-3xl border border-white/10 bg-white/5 p-5 transition hover:bg-white/10"
          >
            <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-accent-600 text-white">
              <Phone className="size-5.5" aria-hidden="true" />
            </span>
            <span className="leading-tight">
              <span className="block text-sm font-semibold">Prefer to talk? Call us</span>
              <span className="text-2xl font-extrabold text-white">{business.phone.display}</span>
            </span>
          </a>
        </div>

        <div id="inspection" className="rounded-[2rem] bg-white p-6 text-brand-600 shadow-lift sm:p-10">
          <h3 className="text-2xl sm:text-3xl">Book your free inspection</h3>
          <p className="mt-2 mb-8">Takes about a minute. No obligation, no spam.</p>
          <InspectionFormIsland services={serviceOptions} />
        </div>
      </Container>
    </section>
  )
}
