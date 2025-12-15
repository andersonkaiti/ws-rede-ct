import { type NextFunction, type Request, type Response, Router } from 'express'
import {
  makeCreateWorkGroupTeamMemberController,
  makeDeleteWorkGroupTeamMemberController,
  makeFindWorkGroupTeamMemberByIdController,
  makeFindWorkGroupTeamMembersController,
  makeUpdateWorkGroupTeamMemberController,
} from '../factories/controllers/work-group-team-member.factory.ts'
import { makeAuthMiddleware } from '../factories/middlewares/auth-middleware.ts'

const router: Router = Router()

const { authMiddleware } = makeAuthMiddleware()

router.post(
  '/',
  (req: Request, res: Response, next: NextFunction) => {
    authMiddleware.isAdmin(req, res, next)
  },
  async (req: Request, res: Response) => {
    const { createWorkGroupTeamMemberController } =
      makeCreateWorkGroupTeamMemberController()

    await createWorkGroupTeamMemberController.handle(req, res)
  },
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

router.put(
  '/:id',
  (req: Request, res: Response, next: NextFunction) => {
    authMiddleware.isAdmin(req, res, next)
  },
  async (req: Request, res: Response) => {
    const { updateWorkGroupTeamMemberController } =
      makeUpdateWorkGroupTeamMemberController()

    await updateWorkGroupTeamMemberController.handle(req, res)
  },
)

router.delete(
  '/:id',
  (req: Request, res: Response, next: NextFunction) => {
    authMiddleware.isAdmin(req, res, next)
  },
  async (req: Request, res: Response) => {
    const { deleteWorkGroupTeamMemberController } =
      makeDeleteWorkGroupTeamMemberController()

    await deleteWorkGroupTeamMemberController.handle(req, res)
  },
)

export { router as workGroupTeamMemberRoutes }
