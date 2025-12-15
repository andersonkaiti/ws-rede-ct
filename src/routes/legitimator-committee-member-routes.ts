import { type NextFunction, type Request, type Response, Router } from 'express'
import {
  makeCreateLegitimatorCommitteeMemberController,
  makeDeleteLegitimatorCommitteeMemberController,
  makeFindLegitimatorCommitteeMemberByIdController,
  makeFindLegitimatorCommitteeMembersController,
  makeUpdateLegitimatorCommitteeMemberController,
} from '../factories/controllers/legitimator-committee-member.factory.ts'
import { makeAuthMiddleware } from '../factories/middlewares/auth-middleware.ts'

const router: Router = Router()

const { authMiddleware } = makeAuthMiddleware()

router.post(
  '/',
  (req: Request, res: Response, next: NextFunction) => {
    authMiddleware.isAdmin(req, res, next)
  },
  async (req: Request, res: Response) => {
    const { createLegitimatorCommitteeMemberController } =
      makeCreateLegitimatorCommitteeMemberController()

    await createLegitimatorCommitteeMemberController.handle(req, res)
  },
)

router.get('/', async (req: Request, res: Response) => {
  const { findLegitimatorCommitteeMembersController } =
    makeFindLegitimatorCommitteeMembersController()

  await findLegitimatorCommitteeMembersController.handle(req, res)
})

router.get('/:id', async (req: Request, res: Response) => {
  const { findLegitimatorCommitteeMemberByIdController } =
    makeFindLegitimatorCommitteeMemberByIdController()

  await findLegitimatorCommitteeMemberByIdController.handle(req, res)
})

router.put(
  '/:id',
  (req: Request, res: Response, next: NextFunction) => {
    authMiddleware.isAdmin(req, res, next)
  },
  async (req: Request, res: Response) => {
    const { updateLegitimatorCommitteeMemberController } =
      makeUpdateLegitimatorCommitteeMemberController()

    await updateLegitimatorCommitteeMemberController.handle(req, res)
  },
)

router.delete(
  '/:id',
  (req: Request, res: Response, next: NextFunction) => {
    authMiddleware.isAdmin(req, res, next)
  },
  async (req: Request, res: Response) => {
    const { deleteLegitimatorCommitteeMemberController } =
      makeDeleteLegitimatorCommitteeMemberController()

    await deleteLegitimatorCommitteeMemberController.handle(req, res)
  },
)

export { router as legitimatorCommitteeMemberRoutes }
