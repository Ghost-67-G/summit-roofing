import { ArrowRight } from 'lucide-react'
import { ButtonLink } from '@/components/ui/Button'
import { CheckList } from '@/components/ui/CheckList'
import { Container } from '@/components/ui/Container'
import { Picture } from '@/components/ui/Picture'
import { inspectionHrefFor } from '@/config/site'
import { PaymentEstimatorIsland } from './PaymentEstimator'

const perks = [
  'Fixed monthly payments with terms from 12 to 144 months',
  '0% promotional plans for qualified homeowners',
  'Pre-qualify in minutes — soft credit check, no impact on your score',
  'Combine with your insurance claim to cover the deductible',
]

export function Financing() {
  return (
    <section id="financing" aria-labelledby="financing-heading" className="py-20 sm:py-28">
      <Container className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div className="relative order-last lg:order-first">
          <div className="aspect-4/3 overflow-hidden rounded-[2rem] shadow-lift lg:aspect-square">
            <Picture
              name="financing-home"
              alt="Two-story gray home with a charcoal architectural shingle roof"
              sizes="(min-width: 1280px) 600px, (min-width: 1024px) 46vw, 100vw"
              className="size-full object-cover"
            />
          </div>
          <div className="absolute -right-3 -bottom-6 max-w-64 rounded-3xl bg-accent-600 p-5 text-white shadow-lift sm:right-6">
            <p className="text-sm font-semibold">Pre-qualify in</p>
            <p className="mt-0.5 text-3xl leading-tight font-black">2 minutes</p>
            <p className="mt-1 text-sm">No impact on your credit score</p>
          </div>
        </div>

        <div>
          <p className="eyebrow">Financing</p>
          <h2 id="financing-heading" className="mt-4 text-3xl leading-[1.1] sm:text-[2.75rem]">
            A new roof now. Easy monthly payments.
          </h2>
          <p className="mt-5 text-lg leading-relaxed">
            A roof shouldn’t wait for the perfect time. Flexible financing lets you protect your home today and pay over time — with simple
            terms and no prepayment penalties.
          </p>
          <CheckList items={perks} className="mt-7" />

          <div className="mt-8">
            <PaymentEstimatorIsland />
          </div>

          <ButtonLink href={inspectionHrefFor('financing')} variant="dark" className="mt-6">
            Check my financing options
            <ArrowRight className="size-4.5" aria-hidden="true" />
          </ButtonLink>
        </div>
      </Container>
    </section>
  )
}
