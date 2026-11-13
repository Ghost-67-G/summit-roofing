import { useId, useState } from 'react'
import { island } from '@/islands/island'
import { cn } from '@/lib/cn'

/** Example APR for the estimate only — real rates come from the lender. */
const EXAMPLE_APR = 7.99
const TERMS = [60, 120, 144]
const MIN_COST = 5000
const MAX_COST = 40000
const STEP = 500

const currency = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })

export function monthlyPayment(principal: number, months: number, apr = EXAMPLE_APR) {
  const rate = apr / 100 / 12
  return (principal * rate) / (1 - (1 + rate) ** -months)
}

export function PaymentEstimator({ initialCost = 14000 }: { initialCost?: number }) {
  const [cost, setCost] = useState(initialCost)
  const [term, setTerm] = useState(120)
  const id = useId()
  const payment = Math.round(monthlyPayment(cost, term))

  return (
    <div className="rounded-3xl border border-brand-100 bg-white p-6 shadow-card sm:p-7">
      <div className="flex items-baseline justify-between gap-4">
        <label htmlFor={`${id}-cost`} className="font-bold text-brand-950">
          Project cost
        </label>
        <output htmlFor={`${id}-cost`} className="text-lg font-extrabold text-brand-950">
          {currency.format(cost)}
        </output>
      </div>
      <input
        id={`${id}-cost`}
        type="range"
        min={MIN_COST}
        max={MAX_COST}
        step={STEP}
        value={cost}
        onChange={(event) => setCost(Number(event.target.value))}
        className="mt-3 h-2 w-full cursor-pointer accent-accent-600"
      />

      <fieldset className="mt-6">
        <legend className="font-bold text-brand-950">Loan term</legend>
        <div className="mt-3 grid grid-cols-3 gap-2">
          {TERMS.map((months) => (
            <label
              key={months}
              className={cn(
                'cursor-pointer rounded-xl border-2 px-2 py-2.5 text-center text-sm font-bold transition-colors has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-accent-600',
                term === months
                  ? 'border-accent-600 bg-accent-50 text-accent-800'
                  : 'border-brand-100 text-brand-700 hover:border-brand-300',
              )}
            >
              <input
                type="radio"
                name={`${id}-term`}
                value={months}
                checked={term === months}
                onChange={() => setTerm(months)}
                className="sr-only"
              />
              {months / 12} years
            </label>
          ))}
        </div>
      </fieldset>

      <div className="mt-6 flex items-end justify-between gap-4 rounded-2xl bg-brand-950 px-5 py-4 text-white" aria-live="polite">
        <span className="text-sm font-semibold text-brand-200">Estimated payment</span>
        <span>
          <span className="text-3xl font-black">{currency.format(payment)}</span>
          <span className="text-brand-200">/mo</span>
        </span>
      </div>
      <p className="mt-3 text-xs leading-relaxed text-brand-600">
        Example only, at {EXAMPLE_APR}% APR over {term} months. Actual rate and terms depend on credit approval by our third-party lending
        partners.
      </p>
    </div>
  )
}

export const PaymentEstimatorIsland = island('PaymentEstimator', PaymentEstimator, 'visible')
