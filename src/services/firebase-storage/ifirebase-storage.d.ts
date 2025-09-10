export interface IUploadFile {
  file: Express.Multer.File
  id: string
  folder: File.USER
}

export interface IUpdateFile {
  file: Express.Multer.File
  id: string
  fileUrl: string
  folder: File.USER
}

export interface IDeleteFile {
  fileUrl: string
}

export interface IFirebaseStorageService {
  uploadFile(data: IUploadFile): Promise<string>
  updateFile(data: IUpdateFile): Promise<string>
  deleteFile(req: IDeleteFile): Promise<void>
}
