export const File = {
  NEWS: 'news',
  USER: 'user',
} as const

export type FileType = (typeof File)[keyof typeof File]
