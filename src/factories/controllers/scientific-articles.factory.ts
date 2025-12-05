import { CreateScientificArticleController } from '../../controllers/scientific-articles/create-scientific-article-controller.ts'
import { makeScientificArticlesRepository } from '../repositories/scientific-articles.factory.ts'

export function makeCreateScientificArticleController() {
  return {
    createScientificArticleController: new CreateScientificArticleController(
      makeScientificArticlesRepository()
    ),
  }
}
