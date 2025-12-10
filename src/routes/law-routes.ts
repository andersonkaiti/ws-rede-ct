import { type NextFunction, type Request, type Response, Router } from 'express'
import {
  makeCreateLawController,
  makeFindLawByIdController,
  makeFindLawsController,
} from '../factories/controllers/law.factory.ts'
import { makeAuthMiddleware } from '../factories/middlewares/auth-middleware.ts'

const router = Router()

const { authMiddleware } = makeAuthMiddleware()

router.post(
  '/',
  (req: Request, res: Response, next: NextFunction) => {
    authMiddleware.authenticated(req, res, next)
  },
  async (req: Request, res: Response) => {
    const { createLawController } = makeCreateLawController()

    await createLawController.handle(req, res)
  }
)

router.get('/', async (req: Request, res: Response) => {
  const { findLawsController } = makeFindLawsController()

  await findLawsController.handle(req, res)
})

router.get('/:id', async (req: Request, res: Response) => {
  const { findLawByIdController } = makeFindLawByIdController()

  await findLawByIdController.handle(req, res)
})

export { router as lawRoutes }
