import { type NextFunction, type Request, type Response, Router } from 'express'
import { HttpStatus } from '../@types/status-code.ts'
import {
  makeFindAuthenticatedUserController,
  makeFindAuthenticatedUserNewsController,
  makeSignInController,
  makeSignUpController,
} from '../factories/controllers/auth.factory.ts'
import { makeAuthMiddleware } from '../factories/middlewares/auth-middleware.ts'

const router = Router()

const { signUpController } = makeSignUpController()
const { signInController } = makeSignInController()

const { authMiddleware } = makeAuthMiddleware()

router.post('/sign-up', async (req: Request, res: Response) => {
  await signUpController.handle(req, res)
})

router.post('/sign-in', async (req: Request, res: Response) => {
  await signInController.handle(req, res)
})

router.get(
  '/user',
  (req: Request, res: Response, next: NextFunction) => {
    authMiddleware.authenticated(req, res, next)
  },
  async (req: Request, res: Response) => {
    const { findAuthenticatedUserController } =
      makeFindAuthenticatedUserController()

    await findAuthenticatedUserController.handle(req, res)
  }
)

router.get(
  '/user/news',
  (req: Request, res: Response, next: NextFunction) => {
    authMiddleware.authenticated(req, res, next)
  },
  async (req: Request, res: Response) => {
    const { findAuthenticatedUserController } =
      makeFindAuthenticatedUserNewsController()

    await findAuthenticatedUserController.handle(req, res)
  }
)

router.get(
  '/admin',
  (req: Request, res: Response, next: NextFunction) => {
    authMiddleware.isAdmin(req, res, next)
  },
  (_req: Request, res: Response) => {
    res.status(HttpStatus.OK).json({
      success: true,
    })
  }
)

export { router as authRoutes }
