import { type NextFunction, type Request, type Response, Router } from 'express'
import {
  makeCreateScientificArticleController,
  makeFindScientificArticlesController,
} from '../factories/controllers/scientific-articles.factory.ts'
import { makeAuthMiddleware } from '../factories/middlewares/auth-middleware.ts'

const router = Router()

const { authMiddleware } = makeAuthMiddleware()

router.post(
  '/',
  (req: Request, res: Response, next: NextFunction) => {
    authMiddleware.isAdmin(req, res, next)
  },
  async (req: Request, res: Response) => {
    const { createScientificArticleController } =
      makeCreateScientificArticleController()

    await createScientificArticleController.handle(req, res)
  }
)

router.get(
  '/',
  (req: Request, res: Response, next: NextFunction) => {
    authMiddleware.isAdmin(req, res, next)
  },
  async (req: Request, res: Response) => {
    const { findScientificArticlesController } =
      makeFindScientificArticlesController()

    await findScientificArticlesController.handle(req, res)
  }
)

export { router as scientificArticlesRoutes }
