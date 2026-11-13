import { ArrowLeftRight, MapPin } from 'lucide-react'
import { Picture } from '@/components/ui/Picture'
import { projectCategories, type Project } from '@/data/projects'

// Each photo fills half a card: ~200px wide in the 3-column desktop grid.
const HALF_CARD_SIZES = '(min-width: 1280px) 200px, (min-width: 1024px) 16vw, (min-width: 640px) 25vw, 50vw'

/** Before/after project card used on the Our Work page. */
export function ProjectCard({ project }: { project: Project }) {
  const { slug, title, city, category, summary, facts, before, after } = project

  return (
    <article id={slug} aria-labelledby={`${slug}-title`} className="flex h-full flex-col overflow-hidden rounded-3xl bg-white shadow-card">
      <div className="relative grid grid-cols-2 gap-1 bg-white">
        <figure className="relative aspect-4/5 overflow-hidden">
          <Picture name={before.image} alt={before.alt} sizes={HALF_CARD_SIZES} className="size-full object-cover grayscale-[35%]" />
          <figcaption className="absolute top-3 left-3 rounded-full bg-brand-950/85 px-3 py-1 text-xs font-bold tracking-wider text-white uppercase backdrop-blur-sm">
            Before
          </figcaption>
        </figure>
        <figure className="relative aspect-4/5 overflow-hidden">
          <Picture name={after.image} alt={after.alt} sizes={HALF_CARD_SIZES} className="size-full object-cover" />
          <figcaption className="absolute top-3 right-3 rounded-full bg-accent-600 px-3 py-1 text-xs font-bold tracking-wider text-white uppercase">
            After
          </figcaption>
        </figure>
        <span
          className="absolute top-1/2 left-1/2 grid size-10 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white text-brand-950 shadow-lift"
          aria-hidden="true"
        >
          <ArrowLeftRight className="size-4.5" />
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm font-semibold">
          <span className="text-accent-700">{projectCategories[category]}</span>
          <span className="flex items-center gap-1">
            <MapPin className="size-3.5" aria-hidden="true" />
            {city}
          </span>
        </p>
        <h3 id={`${slug}-title`} className="mt-2 text-xl">
          {title}
        </h3>
        <p className="mt-3 leading-relaxed">{summary}</p>
        <dl className="mt-auto grid grid-cols-2 gap-3 pt-6">
          {facts.map((fact) => (
            <div key={fact.label} className="rounded-2xl bg-brand-50 px-4 py-3">
              <dt className="text-xs font-semibold">{fact.label}</dt>
              <dd className="mt-0.5 font-bold text-brand-950">{fact.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </article>
  )
}
