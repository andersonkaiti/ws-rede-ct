import { type Request, type Response } from "express";
import type { INewsRepository } from "../../repositories/news/inews-repository.d.ts";

export class UpdateNewsController {
  constructor(private readonly newsRepository: INewsRepository) {}

  async handle(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const { title, content } = req.body;

      const news = await this.newsRepository.update({
        id,
        title,
        content,
      });

      res.status(200).json(news);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ message: error.message });
      }
    }
  }
}
