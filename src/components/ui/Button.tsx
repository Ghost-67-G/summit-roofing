import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from 'react'
import { cn } from '@/lib/cn'

type Variant = 'primary' | 'dark' | 'outline' | 'outline-light' | 'white'
type Size = 'sm' | 'md' | 'lg'

const base =
  'inline-flex items-center justify-center gap-2 rounded-full font-bold whitespace-nowrap transition duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-70'

const variants: Record<Variant, string> = {
  // White on accent-600 is 5.6:1, so the red buttons pass WCAG AA at any size.
  primary: 'bg-accent-600 text-white shadow-cta hover:bg-accent-700 hover:-translate-y-0.5 focus-visible:outline-accent-600',
  dark: 'bg-brand-950 text-white hover:bg-brand-800 hover:-translate-y-0.5 focus-visible:outline-brand-950',
  outline:
    'border-2 border-brand-950/15 bg-white text-brand-950 hover:border-brand-950/40 hover:-translate-y-0.5 focus-visible:outline-brand-700',
  'outline-light':
    'border-2 border-white/35 text-white backdrop-blur-sm hover:border-white hover:bg-white/10 hover:-translate-y-0.5 focus-visible:outline-white',
  white: 'bg-white text-accent-700 shadow-lift hover:bg-accent-50 hover:-translate-y-0.5 focus-visible:outline-white',
}

const sizes: Record<Size, string> = {
  sm: 'h-10 px-4 text-sm',
  md: 'h-12 px-6 text-base',
  lg: 'h-14 px-7 text-base sm:text-lg',
}

interface StyleProps {
  variant?: Variant
  size?: Size
}

export function buttonClasses({ variant = 'primary', size = 'md' }: StyleProps = {}, className?: string) {
  return cn(base, variants[variant], sizes[size], 'motion-reduce:transform-none', className)
}

export function ButtonLink({ variant, size, className, ...props }: StyleProps & AnchorHTMLAttributes<HTMLAnchorElement>) {
  return <a className={buttonClasses({ variant, size }, className)} {...props} />
}

export function Button({ variant, size, className, type = 'button', ...props }: StyleProps & ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button type={type} className={buttonClasses({ variant, size }, className)} {...props} />
}
