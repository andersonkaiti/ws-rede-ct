import { type Request, type Response } from "express";
import type { INewsRepository } from "../../repositories/news/inews-repository.d.ts";
import type { IFirebaseStorageService } from "../../services/firebase-storage/ifirebase-storage.js";
export class DeleteNewsController {
  constructor(
    private readonly newsRepository: INewsRepository,
    private readonly firebaseStorageService: IFirebaseStorageService
  ) {}

  async handle(req: Request, res: Response) {
    try {
      const { id } = req.params;

      await Promise.all([
        this.newsRepository.delete(id),
        this.firebaseStorageService.deleteFile(req),
      ]);

      res.status(200).json({
        message: "Notícia deletada com sucesso.",
      });
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ message: error.message });
      }
    }
  }
}
