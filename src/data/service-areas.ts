export interface ServiceArea {
  slug: string
  city: string
  state: 'NC' | 'SC'
  county: string
  /** Approximate drive from the Charlotte office. */
  driveTime: string
  description: string
  neighborhoods: string[]
  zips: string[]
  /** Used to place the city on the coverage map. */
  coords: { lat: number; lng: number }
}

export const serviceAreas: ServiceArea[] = [
  {
    slug: 'charlotte',
    city: 'Charlotte',
    state: 'NC',
    county: 'Mecklenburg County',
    driveTime: 'Home base',
    description:
      'From 1920s bungalows in Dilworth to newer builds in Ballantyne, we’ve re-roofed homes in nearly every Charlotte neighborhood. Many homes built in the late ’90s and 2000s are now reaching the end of their first roof’s life.',
    neighborhoods: ['Myers Park', 'Dilworth', 'SouthPark', 'Ballantyne', 'Plaza Midwood', 'NoDa', 'Steele Creek'],
    zips: ['28203', '28205', '28207', '28209', '28210', '28211', '28226', '28277'],
    coords: { lat: 35.2271, lng: -80.8431 },
  },
  {
    slug: 'matthews',
    city: 'Matthews',
    state: 'NC',
    county: 'Mecklenburg County',
    driveTime: '~20 min',
    description:
      'Matthews sees some of the region’s worst spring hail. Our storm team inspects and tarps here often, and we handle a lot of insurance replacements for established subdivisions off Highway 51 and Monroe Road.',
    neighborhoods: ['Downtown Matthews', 'Sardis Road area', 'Mint Hill', 'Stallings', 'Indian Trail'],
    zips: ['28104', '28105', '28106'],
    coords: { lat: 35.1168, lng: -80.7237 },
  },
  {
    slug: 'huntersville',
    city: 'Huntersville',
    state: 'NC',
    county: 'Mecklenburg County',
    driveTime: '~25 min',
    description:
      'Lake Norman homes take a beating from wind off the water. We install high-wind-rated shingle systems and seamless gutters throughout Huntersville, Cornelius and Davidson.',
    neighborhoods: ['Birkdale', 'Skybrook', 'Lake Norman', 'Cornelius', 'Davidson'],
    zips: ['28078', '28031', '28036'],
    coords: { lat: 35.4107, lng: -80.8429 },
  },
  {
    slug: 'concord',
    city: 'Concord',
    state: 'NC',
    county: 'Cabarrus County',
    driveTime: '~30 min',
    description:
      'From historic homes near downtown Concord to new construction in Harrisburg, our Cabarrus County customers count on us for replacements, repairs and commercial roofing.',
    neighborhoods: ['Downtown Concord', 'Afton Village', 'Harrisburg', 'Kannapolis', 'Concord Mills area'],
    zips: ['28025', '28027', '28075', '28081'],
    coords: { lat: 35.4088, lng: -80.5795 },
  },
  {
    slug: 'gastonia',
    city: 'Gastonia',
    state: 'NC',
    county: 'Gaston County',
    driveTime: '~30 min',
    description:
      'West of the Catawba, we re-roof mill-village homes, ranches and newer subdivisions across Gaston County — and we install a growing number of standing-seam metal roofs here.',
    neighborhoods: ['Downtown Gastonia', 'Belmont', 'Mount Holly', 'Cramerton', 'Lowell'],
    zips: ['28052', '28054', '28056', '28012'],
    coords: { lat: 35.2621, lng: -81.1873 },
  },
  {
    slug: 'fort-mill',
    city: 'Fort Mill',
    state: 'SC',
    county: 'York County',
    driveTime: '~25 min',
    description:
      'Just across the state line, Fort Mill and Tega Cay are some of the fastest-growing communities we serve. We’re licensed in South Carolina and handle everything from repairs to full replacements.',
    neighborhoods: ['Baxter Village', 'Tega Cay', 'Indian Land', 'Rock Hill', 'Lake Wylie'],
    zips: ['29707', '29708', '29715', '29730'],
    coords: { lat: 35.0074, lng: -80.9451 },
  },
]
