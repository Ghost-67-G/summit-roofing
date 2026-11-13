import { Clock, Mail, MapPin, Phone, Siren } from 'lucide-react'
import type { ReactNode } from 'react'
import { InspectionFormIsland } from '@/components/forms/InspectionForm'
import { PageHero } from '@/components/sections/PageHero'
import { Container } from '@/components/ui/Container'
import { business } from '@/config/site'
import { serviceOptions } from '@/data/services'
import type { PageMeta } from '@/lib/seo'

export const contactMeta: PageMeta = {
  path: '/contact/',
  breadcrumb: 'Free Inspection',
  title: 'Book a Free Roof Inspection | Contact Summit Roofing Co.',
  description:
    'Request a free roof inspection in Charlotte, Matthews, Huntersville, Concord, Gastonia or Fort Mill — or call (704) 555-0192. We respond within one business hour.',
}

const steps = [
  { title: 'We call to schedule', text: 'A real person calls within one business hour to pick a time that suits you.' },
  { title: '45-minute inspection', text: 'Your inspector checks 21 points on the roof, in the attic and along the gutters.' },
  { title: 'Photos & honest advice', text: 'We walk you through photos of what we found and what, if anything, it needs.' },
  { title: 'Written quote', text: 'You get an itemized quote to review on your own time. No pressure, ever.' },
]

function ContactCard({ icon, title, children }: { icon: ReactNode; title: string; children: ReactNode }) {
  return (
    <li className="flex gap-4 rounded-2xl border border-brand-100 bg-white p-5 shadow-card">
      <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-accent-50 text-accent-700">{icon}</span>
      <div className="min-w-0 flex-1">
        <h3 className="text-base">{title}</h3>
        <div className="mt-1">{children}</div>
      </div>
    </li>
  )
}

export function ContactPage() {
  const { address } = business

  return (
    <>
      <PageHero
        breadcrumb="Free Inspection"
        eyebrow="Contact us"
        title="Book your free roof inspection"
        description="Tell us a little about your roof and we’ll call you within one business hour to schedule. Roof leaking right now? Skip the form and call."
      />

      <section className="py-14 sm:py-20" aria-label="Inspection request and contact details">
        <Container className="grid items-start gap-10 lg:grid-cols-[1.3fr_0.7fr] lg:gap-14">
          <div id="inspection" className="rounded-[2rem] border border-brand-100 bg-white p-6 shadow-lift sm:p-10">
            <h2 className="text-2xl sm:text-3xl">Request your free inspection</h2>
            <p className="mt-2 mb-8">Takes about a minute. No obligation, no spam.</p>
            <InspectionFormIsland services={serviceOptions} />
          </div>

          <aside aria-labelledby="contact-details-heading">
            <h2 id="contact-details-heading" className="sr-only">
              Contact details
            </h2>
            <a
              href={business.phone.href}
              className="flex items-center gap-4 rounded-3xl bg-accent-600 p-6 text-white shadow-cta transition hover:bg-accent-700"
            >
              <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-white/15">
                <Siren className="size-6" aria-hidden="true" />
              </span>
              <span className="leading-tight">
                <span className="block font-bold">Active leak or storm damage?</span>
                <span className="text-2xl font-extrabold">{business.phone.display}</span>
              </span>
            </a>

            <ul className="mt-6 space-y-4">
              <ContactCard icon={<Phone className="size-5" aria-hidden="true" />} title="Phone">
                <a href={business.phone.href} className="font-semibold text-accent-700 hover:underline">
                  {business.phone.display}
                </a>
              </ContactCard>
              <ContactCard icon={<Mail className="size-5" aria-hidden="true" />} title="Email">
                <a href={`mailto:${business.email}`} className="font-semibold break-all text-accent-700 hover:underline">
                  {business.email}
                </a>
              </ContactCard>
              <ContactCard icon={<MapPin className="size-5" aria-hidden="true" />} title="Office">
                <address className="not-italic">
                  {address.street}
                  <br />
                  {address.city}, {address.region} {address.postalCode}
                </address>
              </ContactCard>
              <ContactCard icon={<Clock className="size-5" aria-hidden="true" />} title="Office hours">
                <dl className="space-y-1 text-sm">
                  {business.hours.map((row) => (
                    <div key={row.days} className="flex justify-between gap-4">
                      <dt>{row.days}</dt>
                      <dd className="font-semibold text-brand-950">{row.time}</dd>
                    </div>
                  ))}
                </dl>
                <p className="mt-2 text-sm font-semibold text-accent-700">{business.emergencyNote}</p>
              </ContactCard>
            </ul>
          </aside>
        </Container>
      </section>

      <section aria-labelledby="next-heading" className="bg-brand-50 py-16 sm:py-24">
        <Container>
          <p className="eyebrow mx-auto flex w-fit">What to expect</p>
          <h2 id="next-heading" className="mt-4 text-center text-3xl sm:text-4xl">
            What happens after you book
          </h2>
          <ol className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, index) => (
              <li key={step.title} className="rounded-3xl bg-white p-7 shadow-card">
                <span
                  className="grid size-11 place-items-center rounded-full bg-brand-950 text-lg font-extrabold text-white"
                  aria-hidden="true"
                >
                  {index + 1}
                </span>
                <h3 className="mt-5 text-xl">{step.title}</h3>
                <p className="mt-2 leading-relaxed">{step.text}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>
    </>
  )
}
