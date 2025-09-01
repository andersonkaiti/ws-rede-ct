import type { Request } from 'express'

export interface IFirebaseStorageService {
  uploadFile(req: Request, fileType: FileType): Promise<string>
  updateFile(req: Request, fileType: FileType): Promise<string | undefined>
  deleteFile(req: Request): Promise<void>
}
