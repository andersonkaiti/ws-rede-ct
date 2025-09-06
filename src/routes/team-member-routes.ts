import { type NextFunction, type Request, type Response, Router } from 'express'
import {
  makeCreateTeamMemberController,
  makeDeleteTeamMemberController,
  makeFindTeamMemberController,
  makeUpdateTeamMemberController,
} from '../factories/controllers/team-member.factory.ts'
import { makeAuthMiddleware } from '../factories/middlewares/auth-middleware.ts'

const router = Router()

const { authMiddleware } = makeAuthMiddleware()

router.post(
  '/:teamId/member',
  (req: Request, res: Response, next: NextFunction) => {
    authMiddleware.isAdmin(req, res, next)
  },
  async (req: Request, res: Response) => {
    const { createTeamMemberController } = makeCreateTeamMemberController()

    await createTeamMemberController.handle(req, res)
  }
)

router.get(
  '/member/:id',
  (req: Request, res: Response, next: NextFunction) => {
    authMiddleware.isAdmin(req, res, next)
  },
  async (req: Request, res: Response) => {
    const { findTeamMemberController } = makeFindTeamMemberController()

    await findTeamMemberController.handle(req, res)
  }
)

router.put(
  '/member/:id',
  (req: Request, res: Response, next: NextFunction) => {
    authMiddleware.isAdmin(req, res, next)
  },
  async (req: Request, res: Response) => {
    const { updateTeamMemberController } = makeUpdateTeamMemberController()

    await updateTeamMemberController.handle(req, res)
  }
)

router.delete(
  '/member/:id',
  (req: Request, res: Response, next: NextFunction) => {
    authMiddleware.isAdmin(req, res, next)
  },
  async (req: Request, res: Response) => {
    const { deleteTeamMemberController } = makeDeleteTeamMemberController()

    await deleteTeamMemberController.handle(req, res)
  }
)

export { router as teamMembersRoutes }
