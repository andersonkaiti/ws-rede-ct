export const File = {
  NEWS: 'images/news',
  USER: 'images/user',
  IN_MEMORIAM: 'images/in-memoriam',
  PARTNER: 'images/partners',
  CERTIFICATION: 'documents/certifications',
  PENDENCY: 'documents/pendencies',
  REGIMENT: 'documents/regiments',
  MEETING_MINUTE: 'documents/meeting-minutes',
  INTERNATIONAL_SCIENTIFIC_CONGRESS_GALLERY:
    'images/international-scientific-congress-gallery',
  GALLERY: 'images/regional-congress-gallery',
  REGIONAL_CONGRESS_GALLERY: 'images/regional-congress-gallery',
  WEBINAR: 'images/webinars',
  COURSE: 'images/courses',
} as const

export type FileType = (typeof File)[keyof typeof File]
