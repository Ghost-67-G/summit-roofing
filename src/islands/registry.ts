/**
 * Components that hydrate in the browser. Everything else on the site is
 * plain prerendered HTML that ships zero JavaScript.
 *
 * Each loader is a dynamic import, so a page only downloads the code for the
 * islands it actually contains.
 */
export const islands = {
  InspectionForm: () => import('@/components/forms/InspectionForm').then((m) => m.InspectionForm),
  PaymentEstimator: () => import('@/components/sections/PaymentEstimator').then((m) => m.PaymentEstimator),
  ProjectFilter: () => import('@/components/work/ProjectFilter').then((m) => m.ProjectFilter),
}

export type IslandName = keyof typeof islands
