import { type NextFunction, type Request, type Response, Router } from 'express'
import {
  makeCreateReferenceCenterTeamMemberController,
  makeDeleteReferenceCenterTeamMemberController,
  makeFindReferenceCenterTeamMemberByIdController,
  makeFindReferenceCenterTeamMembersController,
  makeUpdateReferenceCenterTeamMemberController,
} from '../factories/controllers/reference-center-team-member.factory.ts'
import { makeAuthMiddleware } from '../factories/middlewares/auth-middleware.ts'

const router = Router()

const { authMiddleware } = makeAuthMiddleware()

router.post(
  '/',
  (req: Request, res: Response, next: NextFunction) => {
    authMiddleware.authenticated(req, res, next)
  },
  async (req: Request, res: Response) => {
    const { createReferenceCenterTeamMemberController } =
      makeCreateReferenceCenterTeamMemberController()

    await createReferenceCenterTeamMemberController.handle(req, res)
  }
)

router.get('/', async (req: Request, res: Response) => {
  const { findReferenceCenterTeamMembersController } =
    makeFindReferenceCenterTeamMembersController()

  await findReferenceCenterTeamMembersController.handle(req, res)
})

router.get('/:id', async (req: Request, res: Response) => {
  const { findReferenceCenterTeamMemberByIdController } =
    makeFindReferenceCenterTeamMemberByIdController()

  await findReferenceCenterTeamMemberByIdController.handle(req, res)
})

router.put(
  '/:id',
  (req: Request, res: Response, next: NextFunction) => {
    authMiddleware.authenticated(req, res, next)
  },
  async (req: Request, res: Response) => {
    const { updateReferenceCenterTeamMemberController } =
      makeUpdateReferenceCenterTeamMemberController()

    await updateReferenceCenterTeamMemberController.handle(req, res)
  }
)

router.delete(
  '/:id',
  (req: Request, res: Response, next: NextFunction) => {
    authMiddleware.authenticated(req, res, next)
  },
  async (req: Request, res: Response) => {
    const { deleteReferenceCenterTeamMemberController } =
      makeDeleteReferenceCenterTeamMemberController()

    await deleteReferenceCenterTeamMemberController.handle(req, res)
  }
)

export { router as referenceCenterTeamMemberRoutes }
