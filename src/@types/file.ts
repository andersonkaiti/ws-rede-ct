export const File = {
  NEWS: 'images/news',
  USER: 'images/user',
  CERTIFICATION: 'documents/certifications',
  PENDENCY: 'documents/pendencies',
} as const

export type FileType = (typeof File)[keyof typeof File]
