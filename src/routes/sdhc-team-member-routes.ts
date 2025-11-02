import { type NextFunction, type Request, type Response, Router } from 'express'
import {
  makeCreateSDHCTeamMemberController,
  makeFindSDHCTeamMemberByIdController,
  makeFindSDHCTeamMembersController,
  makeUpdateSDHCTeamMemberController,
} from '../factories/controllers/sdhc-team-member.factory.ts'
import { makeAuthMiddleware } from '../factories/middlewares/auth-middleware.ts'

const router = Router()

const { authMiddleware } = makeAuthMiddleware()

router.post(
  '/',
  (req: Request, res: Response, next: NextFunction) => {
    authMiddleware.authenticated(req, res, next)
  },
  async (req: Request, res: Response) => {
    const { createSDHCTeamMemberController } =
      makeCreateSDHCTeamMemberController()

    await createSDHCTeamMemberController.handle(req, res)
  }
)

router.get('/', async (req: Request, res: Response) => {
  const { findSDHCTeamMembersController } = makeFindSDHCTeamMembersController()

  await findSDHCTeamMembersController.handle(req, res)
})

router.get('/:id', async (req: Request, res: Response) => {
  const { findSDHCTeamMemberByIdController } =
    makeFindSDHCTeamMemberByIdController()

  await findSDHCTeamMemberByIdController.handle(req, res)
})

router.put(
  '/:id',
  (req: Request, res: Response, next: NextFunction) => {
    authMiddleware.authenticated(req, res, next)
  },
  async (req: Request, res: Response) => {
    const { updateSDHCTeamMemberController } =
      makeUpdateSDHCTeamMemberController()

    await updateSDHCTeamMemberController.handle(req, res)
  }
)

export { router as sdhcTeamMemberRoutes }
