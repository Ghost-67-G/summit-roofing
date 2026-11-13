import type { InspectionFields } from './inspection-validation'

/**
 * Where inspection requests are sent. Set VITE_FORM_ENDPOINT to a Formspree
 * form URL (https://formspree.io/f/xxxxxxx) or any webhook that accepts JSON —
 * Zapier, Make, n8n, a serverless function. Without it the form runs in demo
 * mode: it validates and shows the success message but sends nothing.
 */
const FORM_ENDPOINT = import.meta.env.VITE_FORM_ENDPOINT?.trim()

export interface InspectionPayload extends InspectionFields {
  serviceLabel: string
  /**
   * The photo field is UI only: the names are sent so the office knows to ask
   * for them. To upload the files themselves, see "Photo uploads" in the README.
   */
  photos: string[]
  /** Formspree uses this as the notification email subject. */
  _subject: string
  page: string
}

export async function submitInspection(payload: InspectionPayload): Promise<void> {
  if (!FORM_ENDPOINT) {
    await new Promise((resolve) => setTimeout(resolve, 900))
    console.info('[demo mode] Inspection request not sent — set VITE_FORM_ENDPOINT to deliver it.', payload)
    return
  }

  const response = await fetch(FORM_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify(payload),
  })

  if (!response.ok) throw new Error(`Form endpoint responded with ${response.status}`)
}
