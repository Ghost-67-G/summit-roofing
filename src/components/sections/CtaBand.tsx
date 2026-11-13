import { Phone } from 'lucide-react'
import { ButtonLink } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { business } from '@/config/site'

interface CtaBandProps {
  title?: string
  text?: string
}

/** Closing call to action for inner pages without the inspection form. */
export function CtaBand({
  title = 'Ready for a roof that lasts?',
  text = 'Book a free, no-pressure inspection. You’ll get photos, an honest recommendation and a written quote.',
}: CtaBandProps) {
  return (
    <section aria-labelledby="cta-heading" className="py-16 sm:py-24">
      <Container>
        <div className="on-dark relative isolate overflow-hidden rounded-[2rem] bg-accent-600 px-6 py-12 text-white sm:px-12 lg:flex lg:items-center lg:justify-between lg:gap-10 lg:px-16 lg:py-14">
          <div className="bg-shingles absolute inset-0 -z-10" />
          <div className="max-w-2xl">
            <h2 id="cta-heading" className="text-3xl leading-tight text-white sm:text-4xl">
              {title}
            </h2>
            <p className="mt-3 text-lg text-white">{text}</p>
          </div>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row lg:mt-0 lg:shrink-0">
            <ButtonLink href="/contact/#inspection" variant="white" size="lg">
              Book Free Inspection
            </ButtonLink>
            <ButtonLink href={business.phone.href} variant="outline-light" size="lg">
              <Phone className="size-5" aria-hidden="true" />
              {business.phone.display}
            </ButtonLink>
          </div>
        </div>
      </Container>
    </section>
  )
}
