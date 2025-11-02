import { type NextFunction, type Request, type Response, Router } from 'express'
import {
  makeCreateManagementTeamController,
  makeFindManagementTeamByIdController,
  makeFindManagementTeamsController,
  makeUpdateManagementTeamController,
} from '../factories/controllers/management-team.factory.ts'
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

router.get('/', async (req: Request, res: Response) => {
  const { findManagementTeamsController } = makeFindManagementTeamsController()

  await findManagementTeamsController.handle(req, res)
})

router.get('/:id', async (req: Request, res: Response) => {
  const { findManagementTeamByIdController } =
    makeFindManagementTeamByIdController()

  await findManagementTeamByIdController.handle(req, res)
})

router.put(
  '/:id',
  (req: Request, res: Response, next: NextFunction) => {
    authMiddleware.authenticated(req, res, next)
  },
  async (req: Request, res: Response) => {
    const { updateManagementTeamController } =
      makeUpdateManagementTeamController()

    await updateManagementTeamController.handle(req, res)
  }
)

export { router as managementTeamRoutes }
