import { type Request, type Response } from "express";
import type { INewsRepository } from "../../repositories/news/inews-repository.d.ts";
import type { IFirebaseStorageService } from "../../services/firebase-storage/ifirebase-storage.js";
import { File } from "../../@types/file.ts";

export class CreateNewsController {
  constructor(
    private readonly newsRepository: INewsRepository,
    private readonly firebaseStorageService: IFirebaseStorageService
  ) {}

  async handle(req: Request, res: Response) {
    try {
      const { title, content, author_id } = req.body;

      const image_url = await this.firebaseStorageService.uploadFile(
        req,
        File.NEWS
      );

      const news = await this.newsRepository.create({
        title,
        content,
        author_id,
        image_url,
      });

      res.status(201).json(news);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ message: error.message });
      }
    }
  }
}
