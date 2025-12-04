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
  POST_GRADUATE_PROGRAM: 'images/post-graduate-programs',
  EVENT: 'images/events',
  SCIENTIFIC_JOURNAL: 'images/scientific-journals',
  BOOK_VOLUME_AUTHOR_IMAGE: 'images/book-volumes/authors',
  BOOK_VOLUME_COVER: 'images/book-volumes/covers',
  BOOK_VOLUME_CATALOG_SHEET: 'documents/book-volumes/catalog-sheets',
} as const

export type FileType = (typeof File)[keyof typeof File]
