import { useEffect, useState } from 'react'
import { island } from '@/islands/island'
import { cn } from '@/lib/cn'

interface ProjectFilterProps {
  /** id of the list whose `[data-category]` items get filtered. */
  targetId: string
  options: { value: string; label: string; count: number }[]
}

/**
 * Category chips for the Our Work gallery. The cards themselves are static
 * HTML; this island only toggles their `hidden` attribute, so the photos and
 * copy never ship as JavaScript.
 */
export function ProjectFilter({ targetId, options }: ProjectFilterProps) {
  const [active, setActive] = useState('all')
  const total = options.reduce((sum, option) => sum + option.count, 0)
  const visible = active === 'all' ? total : (options.find((o) => o.value === active)?.count ?? 0)

  useEffect(() => {
    const items = document.getElementById(targetId)?.querySelectorAll<HTMLElement>('[data-category]') ?? []
    for (const item of items) item.hidden = active !== 'all' && item.dataset.category !== active
  }, [active, targetId])

  const chips = [{ value: 'all', label: 'All projects', count: total }, ...options]

  return (
    <div>
      <div role="group" aria-label="Filter projects by type" className="flex flex-wrap justify-center gap-2">
        {chips.map((chip) => (
          <button
            key={chip.value}
            type="button"
            aria-pressed={active === chip.value}
            aria-controls={targetId}
            onClick={() => setActive(chip.value)}
            className={cn(
              'inline-flex h-10 items-center gap-2 rounded-full border px-4 text-sm font-bold transition-colors',
              active === chip.value
                ? 'border-brand-950 bg-brand-950 text-white'
                : 'border-brand-200 bg-white text-brand-800 hover:border-brand-400',
            )}
          >
            {chip.label}
            <span
              className={cn('rounded-full px-1.5 text-xs', active === chip.value ? 'bg-white/15 text-white' : 'bg-brand-50 text-brand-600')}
            >
              {chip.count}
            </span>
          </button>
        ))}
      </div>
      <p className="sr-only" aria-live="polite">
        Showing {visible} {visible === 1 ? 'project' : 'projects'}
      </p>
    </div>
  )
}

export const ProjectFilterIsland = island('ProjectFilter', ProjectFilter, 'interaction')
