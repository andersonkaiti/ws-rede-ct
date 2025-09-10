export const File = {
  NEWS: 'images/news',
  USER: 'images/user',
  CERTIFICATION: 'documents/certifications',
} as const

export type FileType = (typeof File)[keyof typeof File]
