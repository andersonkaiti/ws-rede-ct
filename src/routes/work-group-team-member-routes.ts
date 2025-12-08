import { type NextFunction, type Request, type Response, Router } from 'express'
import { makeCreateWorkGroupTeamMemberController } from '../factories/controllers/work-group-team-member.factory.ts'
import { makeAuthMiddleware } from '../factories/middlewares/auth-middleware.ts'

const router = Router()

const { authMiddleware } = makeAuthMiddleware()

router.post(
  '/',
  (req: Request, res: Response, next: NextFunction) => {
    authMiddleware.authenticated(req, res, next)
  },
  async (req: Request, res: Response) => {
    const { createWorkGroupTeamMemberController } =
      makeCreateWorkGroupTeamMemberController()

    await createWorkGroupTeamMemberController.handle(req, res)
  }
)

export { router as workGroupTeamMemberRoutes }
