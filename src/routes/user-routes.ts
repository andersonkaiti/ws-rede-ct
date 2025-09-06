import { type NextFunction, type Request, type Response, Router } from 'express'
import {
  makeDeleteUserController,
  makeFindUsersController,
  makeUpdateUserController,
} from '../factories/controllers/user.factory.ts'
import { makeAuthMiddleware } from '../factories/middlewares/auth-middleware.ts'

const router = Router()

const { authMiddleware } = makeAuthMiddleware()

router.put(
  '/',
  (req: Request, res: Response, next: NextFunction) => {
    authMiddleware.authenticated(req, res, next)
  },
  async (req: Request, res: Response) => {
    const { updateUserController } = makeUpdateUserController()

    await updateUserController.handle(req, res)
  }
)

router.delete(
  '/',
  (req: Request, res: Response, next: NextFunction) => {
    authMiddleware.authenticated(req, res, next)
  },
  async (req: Request, res: Response) => {
    const { deleteUserController } = makeDeleteUserController()

    await deleteUserController.handle(req, res)
  }
)

router.get('/', async (req: Request, res: Response) => {
  const { findUsersController } = makeFindUsersController()

  await findUsersController.handle(req, res)
})

export { router as userRoutes }
