import { type NextFunction, type Request, type Response, Router } from 'express'
import {
  makeDeleteUserController,
  makeFindUserController,
  makeFindUsersController,
  makeUpdateUserController,
} from '../factories/controllers/user.factory.ts'
import { makeAuthMiddleware } from '../factories/middlewares/auth-middleware.ts'
import { upload } from '../middlewares/multer.ts'

const router = Router()

const { authMiddleware } = makeAuthMiddleware()

router.get('/:id', async (req: Request, res: Response) => {
  const { findUserController } = makeFindUserController()

  await findUserController.handle(req, res)
})

router.put(
  '/',
  (req: Request, res: Response, next: NextFunction) => {
    authMiddleware.authenticated(req, res, next)
  },
  upload.single('avatarImage'),
  async (req: Request, res: Response) => {
    const { updateUserController } = makeUpdateUserController()

    await updateUserController.handle(req, res)
  }
)

router.delete(
  '/:id',
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
