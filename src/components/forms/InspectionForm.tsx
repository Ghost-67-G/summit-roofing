import { ChevronDown, CircleAlert, CircleCheck, LoaderCircle } from 'lucide-react'
import { useEffect, useRef, useState, type FocusEvent, type FormEvent, type ReactNode } from 'react'
import { Button } from '@/components/ui/Button'
import { business } from '@/config/site'
import { island } from '@/islands/island'
import { cn } from '@/lib/cn'
import {
  formatPhone,
  INSPECTION_FIELDS,
  MESSAGE_MAX_LENGTH,
  validateField,
  validateInspection,
  type InspectionErrors,
  type InspectionField,
  type InspectionFields,
} from '@/lib/inspection-validation'
import { submitInspection } from '@/lib/submit-inspection'
import { PhotoPicker } from './PhotoPicker'

interface InspectionFormProps {
  /** Dropdown options, passed in as props so the service data stays server-side. */
  services: { value: string; label: string }[]
  /** Prefix for element ids, so two forms could share a page. */
  idPrefix?: string
}

type Status = 'idle' | 'submitting' | 'success' | 'error'

type Control = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement

/** Narrows a bubbled event target to one of the form's validated text fields. */
function fieldControl(target: EventTarget): Control | null {
  const isControl = target instanceof HTMLInputElement || target instanceof HTMLSelectElement || target instanceof HTMLTextAreaElement
  return isControl && INSPECTION_FIELDS.includes(target.name as InspectionField) ? target : null
}

function readFields(form: HTMLFormElement): InspectionFields {
  const data = new FormData(form)
  const value = (field: InspectionField) => String(data.get(field) ?? '').trim()
  return {
    name: value('name'),
    phone: value('phone'),
    email: value('email'),
    address: value('address'),
    service: value('service'),
    message: value('message'),
  }
}

export function InspectionForm({ services, idPrefix = 'inspection' }: InspectionFormProps) {
  const formRef = useRef<HTMLFormElement>(null)
  const successRef = useRef<HTMLDivElement>(null)
  const [errors, setErrors] = useState<InspectionErrors>({})
  const [status, setStatus] = useState<Status>('idle')
  const [photos, setPhotos] = useState<File[]>([])
  const [submitted, setSubmitted] = useState({ name: '', phone: '' })
  const id = (field: string) => `${idPrefix}-${field}`

  // Links like /contact/?service=gutters#inspection pre-select the service.
  useEffect(() => {
    const requested = new URLSearchParams(window.location.search).get('service')
    const select = formRef.current?.elements.namedItem('service')
    if (requested && select instanceof HTMLSelectElement && services.some((s) => s.value === requested)) {
      select.value = requested
    }
  }, [services])

  useEffect(() => {
    if (status === 'success') successRef.current?.focus()
  }, [status])

  const setFieldError = (field: InspectionField, error: string | undefined) =>
    setErrors((current) => (current[field] === error ? current : { ...current, [field]: error }))

  // Validate as people leave a field they've filled in, and clear errors as soon as they're fixed.
  function handleBlur(event: FocusEvent<HTMLFormElement>) {
    const control = fieldControl(event.target)
    if (!control) return
    const field = control.name as InspectionField
    const { value } = control
    if (value.trim() || errors[field]) setFieldError(field, validateField(field, value))
    if (field === 'phone' && value.trim()) control.value = formatPhone(value)
  }

  function handleInput(event: FormEvent<HTMLFormElement>) {
    const control = fieldControl(event.target)
    if (!control) return
    const field = control.name as InspectionField
    if (errors[field] && !validateField(field, control.value)) setFieldError(field, undefined)
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const fields = readFields(form)
    const nextErrors = validateInspection(fields)
    setErrors(nextErrors)

    const firstInvalid = INSPECTION_FIELDS.find((field) => nextErrors[field])
    if (firstInvalid) {
      ;(form.elements.namedItem(firstInvalid) as HTMLElement | null)?.focus()
      return
    }

    setSubmitted({ name: fields.name.split(/\s+/)[0], phone: formatPhone(fields.phone) })

    // Honeypot: real visitors never see this field, so pretend it worked.
    if (new FormData(form).get('_gotcha')) {
      setStatus('success')
      return
    }

    setStatus('submitting')
    try {
      const serviceLabel = services.find((s) => s.value === fields.service)?.label ?? fields.service
      await submitInspection({
        ...fields,
        phone: formatPhone(fields.phone),
        serviceLabel,
        photos: photos.map((photo) => photo.name),
        _subject: `New inspection request: ${serviceLabel} — ${fields.name}`,
        page: window.location.href,
      })
      setPhotos([])
      setStatus('success')
    } catch (error) {
      console.warn('Inspection request failed', error)
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div ref={successRef} tabIndex={-1} role="status" className="py-8 text-center outline-none">
        <span className="mx-auto grid size-16 place-items-center rounded-full bg-emerald-100 text-emerald-700">
          <CircleCheck className="size-9" aria-hidden="true" />
        </span>
        <h3 className="mt-5 text-2xl">Thanks, {submitted.name}! Your free inspection is requested.</h3>
        <p className="mx-auto mt-3 max-w-md leading-relaxed">
          We’ll call you at <strong className="text-brand-950">{submitted.phone}</strong> within one business hour to pick a time that works
          for you. Your inspector will text when they’re on the way.
        </p>
        <p className="mt-4 text-sm">
          Roof leaking right now?{' '}
          <a href={business.phone.href} className="font-bold text-accent-700 underline underline-offset-4">
            Call {business.phone.display}
          </a>
        </p>
        <Button
          variant="outline"
          size="sm"
          className="mt-6"
          onClick={() => {
            setErrors({})
            setStatus('idle')
          }}
        >
          Send another request
        </Button>
      </div>
    )
  }

  const submitting = status === 'submitting'

  return (
    <form
      ref={formRef}
      noValidate
      onSubmit={handleSubmit}
      onBlur={handleBlur}
      onInput={handleInput}
      aria-describedby={id('note')}
      className="grid gap-5 sm:grid-cols-2"
    >
      <Field id={id('name')} label="Full name" error={errors.name} required>
        <input {...fieldProps(id('name'), 'name', errors.name, true)} type="text" autoComplete="name" placeholder="Jordan Smith" />
      </Field>

      <Field id={id('phone')} label="Phone" error={errors.phone} required>
        <input
          {...fieldProps(id('phone'), 'phone', errors.phone, true)}
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          placeholder="(704) 555-0123"
        />
      </Field>

      <Field id={id('email')} label="Email" error={errors.email} required>
        <input
          {...fieldProps(id('email'), 'email', errors.email, true)}
          type="email"
          autoComplete="email"
          placeholder="jordan@example.com"
        />
      </Field>

      <Field id={id('service')} label="Service needed" error={errors.service} required>
        <div className="relative">
          <select {...fieldProps(id('service'), 'service', errors.service, true, 'appearance-none pr-11')} defaultValue="">
            <option value="" disabled>
              Choose a service…
            </option>
            {services.map((service) => (
              <option key={service.value} value={service.value}>
                {service.label}
              </option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute top-1/2 right-4 size-5 -translate-y-1/2 text-brand-500" aria-hidden="true" />
        </div>
      </Field>

      <Field id={id('address')} label="Property address" error={errors.address} required className="sm:col-span-2">
        <input
          {...fieldProps(id('address'), 'address', errors.address, true)}
          type="text"
          autoComplete="street-address"
          placeholder="123 Main St, Charlotte, NC 28203"
        />
      </Field>

      <Field id={id('message')} label="Tell us about your roof" hint="Optional" error={errors.message} className="sm:col-span-2">
        <textarea
          {...fieldProps(id('message'), 'message', errors.message, false, 'py-3')}
          rows={3}
          maxLength={MESSAGE_MAX_LENGTH}
          placeholder="e.g. Water stain on the upstairs ceiling after last week’s storm"
        />
      </Field>

      <div className="sm:col-span-2">
        <PhotoPicker id={id('photos')} photos={photos} onChange={setPhotos} />
      </div>

      {/* Spam honeypot (Formspree recognises the `_gotcha` name). Hidden from people and assistive tech. */}
      <div className="hidden" aria-hidden="true">
        <label>
          Leave this field empty
          <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      {status === 'error' && (
        <p role="alert" className="flex gap-3 rounded-xl bg-red-50 p-4 text-sm font-medium text-red-800 sm:col-span-2">
          <CircleAlert className="size-5 shrink-0" aria-hidden="true" />
          <span>
            Sorry — your request didn’t go through. Please try again, or call us at{' '}
            <a href={business.phone.href} className="font-bold underline">
              {business.phone.display}
            </a>
            .
          </span>
        </p>
      )}

      <div className="sm:col-span-2">
        <Button type="submit" size="lg" className="w-full" disabled={submitting}>
          {submitting ? (
            <>
              <LoaderCircle className="size-5 animate-spin motion-reduce:animate-none" aria-hidden="true" />
              Sending…
            </>
          ) : (
            'Book My Free Inspection'
          )}
        </Button>
        <p id={id('note')} className="mt-3 text-center text-sm text-brand-600">
          Fields marked <span className="text-accent-700">*</span> are required. No spam — we only use your details to schedule your
          inspection.
        </p>
      </div>
    </form>
  )
}

/** Shared attributes for every control: wiring to its label/error, and styling. */
function fieldProps(id: string, name: InspectionField, error: string | undefined, required = false, className?: string) {
  return {
    id,
    name,
    required,
    'aria-invalid': error ? true : undefined,
    'aria-describedby': error ? `${id}-error` : undefined,
    className: cn(
      'block w-full rounded-xl border bg-white px-4 text-base text-brand-950 shadow-sm transition placeholder:text-brand-500',
      'focus:border-brand-700 focus:ring-4 focus:ring-brand-700/15 focus:outline-none',
      error ? 'border-red-600 focus:border-red-600 focus:ring-red-600/15' : 'border-brand-200',
      name !== 'message' && 'h-12',
      className,
    ),
  }
}

interface FieldProps {
  id: string
  label: string
  error?: string
  hint?: string
  required?: boolean
  className?: string
  children: ReactNode
}

function Field({ id, label, error, hint, required, className, children }: FieldProps) {
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-1.5 flex items-baseline justify-between text-sm font-bold text-brand-950">
        <span>
          {label}
          {required && (
            <span className="ml-0.5 text-accent-700" aria-hidden="true">
              *
            </span>
          )}
        </span>
        {hint && <span className="text-xs font-medium text-brand-600">{hint}</span>}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="mt-1.5 flex items-start gap-1.5 text-sm font-medium text-red-700">
          <CircleAlert className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
          {error}
        </p>
      )}
    </div>
  )
}

export const InspectionFormIsland = island('InspectionForm', InspectionForm, 'visible')
