import { CreateNewsController } from "../../controllers/news/create-news-controller.ts";
import { UpdateNewsController } from "../../controllers/news/update-news-controller.ts";
import { DeleteNewsController } from "../../controllers/news/delete-news-controller.ts";
import { makeNewsRepository } from "../repositories/news.factory.ts";
import { FindAllNewsController } from "../../controllers/news/find-all-news-controller.ts";
import { FindNewsByIdController } from "../../controllers/news/find-news-by-id-controller.ts";
import { FindByAuthorController } from "../../controllers/news/find-news-by-author-id-controller.ts";

export function makeCreateNewsController() {
  return {
    createNewsController: new CreateNewsController(makeNewsRepository()),
  };
}

export function makeFindAllNewsController() {
  return {
    findAllNewsController: new FindAllNewsController(makeNewsRepository()),
  };
}

export function makeFindNewsByIdController() {
  return {
    findNewsByIdController: new FindNewsByIdController(makeNewsRepository()),
  };
}

export function makeFindNewsByAuthorIdController() {
  return {
    findNewsByAuthorIdController: new FindByAuthorController(
      makeNewsRepository()
    ),
  };
}

export function makeUpdateNewsController() {
  return {
    updateNewsController: new UpdateNewsController(makeNewsRepository()),
  };
}

export function makeDeleteNewsController() {
  return {
    deleteNewsController: new DeleteNewsController(makeNewsRepository()),
  };
}
