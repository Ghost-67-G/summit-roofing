import { ClipboardList, Hammer, ScanSearch, ShieldCheck } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { SectionHeading } from '@/components/ui/SectionHeading'

const steps = [
  {
    icon: ScanSearch,
    title: 'Free inspection',
    text: 'An inspector checks 21 points on your roof, attic and gutters, then shows you photos of everything we found.',
  },
  {
    icon: ClipboardList,
    title: 'Clear quote',
    text: 'A written, itemized quote with good–better–best options. The price we quote is the price you pay.',
  },
  {
    icon: Hammer,
    title: 'Fast installation',
    text: 'Most roofs are done in a single day. We protect your landscaping and magnet-sweep the yard for nails.',
  },
  {
    icon: ShieldCheck,
    title: 'Final walkthrough',
    text: 'We walk the finished job with you, register your warranty and send a photo report of the completed roof.',
  },
]

export function HowItWorks() {
  return (
    <section
      aria-labelledby="process-heading"
      className="on-dark relative isolate overflow-hidden bg-brand-950 py-20 text-brand-200 sm:py-28"
    >
      <div className="bg-shingles absolute inset-0 -z-10 mask-[linear-gradient(to_bottom,black,transparent)]" />
      <Container>
        <SectionHeading
          id="process-heading"
          eyebrow="How it works"
          title="Four simple steps to a new roof"
          tone="dark"
          description="No pressure, no surprises. You’ll know exactly what’s happening — and what it costs — at every step."
        />

        <div className="relative mt-16">
          {/* Connecting line behind the step icons on wide screens. */}
          <div
            className="absolute top-8 right-[12.5%] left-[12.5%] hidden h-px bg-linear-to-r from-accent-600/0 via-accent-500/60 to-accent-600/0 lg:block"
            aria-hidden="true"
          />
          <ol className="relative grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            {steps.map(({ icon: Icon, title, text }, index) => (
              <li key={title} className="relative text-center">
                <span className="relative mx-auto grid size-16 place-items-center rounded-2xl bg-accent-600 text-white shadow-cta">
                  <Icon className="size-7" aria-hidden="true" />
                  <span className="absolute -top-2.5 -right-2.5 grid size-7 place-items-center rounded-full bg-white text-xs font-black text-brand-950">
                    {index + 1}
                  </span>
                </span>
                <h3 className="mt-6 text-xl text-white">
                  <span className="sr-only">Step {index + 1}: </span>
                  {title}
                </h3>
                <p className="mx-auto mt-3 max-w-xs leading-relaxed">{text}</p>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  )
}
