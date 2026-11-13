import { cn } from '@/lib/cn'

const STAR_PATH = 'M10 1.5l2.6 5.3 5.9.9-4.25 4.1 1 5.85L10 14.9l-5.25 2.75 1-5.85L1.5 7.7l5.9-.9L10 1.5z'

export function StarRating({ rating, className, tone = 'light' }: { rating: number; className?: string; tone?: 'light' | 'dark' }) {
  return (
    // A <span> so it can sit inside paragraphs and other phrasing content.
    <span className={cn('inline-flex gap-0.5', className)} role="img" aria-label={`Rated ${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          viewBox="0 0 20 20"
          aria-hidden="true"
          className={cn('size-[1.1em]', star <= Math.round(rating) ? 'fill-star' : tone === 'dark' ? 'fill-white/25' : 'fill-brand-200')}
        >
          <path d={STAR_PATH} />
        </svg>
      ))}
    </span>
  )
}
