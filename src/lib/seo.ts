import { business, SITE_URL } from '@/config/site'
import { faqs } from '@/data/faqs'
import { serviceAreas } from '@/data/service-areas'
import { services } from '@/data/services'

export interface PageMeta {
  /** Root-relative path with a trailing slash, e.g. `/services/`. */
  path: string
  title: string
  description: string
  /** Breadcrumb label for inner pages (omit on the home page). */
  breadcrumb?: string
  noindex?: boolean
  /** Extra JSON-LD objects for this page, on top of the business schema. */
  schema?: object[]
}

export const OG_IMAGE = { path: '/og-image.jpg', width: 1200, height: 630 }

export function absoluteUrl(path: string) {
  return `${SITE_URL}${path}`
}

const escapeHtml = (value: string) => value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

// `<` is escaped so a string in the data can never close the script tag.
const jsonLd = (data: object) => `<script type="application/ld+json">${JSON.stringify(data).replace(/</g, '\\u003c')}</script>`

/** Builds everything that goes in <head> for a page. */
export function renderHead(meta: PageMeta) {
  const url = absoluteUrl(meta.path)
  const image = absoluteUrl(OG_IMAGE.path)
  const title = escapeHtml(meta.title)
  const description = escapeHtml(meta.description)

  const tags = [
    `<title>${title}</title>`,
    `<meta name="description" content="${description}" />`,
    meta.noindex ? '<meta name="robots" content="noindex" />' : `<link rel="canonical" href="${url}" />`,
    '<meta property="og:type" content="website" />',
    `<meta property="og:site_name" content="${escapeHtml(business.name)}" />`,
    '<meta property="og:locale" content="en_US" />',
    `<meta property="og:title" content="${title}" />`,
    `<meta property="og:description" content="${description}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:image" content="${image}" />`,
    `<meta property="og:image:width" content="${OG_IMAGE.width}" />`,
    `<meta property="og:image:height" content="${OG_IMAGE.height}" />`,
    `<meta property="og:image:alt" content="${escapeHtml(`${business.name} — ${business.tagline}`)}" />`,
    '<meta name="twitter:card" content="summary_large_image" />',
    `<meta name="twitter:title" content="${title}" />`,
    `<meta name="twitter:description" content="${description}" />`,
    `<meta name="twitter:image" content="${image}" />`,
  ]

  const schema = [businessSchema(), ...(meta.breadcrumb ? [breadcrumbSchema(meta)] : []), ...(meta.schema ?? [])]
  return [...tags, ...schema.map(jsonLd)].join('\n    ')
}

export function businessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'RoofingContractor',
    '@id': `${SITE_URL}/#business`,
    name: business.name,
    alternateName: business.shortName,
    slogan: business.tagline,
    description: business.description,
    url: `${SITE_URL}/`,
    telephone: business.phone.schema,
    email: business.email,
    image: absoluteUrl(OG_IMAGE.path),
    logo: absoluteUrl('/logo.png'),
    priceRange: '$$',
    foundingDate: String(business.foundedYear),
    currenciesAccepted: 'USD',
    paymentAccepted: 'Cash, Check, Credit Card, Financing, Insurance',
    address: {
      '@type': 'PostalAddress',
      streetAddress: business.address.street,
      addressLocality: business.address.city,
      addressRegion: business.address.region,
      postalCode: business.address.postalCode,
      addressCountry: business.address.country,
    },
    geo: { '@type': 'GeoCoordinates', ...business.geo },
    areaServed: serviceAreas.map((area) => ({
      '@type': 'City',
      name: `${area.city}, ${area.state}`,
    })),
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '07:00',
        closes: '18:00',
      },
      { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Saturday', opens: '08:00', closes: '14:00' },
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: String(business.rating.value),
      reviewCount: String(business.rating.count),
      bestRating: '5',
    },
    knowsAbout: ['Roof replacement', 'Roof repair', 'Hail damage', 'Insurance claims', 'Seamless gutters', 'Commercial roofing'],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Roofing services',
      itemListElement: services.map((service) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: service.name,
          description: service.summary,
          url: absoluteUrl(`/services/#${service.slug}`),
        },
      })),
    },
  }
}

function breadcrumbSchema(meta: PageMeta) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: absoluteUrl('/') },
      { '@type': 'ListItem', position: 2, name: meta.breadcrumb, item: absoluteUrl(meta.path) },
    ],
  }
}

export function faqSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  }
}

export function servicesSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: services.map((service, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Service',
        name: service.name,
        description: service.summary,
        url: absoluteUrl(`/services/#${service.slug}`),
        serviceType: service.name,
        provider: { '@id': `${SITE_URL}/#business` },
        areaServed: serviceAreas.map((area) => `${area.city}, ${area.state}`),
      },
    })),
  }
}
