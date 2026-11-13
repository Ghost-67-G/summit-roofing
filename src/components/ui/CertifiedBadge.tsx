import { cn } from '@/lib/cn'

/**
 * Generic "Certified Installer" seal — deliberately brand-free. Swap for a
 * real manufacturer badge only with that manufacturer's permission.
 */
export function CertifiedBadge({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 132" role="img" aria-label="Certified Installer" className={cn('h-auto', className)}>
      <path d="M60 4 112 22v40c0 32-21.5 54-52 66C29.5 116 8 94 8 62V22Z" fill="#121619" />
      <path d="M60 11 105 27v35c0 28-18.5 47.5-45 58.5C33.5 109.5 15 90 15 62V27Z" fill="none" stroke="#f5a524" strokeWidth="2.5" />
      <path d="M38 46 60 27l22 19" fill="none" stroke="#fff" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="m47 57 9 9 17-17" fill="none" stroke="#e3412f" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
      <text x="60" y="88" textAnchor="middle" fill="#fff" fontFamily="inherit" fontSize="12" fontWeight="800" letterSpacing="0.6">
        CERTIFIED
      </text>
      <text x="60" y="101" textAnchor="middle" fill="#f5a524" fontFamily="inherit" fontSize="8.5" fontWeight="700" letterSpacing="1">
        INSTALLER
      </text>
    </svg>
  )
}
