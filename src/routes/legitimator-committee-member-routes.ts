import { type NextFunction, type Request, type Response, Router } from 'express'
import {
  makeCreateLegitimatorCommitteeMemberController,
  makeFindLegitimatorCommitteeMembersController,
} from '../factories/controllers/legitimator-committee-member.factory.ts'
import { makeAuthMiddleware } from '../factories/middlewares/auth-middleware.ts'

const router = Router()

const { authMiddleware } = makeAuthMiddleware()

router.post(
  '/',
  (req: Request, res: Response, next: NextFunction) => {
    authMiddleware.authenticated(req, res, next)
  },
  async (req: Request, res: Response) => {
    const { createLegitimatorCommitteeMemberController } =
      makeCreateLegitimatorCommitteeMemberController()

    await createLegitimatorCommitteeMemberController.handle(req, res)
  }
)

router.get('/', async (req: Request, res: Response) => {
  const { findLegitimatorCommitteeMembersController } =
    makeFindLegitimatorCommitteeMembersController()

  await findLegitimatorCommitteeMembersController.handle(req, res)
})

export { router as legitimatorCommitteeMemberRoutes }
