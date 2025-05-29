import { type Request, type Response } from "express";
import type { INewsRepository } from "../../repositories/news/inews-repository.js";

export class FindByAuthorController {
  constructor(private readonly newsRepository: INewsRepository) {}

  async handle(req: Request, res: Response) {
    try {
      const { author_id } = req.params;

      const news = await this.newsRepository.findByAuthorId(author_id);

      res.status(200).json(news);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ message: error.message });
      }
    }
  }
}
