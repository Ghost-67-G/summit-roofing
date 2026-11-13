import { ArrowRight, ScanSearch } from 'lucide-react'
import { ButtonLink } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { services } from '@/data/services'

export function ServicesGrid() {
  return (
    <section id="services" aria-labelledby="services-heading" className="py-20 sm:py-28">
      <Container>
        <SectionHeading
          id="services-heading"
          eyebrow="What we do"
          title="Complete roofing services, start to finish"
          description="One local team for everything above your gutters — from a single missing shingle to a full commercial re-roof."
        />

        <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {services.map(({ slug, name, icon: Icon, summary }) => (
            <li
              key={slug}
              className="group relative flex gap-4 rounded-3xl border border-brand-100 bg-white p-6 shadow-card transition duration-200 hover:-translate-y-1 hover:border-accent-200 hover:shadow-lift motion-reduce:transform-none sm:flex-col sm:gap-0 sm:p-7"
            >
              <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-accent-50 text-accent-700 transition-colors group-hover:bg-accent-600 group-hover:text-white sm:size-14">
                <Icon className="size-6 sm:size-7" aria-hidden="true" />
              </span>
              <div className="flex flex-1 flex-col">
                <h3 className="text-lg sm:mt-6 sm:text-xl">
                  <a href={`/services/#${slug}`} className="after:absolute after:inset-0 after:rounded-3xl">
                    {name}
                  </a>
                </h3>
                <p className="mt-2 leading-relaxed sm:mt-3">{summary}</p>
                <span className="mt-auto flex items-center gap-1.5 pt-4 text-sm font-bold text-accent-700 sm:pt-5" aria-hidden="true">
                  Learn more
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1 motion-reduce:transform-none" />
                </span>
              </div>
            </li>
          ))}

          <li className="on-dark relative isolate flex flex-col overflow-hidden rounded-3xl bg-brand-950 p-7 text-brand-200">
            <div className="bg-shingles absolute inset-0 -z-10" />
            <span className="grid size-14 place-items-center rounded-2xl bg-accent-600 text-white">
              <ScanSearch className="size-7" aria-hidden="true" />
            </span>
            <h3 className="mt-6 text-xl text-white">Not sure what you need?</h3>
            <p className="mt-3 leading-relaxed">Start with a free 21-point inspection and an honest recommendation.</p>
            <ButtonLink href="#inspection" size="sm" className="mt-auto self-start">
              Book Free Inspection
            </ButtonLink>
          </li>
        </ul>
      </Container>
    </section>
  )
}
