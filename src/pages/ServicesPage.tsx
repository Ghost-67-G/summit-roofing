import { Phone } from 'lucide-react'
import { CtaBand } from '@/components/sections/CtaBand'
import { PageHero } from '@/components/sections/PageHero'
import { ButtonLink } from '@/components/ui/Button'
import { CheckList } from '@/components/ui/CheckList'
import { Container } from '@/components/ui/Container'
import { Picture } from '@/components/ui/Picture'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { business, inspectionHrefFor } from '@/config/site'
import { services, type Service } from '@/data/services'
import { cn } from '@/lib/cn'
import { servicesSchema, type PageMeta } from '@/lib/seo'

export const servicesMeta: PageMeta = {
  path: '/services/',
  breadcrumb: 'Services',
  title: 'Roofing Services in Charlotte, NC | Summit Roofing Co.',
  description:
    'Roof replacement, roof repair, storm & hail damage, insurance claim help, seamless gutters, commercial roofing and free inspections across the Charlotte region.',
  schema: [servicesSchema()],
}

const materials = [
  {
    name: 'Architectural shingles',
    life: '25–30 years',
    text: 'Dimensional asphalt shingles with a high-wind rating — the best value for most Charlotte homes.',
  },
  {
    name: 'Designer shingles',
    life: '30–40 years',
    text: 'Heavyweight shingles that recreate the look of slate or cedar shake, without the weight or upkeep.',
  },
  {
    name: 'Standing-seam metal',
    life: '40–70 years',
    text: 'Concealed-fastener metal panels that shed storms, reflect summer heat and last for generations.',
  },
  {
    name: 'Low-slope & flat',
    life: '20–30 years',
    text: 'TPO, EPDM and modified-bitumen membranes for porches, additions and commercial buildings.',
  },
]

const claimSteps = [
  { title: 'Free storm inspection', text: 'We document hail hits, wind damage and leaks with dated photos.' },
  { title: 'You file the claim', text: 'Call your insurer with our report in hand. We’ll help you know what to say.' },
  { title: 'Adjuster meeting', text: 'We meet the adjuster on your roof and point out every damaged area.' },
  { title: 'Restoration', text: 'Once approved, we restore your roof and handle supplements for missed items.' },
]

function ServiceBlock({ service, index }: { service: Service; index: number }) {
  const { slug, name, icon: Icon, intro, included, facts, image, imageAlt } = service
  const reversed = index % 2 === 1

  return (
    <article id={slug} aria-labelledby={`${slug}-heading`} className="py-14 sm:py-20">
      <Container className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div className={cn('relative', reversed && 'lg:order-last')}>
          <div className="aspect-4/3 overflow-hidden rounded-[2rem] shadow-lift">
            <Picture
              name={image}
              alt={imageAlt}
              sizes="(min-width: 1280px) 600px, (min-width: 1024px) 46vw, 100vw"
              className="size-full object-cover"
            />
          </div>
          <span
            className={cn(
              'absolute -bottom-5 grid size-16 place-items-center rounded-2xl bg-accent-600 text-white shadow-cta',
              reversed ? 'right-6' : 'left-6',
            )}
          >
            <Icon className="size-8" aria-hidden="true" />
          </span>
        </div>

        <div>
          <p className="eyebrow">Service {String(index + 1).padStart(2, '0')}</p>
          <h2 id={`${slug}-heading`} className="mt-4 text-3xl leading-tight sm:text-4xl">
            {name}
          </h2>
          <p className="mt-5 text-lg leading-relaxed">{intro}</p>

          <h3 className="mt-8 text-sm font-bold tracking-[0.16em] text-brand-950 uppercase">What’s included</h3>
          <CheckList items={included} className="mt-4" />

          <dl className="mt-8 grid grid-cols-2 gap-3">
            {facts.map((fact) => (
              <div key={fact.label} className="rounded-2xl bg-brand-50 px-5 py-4">
                <dt className="text-sm font-semibold">{fact.label}</dt>
                <dd className="mt-1 text-lg font-extrabold text-brand-950">{fact.value}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href={inspectionHrefFor(slug)}>Book Free Inspection</ButtonLink>
            <ButtonLink href={business.phone.href} variant="outline">
              <Phone className="size-4.5" aria-hidden="true" />
              {business.phone.display}
            </ButtonLink>
          </div>
        </div>
      </Container>
    </article>
  )
}

export function ServicesPage() {
  return (
    <>
      <PageHero
        breadcrumb="Services"
        eyebrow="Roofing services"
        title="Everything your roof needs, from one local crew"
        description="Replacements, repairs, storm restoration, gutters and commercial roofing — all installed by our own certified crews and backed by real warranties."
        image="project-2-after"
      >
        <nav aria-label="Jump to a service" className="mt-9">
          <ul className="flex flex-wrap gap-2">
            {services.map((service) => (
              <li key={service.slug}>
                <a
                  href={`#${service.slug}`}
                  className="inline-flex items-center rounded-full border border-white/20 bg-white/5 px-4 py-2 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:border-white/50 hover:bg-white/10"
                >
                  {service.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </PageHero>

      <div className="divide-y divide-brand-100">
        {services.map((service, index) => (
          <ServiceBlock key={service.slug} service={service} index={index} />
        ))}
      </div>

      <section
        aria-labelledby="claims-heading"
        className="on-dark relative isolate overflow-hidden bg-brand-950 py-20 text-brand-200 sm:py-24"
      >
        <div className="bg-shingles absolute inset-0 -z-10" />
        <Container>
          <SectionHeading
            id="claims-heading"
            eyebrow="Insurance claims"
            title="How a storm claim works with Summit"
            description="Most homeowners only go through a roof claim once. We’ve guided hundreds of Charlotte-area families through it — here’s how it works."
            tone="dark"
          />
          <ol className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {claimSteps.map((step, index) => (
              <li key={step.title} className="rounded-3xl border border-white/10 bg-white/5 p-7">
                <span className="text-sm font-black tracking-[0.16em] text-accent-300" aria-hidden="true">
                  STEP {index + 1}
                </span>
                <h3 className="mt-3 text-xl text-white">{step.title}</h3>
                <p className="mt-2 leading-relaxed">{step.text}</p>
              </li>
            ))}
          </ol>
          <p className="mx-auto mt-10 max-w-3xl text-center text-sm text-brand-300">
            Summit Roofing Co. is a roofing contractor, not a public adjuster. Coverage decisions are made by your insurance company, and we
            never waive or rebate deductibles.
          </p>
        </Container>
      </section>

      <section aria-labelledby="materials-heading" className="py-20 sm:py-28">
        <Container>
          <SectionHeading
            id="materials-heading"
            eyebrow="Roofing systems"
            title="Materials we install"
            description="We’ll recommend the right system for your home, budget and how long you plan to stay."
          />
          <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {materials.map((material) => (
              <li key={material.name} className="rounded-3xl border border-brand-100 bg-white p-7 shadow-card">
                <p className="inline-flex rounded-full bg-accent-50 px-3 py-1 text-sm font-bold text-accent-700">{material.life}</p>
                <h3 className="mt-5 text-xl">{material.name}</h3>
                <p className="mt-2 leading-relaxed">{material.text}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <CtaBand />
    </>
  )
}
