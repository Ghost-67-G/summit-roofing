import type { ComponentType } from 'react'
import { islands, type IslandName } from './islands/registry'

type Props = Record<string, unknown>

/**
 * React itself is imported on demand, so the only script a page loads up
 * front is this small file. The hero photo and font get the bandwidth first,
 * and React arrives once an island actually needs it.
 */
async function hydrateIsland(root: HTMLElement) {
  const load = islands[root.dataset.island as IslandName]
  if (!load) return

  const [{ createElement }, { hydrateRoot }, Component] = await Promise.all([
    import('react'),
    import('react-dom/client'),
    // Props were type-checked where the island was rendered (see island.tsx);
    // here they're just the JSON the server serialized.
    load() as Promise<unknown> as Promise<ComponentType<Props>>,
  ])
  const props = JSON.parse(root.dataset.props ?? '{}') as Props
  hydrateRoot(root, createElement(Component, props))
}

function whenVisible(root: HTMLElement, callback: () => void) {
  // The wrapper is `display: contents` and has no box, so observe its child.
  const target = root.firstElementChild ?? root
  const observer = new IntersectionObserver(
    (entries) => {
      if (!entries.some((entry) => entry.isIntersecting)) return
      observer.disconnect()
      callback()
    },
    { rootMargin: '400px 0px' },
  )
  observer.observe(target)
}

function whenIdle(callback: () => void) {
  if ('requestIdleCallback' in window) requestIdleCallback(callback, { timeout: 2000 })
  else setTimeout(callback, 200)
}

/** Hydrates on the first hover, focus or tap, and replays a click that arrives before React is ready. */
function whenInteracted(root: HTMLElement, hydrate: () => Promise<void>) {
  const events = ['pointerover', 'focusin', 'touchstart', 'click'] as const
  let started = false
  let pendingClick: HTMLElement | null = null

  const handle = (event: Event) => {
    if (event.type === 'click') {
      event.preventDefault()
      pendingClick = (event.target as Element).closest<HTMLElement>('button, a, [role="button"]')
    }
    if (started) return
    started = true
    void hydrate().then(() => {
      for (const type of events) root.removeEventListener(type, handle, true)
      pendingClick?.click()
    })
  }

  for (const type of events) root.addEventListener(type, handle, { capture: true, passive: type === 'touchstart' })
}

for (const root of document.querySelectorAll<HTMLElement>('[data-island]')) {
  const hydrate = () => hydrateIsland(root)

  switch (root.dataset.hydrate) {
    case 'visible':
      whenVisible(root, () => void hydrate())
      break
    case 'idle':
      whenIdle(() => void hydrate())
      break
    case 'interaction':
      whenInteracted(root, hydrate)
      break
    default:
      void hydrate()
  }
}

/* ---------- Mobile menu (native popover) helpers ---------- */

const supportsPopover = Object.hasOwn(HTMLElement.prototype, 'popover')

// Older browsers: emulate popovertarget buttons by toggling a class (styled in global.css).
if (!supportsPopover) {
  document.addEventListener('click', (event) => {
    const button = (event.target as Element).closest<HTMLElement>('[popovertarget]')
    const menu = button && document.getElementById(button.getAttribute('popovertarget') ?? '')
    if (!button || !menu) return
    const action = button.getAttribute('popovertargetaction') ?? 'toggle'
    menu.classList.toggle('popover-open', action === 'show' || (action === 'toggle' && !menu.classList.contains('popover-open')))
  })
}

// Close the menu when one of its links jumps to a section on the current page.
document.addEventListener('click', (event) => {
  const link = (event.target as Element).closest<HTMLAnchorElement>('[popover] a[href*="#"]')
  const menu = link?.closest<HTMLElement>('[popover]')
  if (!link || !menu || link.pathname !== window.location.pathname) return
  if (supportsPopover) menu.hidePopover()
  else menu.classList.remove('popover-open')
})
