import type { Bucket } from "@google-cloud/storage";
import type { IFirebaseStorageService } from "./ifirebase-storage.d.ts";
import type { FileType } from "../../@types/file.d.ts";
import { type Request } from "express";
import { randomUUID } from "node:crypto";
export class FirebaseStorageService implements IFirebaseStorageService {
  constructor(private readonly bucket: Bucket) {}

  async uploadFile(req: Request, fileType: FileType): Promise<string> {
    if (!req.file) {
      throw new Error("Arquivo não encontrado.");
    }

    const file = req.file;
    const author_id = req.body.author_id;

    const fileName = `${randomUUID()}-${file?.originalname}`;

    const fileRef = this.bucket.file(
      `images/${fileType}/${author_id}/${fileName}`
    );

    const fileStream = fileRef.createWriteStream({
      metadata: {
        contentType: file?.mimetype,
      },
    });

    fileStream.on("error", (error) => {
      console.log(error);
    });

    fileStream.on("finish", async () => {
      await fileRef.makePublic();
    });

    fileStream.end(file?.buffer);

    const downloadUrl = `https://storage.googleapis.com/${this.bucket.name}/${fileRef.name}`;

    return downloadUrl;
  }

  async updateFile(req: Request, fileType: FileType): Promise<string> {
    if (!req.file) {
      throw new Error("Arquivo não encontrado.");
    }

    try {
      const filePath = this.getPath(req.body.image_url);

      if (!filePath) {
        throw new Error("Arquivo não encontrado.");
      }

      const [_, newImageUrl] = await Promise.all([
        this.bucket.file(filePath).delete(),
        this.uploadFile(req, fileType),
      ]);

      return newImageUrl;
    } catch (error) {
      throw new Error("Erro ao atualizar o arquivo.");
    }
  }

  async deleteFile(req: Request): Promise<void> {
    if (!req.body.image_url) {
      throw new Error("Arquivo não encontrado.");
    }

    const filePath = this.getPath(req.body.image_url);

    if (!filePath) {
      throw new Error("Arquivo não encontrado.");
    }

    try {
      await this.bucket.file(filePath).delete();
    } catch (error) {
      throw new Error("Erro ao deletar o arquivo.");
    }
  }

  getPath(imageUrl: string): string | null {
    const match = imageUrl.match(/\/images\/.+$/);
    return match ? match[0].slice(1) : null;
  }
}
