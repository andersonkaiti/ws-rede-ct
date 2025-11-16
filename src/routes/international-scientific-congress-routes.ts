import { type NextFunction, type Request, type Response, Router } from 'express'
import { makeCreateInternationalScientificCongressController } from '../factories/controllers/international-scientific-congress/international-scientific-congress.factory.ts'
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

export { router as internationalScientificCongressRoutes }
