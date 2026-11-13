export interface Review {
  name: string
  city: string
  rating: number
  service: string
  quote: string
}

/** Fictional reviews written for the demo. */
export const reviews: Review[] = [
  {
    name: 'Danielle M.',
    city: 'Matthews',
    rating: 5,
    service: 'Hail damage replacement',
    quote:
      'After the April hail storm, three companies knocked on our door. Summit was the only one that actually got on the roof, showed us photos of every hit and met our adjuster in person. New roof was done in one day and they magnet-swept the yard twice.',
  },
  {
    name: 'Robert & Linda K.',
    city: 'Huntersville',
    rating: 5,
    service: 'Insurance claim help',
    quote:
      'We had no idea how the insurance process worked. Our project manager, Chris, explained every line of the adjuster’s report and caught two items they’d missed. Clear communication from start to finish.',
  },
  {
    name: 'Marcus T.',
    city: 'Charlotte',
    rating: 5,
    service: 'Leak repair',
    quote:
      'Two other roofers couldn’t find the leak over our living room. Summit traced it to failed chimney flashing in about twenty minutes, rebuilt it that same week and sent before-and-after photos. Bone dry through every storm since.',
  },
  {
    name: 'Priya S.',
    city: 'Concord',
    rating: 4,
    service: 'Seamless gutters',
    quote:
      'The new gutters look great and finally keep up with the runoff from our back roof. Install got pushed two days because of rain, but they called ahead and kept us in the loop. Would hire them again.',
  },
  {
    name: 'James W.',
    city: 'Gastonia',
    rating: 5,
    service: 'Farmhouse metal roof',
    quote:
      'We went with a metal roof on our farmhouse. The quote was itemized and easy to understand, with no surprise charges at the end. The crew was on time, respectful and left the place cleaner than they found it.',
  },
  {
    name: 'Angela R.',
    city: 'Fort Mill',
    rating: 5,
    service: 'Commercial flat roof',
    quote:
      'Summit replaced the flat roof on our dental office over two weekends, so we never had to close or reschedule a single patient. Professional from the first walkthrough to the final inspection.',
  },
]
