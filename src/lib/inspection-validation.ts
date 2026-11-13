export interface InspectionFields {
  name: string
  phone: string
  email: string
  address: string
  service: string
  message: string
}

export type InspectionField = keyof InspectionFields
export type InspectionErrors = Partial<Record<InspectionField | 'photos', string>>

/** Order matters: the first invalid field in this list receives focus. */
export const INSPECTION_FIELDS: InspectionField[] = ['name', 'phone', 'email', 'address', 'service', 'message']

export const MESSAGE_MAX_LENGTH = 1000

export const PHOTO_LIMITS = {
  maxFiles: 5,
  maxBytes: 10 * 1024 * 1024,
  accept: 'image/jpeg,image/png,image/webp,image/heic,image/heif',
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

/** Strips formatting and a leading US country code: "+1 (704) 555-0192" → "7045550192". */
export function phoneDigits(value: string) {
  const digits = value.replace(/\D/g, '')
  return digits.length === 11 && digits.startsWith('1') ? digits.slice(1) : digits
}

export function formatPhone(value: string) {
  const digits = phoneDigits(value)
  if (digits.length !== 10) return value.trim()
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`
}

export function validateField(field: InspectionField, value: string): string | undefined {
  const trimmed = value.trim()

  switch (field) {
    case 'name':
      if (!trimmed) return 'Please tell us your name.'
      if (trimmed.length < 2) return 'Please enter your full name.'
      return undefined
    case 'phone':
      if (!trimmed) return 'We need a phone number to schedule your inspection.'
      if (!/^\d{10}$/.test(phoneDigits(trimmed))) return 'Please enter a 10-digit phone number, like (704) 555-0192.'
      return undefined
    case 'email':
      if (!trimmed) return 'Please enter your email so we can send your inspection report.'
      if (!EMAIL_PATTERN.test(trimmed)) return 'That email doesn’t look quite right — please check it.'
      return undefined
    case 'address':
      if (!trimmed) return 'Please enter the property address.'
      // A street address needs a house number and a street name.
      if (!/\d/.test(trimmed) || !/[a-z]{2,}/i.test(trimmed)) return 'Please include the street number and name, like 123 Main St.'
      return undefined
    case 'service':
      return trimmed ? undefined : 'Please choose what you need help with.'
    case 'message':
      if (trimmed.length > MESSAGE_MAX_LENGTH) return `Please keep your message under ${MESSAGE_MAX_LENGTH} characters.`
      return undefined
  }
}

export function validateInspection(fields: InspectionFields): InspectionErrors {
  const errors: InspectionErrors = {}
  for (const field of INSPECTION_FIELDS) {
    const error = validateField(field, fields[field])
    if (error) errors[field] = error
  }
  return errors
}

/** Splits picked files into ones we accept and a friendly message about any we skipped. */
export function checkPhotos(existing: number, picked: File[]): { accepted: File[]; error?: string } {
  const allowed = new Set(PHOTO_LIMITS.accept.split(','))
  const accepted: File[] = []
  const problems: string[] = []

  for (const file of picked) {
    // Some phones report HEIC photos with an empty type, so fall back to the extension.
    const isImage = allowed.has(file.type) || /\.(jpe?g|png|webp|heic|heif)$/i.test(file.name)
    if (!isImage) problems.push(`${file.name} isn’t a photo`)
    else if (file.size > PHOTO_LIMITS.maxBytes) problems.push(`${file.name} is over 10 MB`)
    else if (existing + accepted.length >= PHOTO_LIMITS.maxFiles) problems.push(`only ${PHOTO_LIMITS.maxFiles} photos fit`)
    else accepted.push(file)
  }

  const unique = [...new Set(problems)]
  return { accepted, error: unique.length ? `Skipped: ${unique.join('; ')}.` : undefined }
}
