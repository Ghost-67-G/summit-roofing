import { ChevronDown, Phone } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { business } from '@/config/site'
import { faqs } from '@/data/faqs'

/**
 * Native <details> elements: keyboard and screen-reader accessible, and they
 * work without any JavaScript. A shared `name` makes them an exclusive accordion.
 */
export function Faq() {
  return (
    <section id="faq" aria-labelledby="faq-heading" className="bg-brand-50 py-20 sm:py-28">
      <Container className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div>
          <SectionHeading
            id="faq-heading"
            align="left"
            eyebrow="FAQ"
            title="Questions homeowners ask us"
            description="Straight answers about inspections, insurance, warranties and cost. Don’t see yours? Just ask."
          />
          <a
            href={business.phone.href}
            className="mt-8 inline-flex items-center gap-3 rounded-2xl bg-white px-5 py-4 shadow-card transition hover:shadow-lift"
          >
            <span className="grid size-11 place-items-center rounded-xl bg-accent-600 text-white">
              <Phone className="size-5" aria-hidden="true" />
            </span>
            <span className="leading-tight">
              <span className="block text-sm font-semibold text-brand-600">Talk to a roofing expert</span>
              <span className="text-lg font-extrabold text-brand-950">{business.phone.display}</span>
            </span>
          </a>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <details
              key={faq.question}
              name="faq"
              open={index === 0}
              className="group rounded-2xl border border-brand-100 bg-white shadow-card open:border-accent-200"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 rounded-2xl px-5 py-5 text-lg font-bold text-brand-950 sm:px-6 [&::-webkit-details-marker]:hidden">
                {faq.question}
                <span className="grid size-8 shrink-0 place-items-center rounded-full bg-brand-50 text-brand-700 transition group-open:rotate-180 group-open:bg-accent-600 group-open:text-white motion-reduce:transition-none">
                  <ChevronDown className="size-5" aria-hidden="true" />
                </span>
              </summary>
              <p className="px-5 pb-6 leading-relaxed sm:px-6">{faq.answer}</p>
            </details>
          ))}
        </div>
      </Container>
    </section>
  )
}
