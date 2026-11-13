import { business } from '@/config/site'
import { serviceAreas } from '@/data/service-areas'

// Map frame in degrees, centered near uptown Charlotte.
const BOUNDS = { west: -81.32, east: -80.42, north: 35.53, south: 34.9 }
const WIDTH = 640
// Longitude degrees shrink with latitude; scale so the map isn't stretched.
const LNG_SCALE = Math.cos((35.2 * Math.PI) / 180)
const HEIGHT = Math.round((WIDTH * (BOUNDS.north - BOUNDS.south)) / ((BOUNDS.east - BOUNDS.west) * LNG_SCALE))
const MILE_IN_PX = WIDTH / ((BOUNDS.east - BOUNDS.west) * LNG_SCALE * 69.17)

function project(lat: number, lng: number) {
  return {
    x: ((lng - BOUNDS.west) / (BOUNDS.east - BOUNDS.west)) * WIDTH,
    y: ((BOUNDS.north - lat) / (BOUNDS.north - BOUNDS.south)) * HEIGHT,
  }
}

// Which side of the dot each label sits on, so none overlap.
const LABEL_SIDE: Record<string, 'left' | 'right'> = {
  charlotte: 'right',
  matthews: 'right',
  huntersville: 'left',
  concord: 'left',
  gastonia: 'right',
  'fort-mill': 'right',
}

/** Stylized coverage map: real coordinates, no map tiles or third-party scripts. */
export function CoverageMap() {
  const office = project(business.geo.latitude, business.geo.longitude)

  return (
    <figure className="overflow-hidden rounded-[2rem] bg-brand-950 shadow-lift">
      <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} className="block h-auto w-full" role="img" aria-labelledby="coverage-map-title">
        <title id="coverage-map-title">
          Map of the Summit Roofing service area: Charlotte, Matthews, Huntersville, Concord, Gastonia and Fort Mill, all within about 25
          miles of our Charlotte office.
        </title>
        <defs>
          <pattern id="map-grid" width="32" height="32" patternUnits="userSpaceOnUse">
            <path d="M32 0H0v32" fill="none" stroke="rgb(255 255 255 / 0.06)" />
          </pattern>
          <radialGradient id="map-glow">
            <stop offset="0" stopColor="#e3412f" stopOpacity="0.32" />
            <stop offset="1" stopColor="#e3412f" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width={WIDTH} height={HEIGHT} fill="url(#map-grid)" />
        <circle cx={office.x} cy={office.y} r={MILE_IN_PX * 27} fill="url(#map-glow)" />
        {[10, 20, 30].map((miles) => (
          <g key={miles}>
            <circle cx={office.x} cy={office.y} r={MILE_IN_PX * miles} fill="none" stroke="rgb(255 255 255 / 0.16)" strokeDasharray="4 6" />
            <text x={office.x + 6} y={office.y - MILE_IN_PX * miles - 6} fill="#aab4bf" fontSize="12" fontWeight="600">
              {miles} mi
            </text>
          </g>
        ))}

        {serviceAreas.map((area) => {
          const { x, y } = project(area.coords.lat, area.coords.lng)
          const right = LABEL_SIDE[area.slug] === 'right'
          const isHome = area.slug === 'charlotte'
          return (
            <g key={area.slug}>
              <circle cx={x} cy={y} r={isHome ? 9 : 7} fill={isHome ? '#e3412f' : '#fff'} stroke="#121619" strokeWidth="3" />
              <text
                x={right ? x + 14 : x - 14}
                y={y + 5}
                textAnchor={right ? 'start' : 'end'}
                fill="#fff"
                fontSize="16"
                fontWeight="800"
                paintOrder="stroke"
                stroke="#121619"
                strokeWidth="5"
              >
                {area.city}, {area.state}
              </text>
            </g>
          )
        })}
      </svg>
      <figcaption className="flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-white/10 px-6 py-4 text-sm text-brand-200">
        <span className="flex items-center gap-2">
          <span className="size-3 rounded-full bg-accent-500" aria-hidden="true" /> Home base: Charlotte office
        </span>
        <span className="flex items-center gap-2">
          <span className="size-3 rounded-full bg-white" aria-hidden="true" /> Core service cities
        </span>
        <span>Rings show distance in miles</span>
      </figcaption>
    </figure>
  )
}
