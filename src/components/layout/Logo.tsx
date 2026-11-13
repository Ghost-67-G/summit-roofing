import { cn } from '@/lib/cn'

/** Same artwork as public/favicon.svg: a roof peak stacked on a red summit chevron. */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true" className={className}>
      <rect width="48" height="48" rx="12" fill="#121619" />
      <path d="M9.5 26.5 24 13l14.5 13.5" fill="none" stroke="#fff" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M15.5 35 24 27l8.5 8" fill="none" stroke="#e3412f" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M31.5 13.5v5.5" stroke="#fff" strokeWidth="4" strokeLinecap="round" />
    </svg>
  )
}

interface LogoProps {
  tone?: 'light' | 'dark'
  /** Header mode: tightens the wordmark on phones so the call and inspection buttons fit. */
  compact?: boolean
}

export function Logo({ tone = 'light', compact = false }: LogoProps) {
  return (
    <span className="flex items-center gap-2.5">
      <LogoMark className={cn('size-10 shrink-0', compact && 'max-sm:size-9', tone === 'dark' && 'rounded-xl ring-1 ring-white/15')} />
      <span className={cn('leading-none', compact && 'max-[419px]:sr-only')}>
        <span
          className={cn(
            'block text-[1.1875rem] font-black tracking-tight uppercase',
            compact && 'max-sm:text-base',
            tone === 'dark' ? 'text-white' : 'text-brand-950',
          )}
        >
          Summit
        </span>
        <span
          className={cn(
            'mt-0.5 block text-[0.625rem] font-bold tracking-[0.3em] whitespace-nowrap uppercase',
            tone === 'dark' ? 'text-accent-300' : 'text-accent-700',
          )}
        >
          Roofing Co.
        </span>
      </span>
    </span>
  )
}
