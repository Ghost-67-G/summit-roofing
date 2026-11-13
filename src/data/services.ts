import { Building2, ClipboardCheck, CloudLightning, Droplets, Hammer, House, ScanSearch, type LucideIcon } from 'lucide-react'
import type { ImageName } from '@/lib/images'

export interface Service {
  slug: string
  name: string
  icon: LucideIcon
  /** One or two sentences for cards, the footer and schema markup. */
  summary: string
  /** Longer copy for the services page. */
  intro: string
  included: string[]
  facts: { label: string; value: string }[]
  image: ImageName
  imageAlt: string
}

export const services: Service[] = [
  {
    slug: 'roof-replacement',
    name: 'Roof Replacement',
    icon: House,
    summary:
      'Full tear-off and re-roof in architectural shingles, designer shingles or standing-seam metal — most homes finished in one day.',
    intro:
      'When patching stops making sense, we replace the whole system — not just the shingles. Every replacement includes new underlayment, ice-and-water shield in the valleys, ventilation, flashing and drip edge, installed to manufacturer spec so your warranty is valid from day one.',
    included: [
      'Complete tear-off down to the deck, with rotten decking replaced at a pre-agreed price',
      'Synthetic underlayment plus ice-and-water shield at valleys, eaves and penetrations',
      'New pipe boots, step and counter flashing, drip edge and ridge ventilation',
      'Landscaping protected with tarps; magnetic nail sweep of the yard and driveway',
      'Lifetime workmanship warranty, registered in your name',
    ],
    facts: [
      { label: 'Typical timeline', value: '1–2 days' },
      { label: 'Warranty', value: 'Lifetime workmanship' },
    ],
    image: 'service-replacement',
    imageAlt: 'Roofer in a safety harness working on a dark asphalt shingle roof',
  },
  {
    slug: 'roof-repair',
    name: 'Roof Repair',
    icon: Hammer,
    summary: 'Leaks, missing shingles, failed flashing and worn pipe boots found and fixed fast — with photos of every repair.',
    intro:
      'Most leaks start small: a cracked pipe boot, lifted shingles or flashing that’s pulled away from a chimney. We trace the water to its source, fix it properly, and send you before-and-after photos so you can see exactly what we did.',
    included: [
      'Leak tracing from the attic and the roof surface',
      'Shingle, pipe boot, vent and skylight flashing repairs',
      'Chimney and wall flashing rebuilt — not just caulked',
      'Matching shingles sourced for a near-invisible repair',
      'Five-year workmanship warranty on every repair',
    ],
    facts: [
      { label: 'Response time', value: '24–48 hours' },
      { label: 'Warranty', value: '5-year workmanship' },
    ],
    image: 'service-repair',
    imageAlt: 'Roofer’s hands tightening a fastener on a metal roof with a ratchet',
  },
  {
    slug: 'storm-damage',
    name: 'Storm & Hail Damage',
    icon: CloudLightning,
    summary: 'Free storm damage assessments, emergency tarping and full restoration after hail, high winds and fallen limbs.',
    intro:
      'Carolina storms don’t keep office hours. After hail or high winds, we’ll inspect your roof for free, document every hit and lifted shingle with dated photos, and tarp any openings the same day to stop further water damage.',
    included: [
      'Free hail and wind damage inspection with a dated photo report',
      'Emergency tarping and board-up, 24/7 during storm events',
      'Soft-metal and collateral damage checks (vents, gutters, siding)',
      'Full restoration: roof, gutters and flashing in one project',
      'No storm-chaser pressure — we’ve been local since 2011',
    ],
    facts: [
      { label: 'Emergency tarping', value: '24/7' },
      { label: 'Inspection', value: 'Always free' },
    ],
    image: 'service-storm-damage',
    imageAlt: 'Dark storm cloud building over a small house',
  },
  {
    slug: 'insurance-claims',
    name: 'Insurance Claim Help',
    icon: ClipboardCheck,
    summary: 'We document the damage, meet your adjuster on the roof and guide you through the paperwork from first call to final payment.',
    intro:
      'Insurance claims are confusing, and missed damage means money left on the table. We give you a detailed photo report to file with, meet your adjuster on site to point out every issue, and explain each line of the settlement — so you understand what’s covered before work begins.',
    included: [
      'Detailed photo documentation to support your claim',
      'We meet your adjuster on the roof — no ladder work for you',
      'Line-by-line review of the insurance scope with you',
      'Supplements filed for missed items, like code-required upgrades',
      'We never waive deductibles — it’s illegal, and it’s not how we work',
    ],
    facts: [
      { label: 'Adjuster meeting', value: 'Included' },
      { label: 'Your cost', value: 'Usually the deductible' },
    ],
    image: 'service-insurance',
    imageAlt: 'Going over claim paperwork with a homeowner at a table',
  },
  {
    slug: 'gutters',
    name: 'Gutters & Downspouts',
    icon: Droplets,
    summary: 'Seamless aluminum gutters, oversized downspouts and leaf guards — custom-formed on site to fit your home exactly.',
    intro:
      'Gutters protect your fascia, siding and foundation from the 30,000+ gallons of water a typical Charlotte roof sheds every year. We form seamless gutters on site from a single run of aluminum, so there are no joints to leak.',
    included: [
      'Seamless 5" and 6" aluminum gutters in 20+ colors',
      'Oversized 3"×4" downspouts for heavy summer storms',
      'Hidden hangers every 24 inches — no sagging',
      'Micro-mesh leaf guards to end gutter cleaning',
      'Fascia and soffit repairs while we’re there',
    ],
    facts: [
      { label: 'Typical install', value: '1 day' },
      { label: 'Colors', value: '20+' },
    ],
    image: 'service-gutters',
    imageAlt: 'White seamless gutter and downspout under a home’s eave',
  },
  {
    slug: 'commercial-roofing',
    name: 'Commercial Roofing',
    icon: Building2,
    summary: 'TPO, EPDM, metal and modified-bitumen roofs for offices, retail, churches and multifamily — installed around your schedule.',
    intro:
      'From a single storefront to a 60,000 sq ft warehouse, our commercial crews install and maintain low-slope and metal systems with minimal disruption. We work weekends and after hours so your business never has to close.',
    included: [
      'TPO, EPDM, PVC, modified bitumen and metal systems',
      'Roof coatings and restoration to extend roof life',
      'Preventive maintenance plans with twice-yearly inspections',
      'After-hours and weekend installs to avoid closures',
      'Manufacturer-backed system warranties available',
    ],
    facts: [
      { label: 'Scheduling', value: 'After hours' },
      { label: 'Systems', value: 'TPO · EPDM · Metal' },
    ],
    image: 'service-commercial',
    imageAlt: 'Aerial view of a white membrane flat roof with rooftop HVAC units',
  },
  {
    slug: 'roof-inspections',
    name: 'Roof Inspections',
    icon: ScanSearch,
    summary: 'Free 21-point inspections with a written photo report — for peace of mind, home sales or after a storm.',
    intro:
      'Our inspectors check 21 points on the roof, in the attic and along the gutters, then walk you through a written report with photos of everything we found. No pressure, no obligation — and if nothing needs fixing, we’ll tell you that too.',
    included: [
      'Shingles, flashing, pipe boots, vents and skylights',
      'Attic check for leaks, ventilation and moisture',
      'Gutter, fascia and soffit condition',
      'Estimated remaining roof life',
      'Written photo report, usually the same day',
    ],
    facts: [
      { label: 'Cost', value: 'Free' },
      { label: 'Takes about', value: '45 minutes' },
    ],
    image: 'service-inspection',
    imageAlt: 'Close-up of a missing shingle found during a roof inspection',
  },
]

/** Options for the inspection form's "Service needed" dropdown. */
export const serviceOptions = [
  { value: 'roof-inspections', label: 'Free roof inspection' },
  ...services.filter((s) => s.slug !== 'roof-inspections').map((s) => ({ value: s.slug, label: s.name })),
  { value: 'financing', label: 'Financing question' },
  { value: 'other', label: 'Something else / not sure' },
]
