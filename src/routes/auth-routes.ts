import { type NextFunction, type Request, type Response, Router } from 'express'
import { HttpStatus } from '../@types/status-code.ts'
import {
  makeFindAuthenticatedUserCertificationsController,
  makeFindAuthenticatedUserController,
  makeFindAuthenticatedUserNewsController,
  makeFindAuthenticatedUserPendenciesController,
  makeSignInController,
  makeSignUpController,
} from '../factories/controllers/auth.factory.ts'
import { makeAuthMiddleware } from '../factories/middlewares/auth-middleware.ts'

const router: Router = Router()

const { authMiddleware } = makeAuthMiddleware()

router.post('/sign-up', async (req: Request, res: Response) => {
  const { signUpController } = makeSignUpController()

  await signUpController.handle(req, res)
})

router.post('/sign-in', async (req: Request, res: Response) => {
  const { signInController } = makeSignInController()

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
  },
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
  },
)

router.get(
  '/admin',
  (req: Request, res: Response, next: NextFunction) => {
    authMiddleware.isAdmin(req, res, next)
  },
  (_req: Request, res: Response) => {
    try {
      res.status(HttpStatus.OK).json({
        success: true,
      })
    } catch (err) {
      if (err instanceof Error) {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
          message: err.message,
        })
      }
    }
  },
)

router.get(
  '/certifications',
  (req: Request, res: Response, next: NextFunction) => {
    authMiddleware.authenticated(req, res, next)
  },
  async (req: Request, res: Response) => {
    const { findAuthenticatedUserCertificationsController } =
      makeFindAuthenticatedUserCertificationsController()

    await findAuthenticatedUserCertificationsController.handle(req, res)
  },
)

router.get(
  '/pendencies',
  (req: Request, res: Response, next: NextFunction) => {
    authMiddleware.authenticated(req, res, next)
  },
  async (req: Request, res: Response) => {
    const { findAuthenticatedUserPendenciesController } =
      makeFindAuthenticatedUserPendenciesController()

    await findAuthenticatedUserPendenciesController.handle(req, res)
  },
)

export { router as authRoutes }
