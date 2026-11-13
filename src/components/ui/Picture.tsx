import { cn } from '@/lib/cn'
import { getImage, imageSrcSet, imageUrl, type ImageName } from '@/lib/images'

interface PictureProps {
  name: ImageName
  alt: string
  /** Matches the rendered width so the browser picks the right file, e.g. "(min-width: 1024px) 50vw, 100vw". */
  sizes: string
  /** Above-the-fold images: load eagerly with high fetch priority. */
  priority?: boolean
  className?: string
}

/**
 * Responsive AVIF/WebP image with intrinsic dimensions (no layout shift) and
 * a tiny blurred placeholder painted until the real image arrives.
 */
export function Picture({ name, alt, sizes, priority = false, className }: PictureProps) {
  const image = getImage(name)
  const fallbackWidth = image.widths[Math.min(1, image.widths.length - 1)]

  return (
    <picture className="contents">
      <source type="image/avif" srcSet={imageSrcSet(name, 'avif')} sizes={sizes} />
      <img
        src={imageUrl(name, fallbackWidth, 'webp')}
        srcSet={imageSrcSet(name, 'webp')}
        sizes={sizes}
        width={image.width}
        height={image.height}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        decoding={priority ? 'sync' : 'async'}
        fetchPriority={priority ? 'high' : undefined}
        className={cn('bg-cover bg-center', className)}
        style={{ backgroundImage: `url("${image.placeholder}")` }}
      />
    </picture>
  )
}
