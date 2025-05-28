import { NewsRepository } from "../../repositories/news/news-repository.ts";
import { prisma } from "../../../config/database.ts";

export function makeNewsRepository() {
  return new NewsRepository(prisma);
}
