import { CtaBand } from '@/components/sections/CtaBand'
import { PageHero } from '@/components/sections/PageHero'
import { Container } from '@/components/ui/Container'
import { ProjectCard } from '@/components/work/ProjectCard'
import { ProjectFilterIsland } from '@/components/work/ProjectFilter'
import { business, yearsInBusiness } from '@/config/site'
import { projectCategories, projects, type ProjectCategory } from '@/data/projects'
import type { PageMeta } from '@/lib/seo'

export const ourWorkMeta: PageMeta = {
  path: '/our-work/',
  breadcrumb: 'Our Work',
  title: 'Our Work: Before & After Roofing Projects | Summit Roofing Co.',
  description:
    'Before-and-after photos of roof replacements, storm damage restorations, metal roofs, gutters and commercial roofing projects across the Charlotte region.',
}

const stats = [
  { value: '4,800+', label: 'Roofs completed' },
  { value: `${yearsInBusiness} yrs`, label: 'Serving Charlotte' },
  { value: `${business.rating.value}★`, label: 'Average review' },
  { value: '1 day', label: 'Typical re-roof' },
]

const filterOptions = (Object.keys(projectCategories) as ProjectCategory[]).map((value) => ({
  value,
  label: projectCategories[value],
  count: projects.filter((project) => project.category === value).length,
}))

export function OurWorkPage() {
  return (
    <>
      <PageHero
        breadcrumb="Our Work"
        eyebrow="Project gallery"
        title="Before & after: roofs we’re proud of"
        description="A look at recent jobs across the Charlotte region — from storm restorations and metal roofs to historic homes and commercial buildings."
        image="project-1-after"
      >
        <dl className="mt-10 grid max-w-2xl grid-cols-2 gap-x-6 gap-y-6 border-t border-white/15 pt-8 sm:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label}>
              <dt className="text-sm font-semibold text-brand-200">{stat.label}</dt>
              <dd className="mt-1 text-3xl font-black text-white">{stat.value}</dd>
            </div>
          ))}
        </dl>
      </PageHero>

      <section aria-labelledby="projects-heading" className="bg-brand-50 py-16 sm:py-24">
        <Container>
          <h2 id="projects-heading" className="sr-only">
            Projects
          </h2>
          <ProjectFilterIsland targetId="project-grid" options={filterOptions} />
          <ul id="project-grid" className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <li key={project.slug} data-category={project.category}>
                <ProjectCard project={project} />
              </li>
            ))}
          </ul>
          <p className="mt-10 text-center text-sm text-brand-600">Project photos are representative stock images for this demo website.</p>
        </Container>
      </section>

      <CtaBand
        title="Want results like these?"
        text="It starts with a free inspection and an honest recommendation — no pressure, no obligation."
      />
    </>
  )
}
