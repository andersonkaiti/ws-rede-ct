import { type NextFunction, type Request, type Response, Router } from 'express'
import { makeCreateManagementTeamController } from '../factories/controllers/management-team.factory.ts'
import { makeAuthMiddleware } from '../factories/middlewares/auth-middleware.ts'

const router = Router()

const { authMiddleware } = makeAuthMiddleware()

router.post(
  '/',
  (req: Request, res: Response, next: NextFunction) => {
    authMiddleware.authenticated(req, res, next)
  },
  async (req: Request, res: Response) => {
    const { createManagementTeamController } =
      makeCreateManagementTeamController()

    await createManagementTeamController.handle(req, res)
  }
)

export { router as managementTeamRoutes }
