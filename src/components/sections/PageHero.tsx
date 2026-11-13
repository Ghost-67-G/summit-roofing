import { ChevronRight } from 'lucide-react'
import type { ReactNode } from 'react'
import { Container } from '@/components/ui/Container'
import { Picture } from '@/components/ui/Picture'
import type { ImageName } from '@/lib/images'

interface PageHeroProps {
  breadcrumb: string
  eyebrow?: string
  title: ReactNode
  description: ReactNode
  /** Optional background photo, heavily darkened. */
  image?: ImageName
  children?: ReactNode
}

/** Dark header band for inner pages, with a visible breadcrumb. */
export function PageHero({ breadcrumb, eyebrow, title, description, image, children }: PageHeroProps) {
  return (
    <section className="on-dark relative isolate overflow-hidden bg-brand-950 text-brand-200">
      {image ? (
        <>
          <Picture name={image} alt="" sizes="100vw" priority className="absolute inset-0 -z-20 size-full object-cover" />
          <div className="absolute inset-0 -z-10 bg-linear-to-r from-brand-950 via-brand-950/90 to-brand-950/55" />
        </>
      ) : (
        <div className="bg-shingles absolute inset-0 -z-10" />
      )}

      <Container className="pt-10 pb-16 sm:pt-12 sm:pb-20 lg:pb-24">
        <nav aria-label="Breadcrumb">
          <ol className="flex items-center gap-1.5 text-sm font-semibold">
            <li>
              <a href="/" className="text-brand-200 hover:text-white">
                Home
              </a>
            </li>
            <li aria-hidden="true">
              <ChevronRight className="size-4 text-brand-400" />
            </li>
            <li aria-current="page" className="text-white">
              {breadcrumb}
            </li>
          </ol>
        </nav>
        <div className="mt-10 max-w-3xl">
          {eyebrow && <p className="eyebrow">{eyebrow}</p>}
          <h1
            className={
              eyebrow
                ? 'mt-4 text-4xl leading-[1.05] font-black text-white sm:text-6xl'
                : 'text-4xl leading-[1.05] font-black text-white sm:text-6xl'
            }
          >
            {title}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-brand-100 sm:text-xl">{description}</p>
          {children}
        </div>
      </Container>
    </section>
  )
}
