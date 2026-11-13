import { Faq } from '@/components/sections/Faq'
import { Financing } from '@/components/sections/Financing'
import { GalleryPreview } from '@/components/sections/GalleryPreview'
import { Hero } from '@/components/sections/Hero'
import { HowItWorks } from '@/components/sections/HowItWorks'
import { InspectionCta } from '@/components/sections/InspectionCta'
import { Reviews } from '@/components/sections/Reviews'
import { ServicesGrid } from '@/components/sections/ServicesGrid'
import { StormBanner } from '@/components/sections/StormBanner'
import { faqSchema, type PageMeta } from '@/lib/seo'

export const homeMeta: PageMeta = {
  path: '/',
  title: 'Charlotte Roofer | Free Roof Inspections | Summit Roofing Co.',
  description:
    'Locally owned Charlotte roofer since 2011. Roof replacement, repairs, storm & hail damage and insurance claim help. Lifetime workmanship warranty. Rated 4.8★.',
  schema: [faqSchema()],
}

export function HomePage() {
  return (
    <>
      <Hero />
      <StormBanner />
      <ServicesGrid />
      <HowItWorks />
      <GalleryPreview />
      <Reviews />
      <Financing />
      <Faq />
      <InspectionCta />
    </>
  )
}
