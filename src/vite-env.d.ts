/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Public URL of the deployed site, without a trailing slash. */
  readonly VITE_SITE_URL?: string
  /** Formspree form URL or webhook that receives inspection requests. */
  readonly VITE_FORM_ENDPOINT?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

/** Injected by vite.config.ts so the footer year matches the build. */
declare const __BUILD_YEAR__: number
