import { CreateScientificArticleController } from '../../controllers/scientific-articles/create-scientific-article-controller.ts'
import { DeleteScientificArticleController } from '../../controllers/scientific-articles/delete-scientific-article-controller.ts'
import { FindScientificArticleByIdController } from '../../controllers/scientific-articles/find-scientific-article-by-id-controller.ts'
import { FindScientificArticlesController } from '../../controllers/scientific-articles/find-scientific-articles-controller.ts'
import { UpdateScientificArticleController } from '../../controllers/scientific-articles/update-scientific-article-controller.ts'
import { makeScientificArticlesRepository } from '../repositories/scientific-articles.factory.ts'

export function makeCreateScientificArticleController() {
  return {
    createScientificArticleController: new CreateScientificArticleController(
      makeScientificArticlesRepository(),
    ),
  }
}

export function makeFindScientificArticlesController() {
  return {
    findScientificArticlesController: new FindScientificArticlesController(
      makeScientificArticlesRepository(),
    ),
  }
}

export function makeFindScientificArticleByIdController() {
  return {
    findScientificArticleByIdController:
      new FindScientificArticleByIdController(
        makeScientificArticlesRepository(),
      ),
  }
}

export function makeUpdateScientificArticleController() {
  return {
    updateScientificArticleController: new UpdateScientificArticleController(
      makeScientificArticlesRepository(),
    ),
  }
}

export function makeDeleteScientificArticleController() {
  return {
    deleteScientificArticleController: new DeleteScientificArticleController(
      makeScientificArticlesRepository(),
    ),
  }
}
