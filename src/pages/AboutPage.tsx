import { Award, BadgeCheck, HardHat, HeartHandshake, MessagesSquare, ShieldCheck, Sparkles, Users } from 'lucide-react'
import { CtaBand } from '@/components/sections/CtaBand'
import { PageHero } from '@/components/sections/PageHero'
import { CertifiedBadge } from '@/components/ui/CertifiedBadge'
import { CheckList } from '@/components/ui/CheckList'
import { Container } from '@/components/ui/Container'
import { Picture } from '@/components/ui/Picture'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { business, yearsInBusiness } from '@/config/site'
import type { PageMeta } from '@/lib/seo'

export const aboutMeta: PageMeta = {
  path: '/about/',
  breadcrumb: 'About',
  title: 'About Us | Locally Owned Charlotte Roofers | Summit Roofing Co.',
  description:
    'Locally owned since 2011, Summit Roofing Co. is a licensed, insured and certified roofing contractor rated 4.8 stars by 400+ Charlotte-area homeowners.',
}

const stats = [
  { value: `${yearsInBusiness}`, label: 'Years in business' },
  { value: '4,800+', label: 'Roofs completed' },
  { value: `${business.rating.value}★`, label: `Average from ${business.rating.label} reviews` },
  { value: '100%', label: 'In-house, W-2 crews' },
]

const values = [
  {
    icon: MessagesSquare,
    title: 'Straight talk',
    text: 'If a repair will do, we’ll say so. Every recommendation comes with photos, so you can see what we see.',
  },
  {
    icon: HardHat,
    title: 'Craftsmanship',
    text: 'We install every system to manufacturer spec, with no shortcuts on underlayment, flashing or ventilation.',
  },
  {
    icon: Sparkles,
    title: 'Clean job sites',
    text: 'Tarps over your landscaping, magnetic nail sweeps every day, and a yard that looks like we were never there.',
  },
  {
    icon: HeartHandshake,
    title: 'Here for the long haul',
    text: 'We’re local, and our lifetime workmanship warranty means we’ll be around to stand behind every roof.',
  },
]

const credentials = [
  'Licensed general contractor in North Carolina; registered residential builder in South Carolina',
  '$2M general liability and full workers’ compensation coverage',
  'Certified Installer status with enhanced manufacturer warranties',
  'OSHA-trained, background-checked crews — no day-labor subcontractors',
  'Lifetime workmanship warranty on every full replacement',
]

const milestones = [
  { year: '2011', text: 'Founded in Charlotte with one truck, two roofers and a promise to do things right.' },
  { year: '2014', text: 'Added a commercial division for flat and low-slope roofs.' },
  { year: '2017', text: 'Earned Certified Installer status, unlocking enhanced manufacturer warranties.' },
  { year: '2020', text: 'Launched seamless gutters and a dedicated storm response team.' },
  { year: '2024', text: 'Passed 400 customer reviews with a 4.8-star average.' },
  { year: 'Today', text: 'Five crews serving six cities across the Charlotte region.' },
]

export function AboutPage() {
  return (
    <>
      <PageHero
        breadcrumb="About"
        eyebrow="About us"
        title="Charlotte roofers you can actually reach"
        description={`For ${yearsInBusiness} years we’ve built roofs the way we’d want them on our own homes — and answered the phone when our customers needed us.`}
        image="about-team"
      />

      <section aria-labelledby="story-heading" className="py-20 sm:py-28">
        <Container className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <SectionHeading id="story-heading" align="left" eyebrow="Our story" title="Built on referrals, one roof at a time" />
            <div className="mt-6 space-y-5 text-lg leading-relaxed">
              <p>
                Summit Roofing Co. started in {business.foundedYear} when our founder, Dave Morrison, got tired of watching storm chasers
                roll into town, cut corners and disappear before the first leak. He started a company built on the opposite idea: show up,
                do it right and stick around.
              </p>
              <p>
                {yearsInBusiness} years later, we’re still locally owned and still growing almost entirely on referrals. Every job is run by
                a Summit project manager and installed by our own crews, never handed off to whoever is cheapest that week.
              </p>
              <p>
                We’ve re-roofed historic homes in Dilworth, new builds in Ballantyne, lake houses in Huntersville and offices across the
                region. The address changes. The standard doesn’t.
              </p>
            </div>
          </div>

          <div className="grid content-start gap-6">
            <dl className="grid grid-cols-2 gap-4">
              {stats.map((stat) => (
                <div key={stat.label} className="rounded-3xl bg-brand-50 p-6">
                  <dt className="text-sm font-semibold">{stat.label}</dt>
                  <dd className="mt-2 text-4xl font-black text-brand-950">{stat.value}</dd>
                </div>
              ))}
            </dl>
            <div className="aspect-16/10 overflow-hidden rounded-[2rem] shadow-lift">
              <Picture
                name="service-replacement"
                alt="Roofer in a safety harness working on a shingle roof"
                sizes="(min-width: 1280px) 600px, (min-width: 1024px) 46vw, 100vw"
                className="size-full object-cover"
              />
            </div>
          </div>
        </Container>
      </section>

      <section aria-labelledby="values-heading" className="bg-brand-50 py-20 sm:py-28">
        <Container>
          <SectionHeading
            id="values-heading"
            eyebrow="What we stand for"
            title="The Summit standard"
            description="Four promises every crew member makes on every job."
          />
          <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {values.map(({ icon: Icon, title, text }) => (
              <li key={title} className="rounded-3xl bg-white p-7 shadow-card">
                <span className="grid size-14 place-items-center rounded-2xl bg-accent-50 text-accent-700">
                  <Icon className="size-7" aria-hidden="true" />
                </span>
                <h3 className="mt-6 text-xl">{title}</h3>
                <p className="mt-2 leading-relaxed">{text}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section aria-labelledby="credentials-heading" className="py-20 sm:py-28">
        <Container className="grid items-start gap-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <SectionHeading id="credentials-heading" align="left" eyebrow="Credentials" title="Licensed, insured and certified" />
            <div className="mt-8 flex items-center gap-6 rounded-3xl border border-brand-100 p-6 shadow-card">
              <CertifiedBadge className="w-24 shrink-0" />
              <div>
                <p className="text-xl font-extrabold text-brand-950">Certified Installer</p>
                <p className="mt-1 leading-relaxed">
                  Factory training and inspections let us register enhanced warranties that cover both materials and labor.
                </p>
              </div>
            </div>
            <CheckList items={credentials} className="mt-8" />
            <ul className="mt-8 flex flex-wrap gap-3">
              {[
                { icon: ShieldCheck, label: 'Licensed & insured' },
                { icon: Award, label: 'Lifetime warranty' },
                { icon: BadgeCheck, label: business.license },
                { icon: Users, label: 'Locally owned' },
              ].map(({ icon: Icon, label }) => (
                <li
                  key={label}
                  className="inline-flex items-center gap-2 rounded-full bg-brand-950 px-4 py-2 text-sm font-semibold text-white"
                >
                  <Icon className="size-4 text-accent-300" aria-hidden="true" />
                  {label}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-sm font-bold tracking-[0.16em] text-brand-950 uppercase">Our journey</h2>
            <ol className="mt-6 border-l-2 border-brand-100">
              {milestones.map((milestone) => (
                <li key={milestone.year} className="relative pb-8 pl-8 last:pb-0">
                  <span
                    className="absolute top-1.5 -left-[9px] size-4 rounded-full border-4 border-white bg-accent-600 ring-1 ring-accent-200"
                    aria-hidden="true"
                  />
                  <p className="text-lg font-black text-brand-950">{milestone.year}</p>
                  <p className="mt-1 leading-relaxed">{milestone.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </Container>
      </section>

      <CtaBand title="See the Summit difference on your roof" />
    </>
  )
}
