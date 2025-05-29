import { type Request, type Response } from "express";
import type { INewsRepository } from "../../repositories/news/inews-repository.d.ts";
import type { IFirebaseStorageService } from "../../services/firebase-storage/ifirebase-storage.js";
import { File } from "../../@types/file.ts";

export class UpdateNewsController {
  constructor(
    private readonly newsRepository: INewsRepository,
    private readonly firebaseStorageService: IFirebaseStorageService
  ) {}

  async handle(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const { title, content, image_url } = req.body;

      let newImageUrl: string | undefined;

      if (image_url) {
        newImageUrl = await this.firebaseStorageService.updateFile(
          req,
          File.NEWS
        );
      }

      const news = await this.newsRepository.update({
        id,
        title,
        content,
        image_url: newImageUrl,
      });

      res.status(200).json(news);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ message: error.message });
      }
    }
  }
}
