import { type NextFunction, type Request, type Response, Router } from 'express'
import {
  makeCreateWorkGroupTeamMemberController,
  makeFindWorkGroupTeamMemberByIdController,
  makeFindWorkGroupTeamMembersController,
} from '../factories/controllers/work-group-team-member.factory.ts'
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

router.get('/', async (req: Request, res: Response) => {
  const { findWorkGroupTeamMembersController } =
    makeFindWorkGroupTeamMembersController()

  await findWorkGroupTeamMembersController.handle(req, res)
})

router.get('/:id', async (req: Request, res: Response) => {
  const { findWorkGroupTeamMemberByIdController } =
    makeFindWorkGroupTeamMemberByIdController()

  await findWorkGroupTeamMemberByIdController.handle(req, res)
})

export { router as workGroupTeamMemberRoutes }
