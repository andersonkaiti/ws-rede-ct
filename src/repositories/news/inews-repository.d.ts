import type { News } from "@prisma/client";
import type { INewsDTO, IUpdateNewsDTO } from "../../dto/news.js";

export interface INewsRepository {
  create(news: INewsDTO): Promise<News>;
  findAll(): Promise<News[]>;
  findById(id: string): Promise<News | null>;
  findByAuthorId(author_id: string): Promise<News[]>;
  update(news: IUpdateNewsDTO): Promise<News>;
  delete(id: string): Promise<void>;
}
