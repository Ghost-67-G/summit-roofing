import { CloudLightning, Phone } from 'lucide-react'
import { ButtonLink } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { business } from '@/config/site'

export function StormBanner() {
  return (
    <section aria-labelledby="storm-heading" className="on-dark relative isolate overflow-hidden bg-accent-600 text-white">
      <div className="bg-shingles absolute inset-0 -z-10" />
      <Container className="flex flex-col gap-6 py-8 md:flex-row md:items-center md:justify-between lg:py-9">
        <div className="flex items-start gap-4 sm:items-center">
          <span className="grid size-14 shrink-0 place-items-center rounded-2xl bg-white/15 ring-1 ring-white/25">
            <CloudLightning className="size-7" aria-hidden="true" />
          </span>
          <div>
            <h2 id="storm-heading" className="text-2xl leading-tight text-white sm:text-[1.75rem]">
              Storm damage? We help with your insurance claim.
            </h2>
            <p className="mt-1.5 font-medium text-white">
              Free damage inspection, same-day emergency tarping, and we meet your adjuster on the roof.
            </p>
          </div>
        </div>
        <ButtonLink href={business.phone.href} variant="white" size="lg" className="shrink-0">
          <Phone className="size-5" aria-hidden="true" />
          Call {business.phone.display}
        </ButtonLink>
      </Container>
    </section>
  )
}
