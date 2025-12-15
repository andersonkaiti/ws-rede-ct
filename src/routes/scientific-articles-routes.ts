import { type NextFunction, type Request, type Response, Router } from 'express'
import {
  makeCreateScientificArticleController,
  makeDeleteScientificArticleController,
  makeFindScientificArticleByIdController,
  makeFindScientificArticlesController,
  makeUpdateScientificArticleController,
} from '../factories/controllers/scientific-articles.factory.ts'
import { makeAuthMiddleware } from '../factories/middlewares/auth-middleware.ts'

const router: Router = Router()

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
  },
)

router.get('/', async (req: Request, res: Response) => {
  const { findScientificArticlesController } =
    makeFindScientificArticlesController()

  await findScientificArticlesController.handle(req, res)
})

router.get('/:id', async (req: Request, res: Response) => {
  const { findScientificArticleByIdController } =
    makeFindScientificArticleByIdController()

  await findScientificArticleByIdController.handle(req, res)
})

router.put(
  '/:id',
  (req: Request, res: Response, next: NextFunction) => {
    authMiddleware.isAdmin(req, res, next)
  },
  async (req: Request, res: Response) => {
    const { updateScientificArticleController } =
      makeUpdateScientificArticleController()

    await updateScientificArticleController.handle(req, res)
  },
)

router.delete(
  '/:id',
  (req: Request, res: Response, next: NextFunction) => {
    authMiddleware.isAdmin(req, res, next)
  },
  async (req: Request, res: Response) => {
    const { deleteScientificArticleController } =
      makeDeleteScientificArticleController()

    await deleteScientificArticleController.handle(req, res)
  },
)

export { router as scientificArticlesRoutes }
