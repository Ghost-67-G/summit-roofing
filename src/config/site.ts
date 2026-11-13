/**
 * Single source of truth for the (fictional) business details. Header, footer,
 * CTAs, meta tags and schema markup all read from here, so rebranding the demo
 * for a real client starts in this file.
 */

export const SITE_URL = (import.meta.env.VITE_SITE_URL || 'https://www.summitroofingclt.com').replace(/\/+$/, '')

export const business = {
  name: 'Summit Roofing Co.',
  shortName: 'Summit Roofing',
  tagline: 'Roofs built to last — free inspections',
  description:
    'Locally owned Charlotte roofing contractor since 2011. Roof replacement, roof repair, storm and hail damage, insurance claim help, gutters, commercial roofing and free roof inspections across the Charlotte region.',
  phone: {
    display: '(704) 555-0192',
    href: 'tel:+17045550192',
    schema: '+1-704-555-0192',
  },
  email: 'hello@summitroofingclt.com',
  address: {
    street: '2140 Crestdale Commons Dr, Suite 210',
    city: 'Charlotte',
    region: 'NC',
    postalCode: '28217',
    country: 'US',
  },
  geo: { latitude: 35.1823, longitude: -80.8851 },
  foundedYear: 2011,
  /** Placeholder — swap for the real NC Licensing Board for General Contractors number. */
  license: 'NC GC License #00000',
  rating: { value: 4.8, count: 427, label: '400+' },
  hours: [
    { days: 'Mon – Fri', time: '7:00 AM – 6:00 PM' },
    { days: 'Saturday', time: '8:00 AM – 2:00 PM' },
    { days: 'Sunday', time: 'Closed' },
  ],
  /** Shown next to the hours: storm tarping runs outside office hours. */
  emergencyNote: 'Emergency storm tarping available 24/7',
} as const

export const yearsInBusiness = __BUILD_YEAR__ - business.foundedYear

export const navigation = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services/' },
  { label: 'Our Work', href: '/our-work/' },
  { label: 'Service Areas', href: '/service-areas/' },
  { label: 'About', href: '/about/' },
  { label: 'Contact', href: '/contact/' },
] as const

/** Pages that embed the inspection form link to it in place; others go to /contact/. */
const PAGES_WITH_FORM = new Set(['/', '/contact/'])

export function inspectionHref(currentPath: string) {
  return PAGES_WITH_FORM.has(currentPath) ? '#inspection' : '/contact/#inspection'
}

/** Deep link to the form with a service pre-selected in the dropdown. */
export function inspectionHrefFor(serviceSlug: string) {
  return `/contact/?service=${serviceSlug}#inspection`
}
