import type { Bucket } from "@google-cloud/storage";
import { type Request } from "express";
import type { File } from "../../@types/file.d.ts";

export interface IFirebaseStorageService {
  uploadFile(req: Request, fileType: FileType): Promise<string>;
  updateFile(req: Request, fileType: FileType): Promise<string>;
  deleteFile(req: Request, fileType: FileType): Promise<void>;
}
