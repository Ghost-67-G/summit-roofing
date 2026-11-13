import { ArrowRight } from 'lucide-react'
import { ButtonLink } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { Picture } from '@/components/ui/Picture'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { featuredProjects, projectCategories } from '@/data/projects'
import { cn } from '@/lib/cn'

/** Six recent projects in a bento grid; the first tile is featured at double size. */
export function GalleryPreview() {
  return (
    <section aria-labelledby="work-heading" className="py-20 sm:py-28">
      <Container>
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            id="work-heading"
            align="left"
            eyebrow="Our work"
            title="Recent projects around Charlotte"
            description="Replacements, storm restorations, metal roofs and commercial work — see the before and after."
          />
          <ButtonLink href="/our-work/" variant="outline" className="shrink-0 self-start md:self-auto">
            See all projects
            <ArrowRight className="size-4.5" aria-hidden="true" />
          </ButtonLink>
        </div>

        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {featuredProjects.map((project, index) => {
            const featured = index === 0
            return (
              <li key={project.slug} className={cn(featured && 'sm:col-span-2 lg:row-span-2')}>
                <a
                  href={`/our-work/#${project.slug}`}
                  className={cn(
                    'group relative block h-full overflow-hidden rounded-3xl bg-brand-900',
                    featured ? 'aspect-4/3 lg:aspect-auto lg:min-h-full' : 'aspect-4/3',
                  )}
                >
                  <Picture
                    name={project.after.image}
                    alt={project.after.alt}
                    sizes={
                      featured
                        ? '(min-width: 1280px) 820px, (min-width: 1024px) 64vw, 100vw'
                        : '(min-width: 1280px) 400px, (min-width: 1024px) 31vw, (min-width: 640px) 50vw, 100vw'
                    }
                    className="absolute inset-0 size-full object-cover transition duration-500 group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-brand-950/90 via-brand-950/20 to-transparent" />

                  <div
                    className={cn(
                      'absolute top-3 right-3 overflow-hidden rounded-xl shadow-lift ring-2 ring-white',
                      featured ? 'w-[28%]' : 'w-[34%]',
                    )}
                  >
                    <Picture
                      name={project.before.image}
                      alt=""
                      sizes="(min-width: 1024px) 240px, 35vw"
                      className="aspect-4/3 w-full object-cover grayscale-[35%]"
                    />
                    <span className="absolute inset-x-0 bottom-0 bg-brand-950/80 py-0.5 text-center text-[0.6875rem] font-bold tracking-wider text-white uppercase">
                      Before
                    </span>
                  </div>

                  <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                    <span className="inline-block rounded-full bg-accent-600 px-2.5 py-1 text-xs font-bold text-white">
                      {projectCategories[project.category]}
                    </span>
                    <h3 className={cn('mt-2.5 text-white', featured ? 'text-2xl sm:text-3xl' : 'text-lg')}>{project.title}</h3>
                    <p className="mt-1 flex items-center gap-1.5 text-sm font-semibold text-brand-100">
                      {project.city}
                      <ArrowRight
                        className="size-4 opacity-0 transition group-hover:translate-x-1 group-hover:opacity-100 motion-reduce:transition-none"
                        aria-hidden="true"
                      />
                    </p>
                  </div>
                </a>
              </li>
            )
          })}
        </ul>
      </Container>
    </section>
  )
}
