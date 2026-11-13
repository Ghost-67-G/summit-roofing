import { ImagePlus, X } from 'lucide-react'
import { useEffect, useMemo, useState, type DragEvent } from 'react'
import { cn } from '@/lib/cn'
import { checkPhotos, PHOTO_LIMITS } from '@/lib/inspection-validation'

interface PhotoPickerProps {
  id: string
  photos: File[]
  onChange: (photos: File[]) => void
}

const formatSize = (bytes: number) =>
  bytes < 1024 * 1024 ? `${Math.max(1, Math.round(bytes / 1024))} KB` : `${(bytes / 1024 / 1024).toFixed(1)} MB`

/**
 * Optional photo field — UI only. Visitors can pick or drop up to five photos
 * and see previews, but the files are not uploaded (see "Photo uploads" in the
 * README to wire that up). The input has no `name`, so it never adds file
 * data to a submission by accident.
 */
export function PhotoPicker({ id, photos, onChange }: PhotoPickerProps) {
  const [error, setError] = useState<string>()
  const [dragging, setDragging] = useState(false)

  // Object URLs for the thumbnails, released when the list changes or the form unmounts.
  const previews = useMemo(() => photos.map((file) => URL.createObjectURL(file)), [photos])
  useEffect(() => () => previews.forEach((url) => URL.revokeObjectURL(url)), [previews])

  function addFiles(list: FileList | null) {
    if (!list?.length) return
    const { accepted, error } = checkPhotos(photos.length, Array.from(list))
    setError(error)
    if (accepted.length) onChange([...photos, ...accepted])
  }

  function handleDrop(event: DragEvent<HTMLLabelElement>) {
    event.preventDefault()
    setDragging(false)
    addFiles(event.dataTransfer.files)
  }

  const full = photos.length >= PHOTO_LIMITS.maxFiles

  return (
    <div>
      <p className="mb-1.5 flex items-baseline justify-between text-sm font-bold text-brand-950">
        <span id={`${id}-label`}>Photos of the damage</span>
        <span className="text-xs font-medium text-brand-600">Optional</span>
      </p>

      <label
        htmlFor={id}
        onDragOver={(event) => {
          event.preventDefault()
          setDragging(true)
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        className={cn(
          'flex cursor-pointer items-center gap-4 rounded-xl border-2 border-dashed px-4 py-4 transition-colors has-[:focus-visible]:border-brand-700 has-[:focus-visible]:ring-4 has-[:focus-visible]:ring-brand-700/15',
          dragging ? 'border-accent-600 bg-accent-50' : 'border-brand-200 bg-brand-50/60 hover:border-brand-400',
          full && 'pointer-events-none opacity-60',
        )}
      >
        <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-white text-accent-700 shadow-sm">
          <ImagePlus className="size-5.5" aria-hidden="true" />
        </span>
        <span className="text-sm leading-snug">
          <span className="block font-bold text-brand-950">
            {full ? 'Photo limit reached' : 'Add photos'}
            <span className="font-medium text-brand-600 max-sm:hidden"> or drag them here</span>
          </span>
          <span className="block text-brand-600">
            Up to {PHOTO_LIMITS.maxFiles} images, 10 MB each. Helps us prepare for your inspection.
          </span>
        </span>
        <input
          id={id}
          type="file"
          accept={PHOTO_LIMITS.accept}
          multiple
          disabled={full}
          aria-labelledby={`${id}-label`}
          aria-describedby={error ? `${id}-error` : undefined}
          className="sr-only"
          onChange={(event) => {
            addFiles(event.currentTarget.files)
            // Reset so picking the same file again still fires `change`.
            event.currentTarget.value = ''
          }}
        />
      </label>

      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-sm font-medium text-red-700" role="alert">
          {error}
        </p>
      )}

      {photos.length > 0 && (
        <ul className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3" aria-label="Selected photos">
          {photos.map((file, index) => (
            <li
              key={`${file.name}-${file.lastModified}-${index}`}
              className="flex items-center gap-2.5 rounded-xl border border-brand-100 bg-white p-1.5 pr-1"
            >
              <img src={previews[index]} alt="" className="size-10 shrink-0 rounded-lg bg-brand-100 object-cover" />
              <span className="min-w-0 flex-1 text-xs leading-tight">
                <span className="block truncate font-semibold text-brand-950">{file.name}</span>
                <span className="text-brand-600">{formatSize(file.size)}</span>
              </span>
              <button
                type="button"
                onClick={() => {
                  onChange(photos.filter((_, i) => i !== index))
                  setError(undefined)
                }}
                className="grid size-8 shrink-0 place-items-center rounded-full text-brand-600 hover:bg-brand-50 hover:text-brand-950"
                aria-label={`Remove ${file.name}`}
              >
                <X className="size-4" aria-hidden="true" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
