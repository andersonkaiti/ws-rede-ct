export const File = {
  NEWS: 'images/news',
  USER: 'images/user',
  IN_MEMORIAM: 'images/in-memoriam',
  PARTNER: 'images/partners',
  CERTIFICATION: 'documents/certifications',
  PENDENCY: 'documents/pendencies',
} as const

export type FileType = (typeof File)[keyof typeof File]
