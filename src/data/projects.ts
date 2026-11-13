import type { ImageName } from '@/lib/images'

export const projectCategories = {
  replacement: 'Roof replacement',
  storm: 'Storm & insurance',
  metal: 'Metal roofing',
  commercial: 'Commercial',
  repair: 'Repairs & gutters',
} as const

export type ProjectCategory = keyof typeof projectCategories

export interface Project {
  slug: string
  title: string
  city: string
  category: ProjectCategory
  summary: string
  facts: { label: string; value: string }[]
  before: { image: ImageName; alt: string }
  after: { image: ImageName; alt: string }
}

/** Fictional projects. Before and after photos are representative stock images. */
export const projects: Project[] = [
  {
    slug: 'ballantyne-shingle-replacement',
    title: 'Architectural shingle replacement',
    city: 'Charlotte (Ballantyne)',
    category: 'replacement',
    summary:
      'A 22-year-old roof with curling shingles and two active leaks, replaced with charcoal architectural shingles, a new ridge vent and ice-and-water shield in every valley.',
    facts: [
      { label: 'Material', value: 'Architectural shingles' },
      { label: 'Timeline', value: '1 day' },
    ],
    before: { image: 'project-1-before', alt: 'Cracked, curling asphalt shingles with heavy granule loss' },
    after: { image: 'project-1-after', alt: 'Two-story blue-gray home with a new charcoal architectural shingle roof' },
  },
  {
    slug: 'matthews-hail-claim',
    title: 'Storm damage insurance replacement',
    city: 'Matthews',
    category: 'storm',
    summary:
      'A spring storm toppled a big pine and tore shingles off the back slope. We tarped the roof that afternoon, met the adjuster on site and replaced the whole roof once the claim was approved.',
    facts: [
      { label: 'Claim', value: 'Approved in 9 days' },
      { label: 'Timeline', value: '1 day' },
    ],
    before: { image: 'project-2-before', alt: 'Pine tree uprooted by a storm beside a home' },
    after: { image: 'project-2-after', alt: 'Aerial view of a home with a new gray shingle roof' },
  },
  {
    slug: 'gastonia-metal-roof',
    title: 'Farmhouse metal roof restoration',
    city: 'Gastonia',
    category: 'metal',
    summary:
      'A century-old farmhouse with a sagging, failing roof — reframed where needed, re-decked and finished in 24-gauge standing-seam metal with concealed fasteners.',
    facts: [
      { label: 'Material', value: 'Standing-seam metal' },
      { label: 'Timeline', value: '6 days' },
    ],
    before: { image: 'project-3-before', alt: 'Weathered farmhouse with a sagging, damaged roof' },
    after: { image: 'project-3-after', alt: 'Farmhouse with a new blue standing-seam metal roof and covered porch' },
  },
  {
    slug: 'fort-mill-commercial-tpo',
    title: 'Commercial TPO flat roof',
    city: 'Fort Mill, SC',
    category: 'commercial',
    summary:
      'A patched, ponding flat roof on a brick office building replaced with 60-mil white TPO over tapered insulation — installed over two weekends so tenants never lost a workday.',
    facts: [
      { label: 'System', value: '60-mil TPO' },
      { label: 'Timeline', value: '2 weekends' },
    ],
    before: { image: 'project-4-before', alt: 'Aging flat roof on a brick commercial building' },
    after: { image: 'project-4-after', alt: 'Clean white membrane roof on a commercial building' },
  },
  {
    slug: 'plaza-midwood-chimney-flashing',
    title: 'Chimney flashing & leak repair',
    city: 'Charlotte (Plaza Midwood)',
    category: 'repair',
    summary:
      'Moss and failed chimney flashing were letting water into the living room. We rebuilt the step and counter flashing, added a cricket and replaced the surrounding shingles.',
    facts: [
      { label: 'Repair', value: 'Flashing rebuild' },
      { label: 'Timeline', value: '1 day' },
    ],
    before: { image: 'project-5-before', alt: 'Moss-covered roof beside a brick chimney with failing flashing' },
    after: { image: 'project-5-after', alt: 'Chimney with new flashing on a dark shingle roof' },
  },
  {
    slug: 'concord-seamless-gutters',
    title: 'Seamless gutters & leaf guards',
    city: 'Concord',
    category: 'repair',
    summary: 'Undersized, sagging gutters replaced with 6-inch seamless aluminum, oversized downspouts and micro-mesh leaf guards.',
    facts: [
      { label: 'Gutters', value: '6" seamless' },
      { label: 'Timeline', value: '1 day' },
    ],
    before: { image: 'project-6-before', alt: 'Old, stained gutter along a roof edge' },
    after: { image: 'project-6-after', alt: 'New white seamless gutter and downspout on a home with blue siding' },
  },
  {
    slug: 'dilworth-historic-reroof',
    title: 'Historic brick home re-roof',
    city: 'Charlotte (Dilworth)',
    category: 'replacement',
    summary:
      'A moss-covered roof on a 1920s brick home replaced with heavyweight shingles, new decking where the original boards had rotted, and copper-look flashing details.',
    facts: [
      { label: 'Material', value: 'Designer shingles' },
      { label: 'Timeline', value: '3 days' },
    ],
    before: { image: 'project-7-before', alt: 'Roof shingles covered in moss and lichen' },
    after: { image: 'project-7-after', alt: 'Red brick home with a new dark shingle roof' },
  },
  {
    slug: 'huntersville-hail-reroof',
    title: 'Hail-damaged ranch re-roof',
    city: 'Huntersville',
    category: 'storm',
    summary:
      'Hail left this ranch’s 20-year-old roof streaked and brittle, with granules washing into the gutters. We documented the damage for the claim and re-roofed with impact-resistant shingles.',
    facts: [
      { label: 'Shingles', value: 'Impact-resistant' },
      { label: 'Timeline', value: '1 day' },
    ],
    before: { image: 'project-8-before', alt: 'Brick ranch home with a faded, hail-worn shingle roof' },
    after: { image: 'project-8-after', alt: 'Single-story brick ranch home with a new roof' },
  },
  {
    slug: 'lake-norman-designer-shingles',
    title: 'Cedar shake to designer shingles',
    city: 'Huntersville (Lake Norman)',
    category: 'replacement',
    summary:
      'A weathered cedar-shake roof replaced with slate-look designer shingles that keep the high-end character with none of the upkeep.',
    facts: [
      { label: 'Material', value: 'Slate-look shingles' },
      { label: 'Timeline', value: '3 days' },
    ],
    before: { image: 'project-9-before', alt: 'Weathered cedar-shake roof with two dormers' },
    after: { image: 'project-9-after', alt: 'Shingle-style home with a white wraparound porch and a new charcoal designer shingle roof' },
  },
]

/** The six projects featured in the home page gallery preview, in display order. */
export const featuredProjects = [0, 2, 1, 6, 3, 8].map((index) => projects[index])
