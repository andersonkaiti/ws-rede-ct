import { type Request, type Response } from "express";
import type { INewsRepository } from "../../repositories/news/inews-repository.d.ts";

export class FindAllNewsController {
  constructor(private readonly newsRepository: INewsRepository) {}

  async handle(_req: Request, res: Response) {
    try {
      const news = await this.newsRepository.findAll();

      res.status(200).json(news);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ message: error.message });
      }
    }
  }
}
