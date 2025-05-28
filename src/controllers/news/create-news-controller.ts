import { type Request, type Response } from "express";
import type { INewsRepository } from "../../repositories/news/inews-repository.d.ts";

export class CreateNewsController {
  constructor(private readonly newsRepository: INewsRepository) {}

  async handle(req: Request, res: Response) {
    try {
      const { title, content, author_id } = req.body;

      const news = await this.newsRepository.create({
        title,
        content,
        author_id,
      });

      res.status(201).json(news);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ message: error.message });
      }
    }
  }
}
