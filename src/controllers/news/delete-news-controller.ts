import { type Request, type Response } from "express";
import type { INewsRepository } from "../../repositories/news/inews-repository.d.ts";

export class DeleteNewsController {
  constructor(private readonly newsRepository: INewsRepository) {}

  async handle(req: Request, res: Response) {
    try {
      const { id } = req.params;

      await this.newsRepository.delete(id);

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
