import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

interface SectionHeadingProps {
  eyebrow: string
  title: ReactNode
  description?: ReactNode
  align?: 'left' | 'center'
  id?: string
  className?: string
  /** `dark` for sections with a dark background. */
  tone?: 'light' | 'dark'
}

export function SectionHeading({ eyebrow, title, description, align = 'center', id, className, tone = 'light' }: SectionHeadingProps) {
  return (
    <div className={cn('max-w-2xl', align === 'center' && 'mx-auto text-center', className)}>
      <p className="eyebrow">{eyebrow}</p>
      <h2 id={id} className={cn('mt-4 text-3xl leading-[1.1] sm:text-[2.75rem]', tone === 'dark' && 'text-white')}>
        {title}
      </h2>
      {description && <p className="mt-5 text-lg leading-relaxed">{description}</p>}
    </div>
  )
}
