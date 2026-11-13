import type { ComponentType } from 'react'
import type { IslandName } from './registry'

/**
 * - `load`    hydrate as soon as the page script runs (above-the-fold UI)
 * - `idle`    wait until the browser is idle
 * - `visible`     wait until the island scrolls near the viewport
 * - `interaction` wait until someone hovers, focuses or taps it; a click that
 *                 lands before React is ready is replayed afterwards
 */
export type HydrationStrategy = 'load' | 'idle' | 'visible' | 'interaction'

/**
 * Wraps a component so the server renders its HTML plus the name and props
 * the client needs to hydrate it (see entry-client.ts). Props must be
 * JSON-serializable.
 *
 * The wrapper uses `display: contents` so it never affects layout.
 */
export function island<P extends object>(name: IslandName, Component: ComponentType<P>, hydrate: HydrationStrategy = 'load') {
  function Island(props: P) {
    return (
      <div className="contents" data-island={name} data-hydrate={hydrate} data-props={JSON.stringify(props)}>
        <Component {...props} />
      </div>
    )
  }
  Island.displayName = `Island(${name})`
  return Island
}
