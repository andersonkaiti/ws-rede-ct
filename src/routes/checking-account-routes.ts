import { type NextFunction, type Request, type Response, Router } from 'express'
import {
  makeCreateCheckingAccountController,
  makeFindCheckingAccountsController,
} from '../factories/controllers/checking-account.factory.ts'
import { makeAuthMiddleware } from '../factories/middlewares/auth-middleware.ts'

const router: Router = Router()

const { authMiddleware } = makeAuthMiddleware()

router.post(
  '/',
  (req: Request, res: Response, next: NextFunction) => {
    authMiddleware.isAdmin(req, res, next)
  },
  async (req: Request, res: Response) => {
    const { createCheckingAccountController } =
      makeCreateCheckingAccountController()

    await createCheckingAccountController.handle(req, res)
  },
)

router.get('/', async (req: Request, res: Response) => {
  const { findCheckingAccountsController } =
    makeFindCheckingAccountsController()

  await findCheckingAccountsController.handle(req, res)
})

export { router as checkingAccountRoutes }
