import { type NextFunction, type Request, type Response, Router } from 'express'
import { makeCreateETPController } from '../factories/controllers/etp.factory.ts'
import { makeAuthMiddleware } from '../factories/middlewares/auth-middleware.ts'

const router = Router()

const { authMiddleware } = makeAuthMiddleware()

router.post(
  '/',
  (req: Request, res: Response, next: NextFunction) => {
    authMiddleware.authenticated(req, res, next)
  },
  async (req: Request, res: Response) => {
    const { createETPController } = makeCreateETPController()

    await createETPController.handle(req, res)
  }
)

export { router as etpRoutes }
