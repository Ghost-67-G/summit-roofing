import type { ComponentType } from 'react'
import type { PageMeta } from './lib/seo'
import { AboutPage, aboutMeta } from './pages/AboutPage'
import { ContactPage, contactMeta } from './pages/ContactPage'
import { HomePage, homeMeta } from './pages/HomePage'
import { NotFoundPage, notFoundMeta } from './pages/NotFoundPage'
import { OurWorkPage, ourWorkMeta } from './pages/OurWorkPage'
import { ServiceAreasPage, serviceAreasMeta } from './pages/ServiceAreasPage'
import { ServicesPage, servicesMeta } from './pages/ServicesPage'

export interface Route {
  component: ComponentType
  meta: PageMeta
}

/** Every page that gets prerendered to `dist/<path>/index.html`. */
export const routes: Route[] = [
  { component: HomePage, meta: homeMeta },
  { component: ServicesPage, meta: servicesMeta },
  { component: OurWorkPage, meta: ourWorkMeta },
  { component: ServiceAreasPage, meta: serviceAreasMeta },
  { component: AboutPage, meta: aboutMeta },
  { component: ContactPage, meta: contactMeta },
]

/** Prerendered to `dist/404.html`, which static hosts serve for unknown URLs. */
export const notFoundRoute: Route = { component: NotFoundPage, meta: notFoundMeta }

export function findRoute(pathname: string) {
  const normalized = pathname.endsWith('/') ? pathname : `${pathname}/`
  return routes.find((route) => route.meta.path === normalized)
}
