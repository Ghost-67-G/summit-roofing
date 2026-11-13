import { Check } from 'lucide-react'
import { cn } from '@/lib/cn'

export function CheckList({ items, className, tone = 'light' }: { items: readonly string[]; className?: string; tone?: 'light' | 'dark' }) {
  return (
    <ul className={cn('space-y-3', className)}>
      {items.map((item) => (
        <li key={item} className="flex gap-3">
          <span
            className={cn(
              'mt-0.5 grid size-5 shrink-0 place-items-center rounded-full',
              tone === 'dark' ? 'bg-accent-600 text-white' : 'bg-accent-100 text-accent-700',
            )}
          >
            <Check className="size-3.5" strokeWidth={3} aria-hidden="true" />
          </span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}
