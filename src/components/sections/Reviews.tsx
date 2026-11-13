import { Quote } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { StarRating } from '@/components/ui/StarRating'
import { business } from '@/config/site'
import { reviews } from '@/data/reviews'

const initials = (name: string) =>
  name
    .split(/[\s&]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')

export function Reviews() {
  return (
    <section id="reviews" aria-labelledby="reviews-heading" className="bg-brand-50 py-20 sm:py-28">
      <Container>
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            id="reviews-heading"
            align="left"
            eyebrow="Customer reviews"
            title="Trusted by 400+ neighbors across the Charlotte region"
            description="Real feedback from homeowners and business owners we’ve worked with."
          />

          <div className="flex shrink-0 items-center gap-5 self-start rounded-3xl bg-white p-6 shadow-card lg:self-auto">
            <span className="text-5xl font-black text-brand-950">{business.rating.value}</span>
            <span>
              <StarRating rating={business.rating.value} className="text-xl" />
              <span className="mt-1 block text-sm font-semibold text-brand-600">Average from {business.rating.count} verified reviews</span>
            </span>
          </div>
        </div>

        <ul className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review) => (
            <li key={review.name}>
              <figure className="relative flex h-full flex-col rounded-3xl bg-white p-7 shadow-card">
                <Quote className="absolute top-6 right-6 size-10 fill-accent-50 text-accent-100" aria-hidden="true" />
                <StarRating rating={review.rating} className="text-lg" />
                <blockquote className="mt-5 flex-1 leading-relaxed text-brand-700">
                  <p>“{review.quote}”</p>
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3 border-t border-brand-100 pt-5">
                  <span
                    className="grid size-11 shrink-0 place-items-center rounded-full bg-brand-950 text-sm font-bold text-white"
                    aria-hidden="true"
                  >
                    {initials(review.name)}
                  </span>
                  <span className="leading-tight">
                    <span className="block font-bold text-brand-950">{review.name}</span>
                    <span className="mt-0.5 block text-sm">
                      {review.city} · {review.service}
                    </span>
                  </span>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
