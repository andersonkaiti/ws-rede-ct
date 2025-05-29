export const File = {
  NEWS: "news",
} as const;

export type FileType = (typeof File)[keyof typeof File];
