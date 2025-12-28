const MAX_IMAGE_SIZE_MB = 5
const MAX_PDF_SIZE_MB = 10
const KILOBYTE = 1024
const MEGABYTE = KILOBYTE * KILOBYTE

const MAX_IMAGE_SIZE_BYTES = MAX_IMAGE_SIZE_MB * MEGABYTE
const MAX_PDF_SIZE_BYTES = MAX_PDF_SIZE_MB * MEGABYTE

const ALLOWED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
] as const

const ALLOWED_PDF_TYPES = ['application/pdf'] as const

interface IValidateFileParams {
  file: unknown
  maxSize?: number
  allowedTypes?: readonly string[]
  optional?: boolean
}

export function validateImageFile({
  file,
  maxSize = MAX_IMAGE_SIZE_BYTES,
  allowedTypes = ALLOWED_IMAGE_TYPES,
  optional = false,
}: IValidateFileParams): boolean {
  if (optional && !file) {
    return true
  }

  if (!optional && !file) {
    return false
  }
  if (
    typeof file === 'object' &&
    file !== null &&
    'mimetype' in file &&
    'size' in file
  ) {
    const { mimetype, size } = file as {
      mimetype: string
      size: number
    }

    return (
      typeof mimetype === 'string' &&
      typeof size === 'number' &&
      (allowedTypes as readonly string[]).includes(mimetype) &&
      size <= maxSize
    )
  }

  return false
}

export function validatePdfFile({
  file,
  maxSize = MAX_PDF_SIZE_BYTES,
  allowedTypes = ALLOWED_PDF_TYPES,
  optional = false,
}: IValidateFileParams): boolean {
  if (optional && !file) {
    return true
  }

  if (!optional && !file) {
    return false
  }
  if (
    typeof file === 'object' &&
    file !== null &&
    'mimetype' in file &&
    'size' in file
  ) {
    const { mimetype, size } = file as {
      mimetype: string
      size: number
    }

    return (
      typeof mimetype === 'string' &&
      typeof size === 'number' &&
      (allowedTypes as readonly string[]).includes(mimetype) &&
      size <= maxSize
    )
  }

  return false
}

export const FILE_VALIDATION_CONSTANTS = {
  MAX_IMAGE_SIZE_MB,
  MAX_PDF_SIZE_MB,
  MAX_IMAGE_SIZE_BYTES,
  MAX_PDF_SIZE_BYTES,
  ALLOWED_IMAGE_TYPES,
  ALLOWED_PDF_TYPES,
} as const
