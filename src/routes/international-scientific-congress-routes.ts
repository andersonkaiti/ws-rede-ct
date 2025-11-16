import { type NextFunction, type Request, type Response, Router } from 'express'
import {
  makeCreateInternationalScientificCongressController,
  makeFindInternationalScientificCongressByIdController,
  makeFindInternationalScientificCongressesController,
} from '../factories/controllers/international-scientific-congress/international-scientific-congress.factory.ts'
import { makeAuthMiddleware } from '../factories/middlewares/auth-middleware.ts'

const router = Router()

const { authMiddleware } = makeAuthMiddleware()

router.post(
  '/',
  (req: Request, res: Response, next: NextFunction) => {
    authMiddleware.authenticated(req, res, next)
  },
  async (req: Request, res: Response) => {
    const { createInternationalScientificCongressController } =
      makeCreateInternationalScientificCongressController()

    await createInternationalScientificCongressController.handle(req, res)
  }
)

router.get('/', async (req: Request, res: Response) => {
  const { findInternationalScientificCongressesController } =
    makeFindInternationalScientificCongressesController()

  await findInternationalScientificCongressesController.handle(req, res)
})

router.get('/:id', async (req: Request, res: Response) => {
  const { findInternationalScientificCongressByIdController } =
    makeFindInternationalScientificCongressByIdController()

  await findInternationalScientificCongressByIdController.handle(req, res)
})

export { router as internationalScientificCongressRoutes }
