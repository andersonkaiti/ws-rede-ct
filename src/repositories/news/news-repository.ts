import type { News, PrismaClient } from "@prisma/client";
import type { INewsRepository } from "./inews-repository.d.ts";
import type { INewsDTO, IUpdateNewsDTO } from "../../dto/news.js";

export class NewsRepository implements INewsRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async create({ title, content, author_id }: INewsDTO): Promise<News> {
    return await this.prisma.news.create({
      data: {
        title,
        content,
        author_id,
      },
    });
  }

  async findAll(): Promise<News[]> {
    return await this.prisma.news.findMany();
  }

  async findById(id: string): Promise<News | null> {
    return await this.prisma.news.findUnique({
      where: {
        id,
      },
    });
  }

  async findByAuthorId(author_id: string): Promise<News[]> {
    return await this.prisma.news.findMany({
      where: {
        author_id,
      },
    });
  }

  async update(news: IUpdateNewsDTO): Promise<News> {
    return await this.prisma.news.update({
      where: {
        id: news.id,
      },
      data: {
        title: news.title,
        content: news.content,
      },
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.news.delete({
      where: {
        id,
      },
    });
  }
}
