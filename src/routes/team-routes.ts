import { type NextFunction, type Request, type Response, Router } from 'express'
import {
  makeCreateTeamController,
  makeDeleteTeamController,
  makeFindTeamByIdController,
  makeFindTeamByTypeController,
  makeFindTeamsController,
  makeUpdateTeamController,
} from '../factories/controllers/team.factory.ts'
import { makeAuthMiddleware } from '../factories/middlewares/auth-middleware.ts'

const router = Router()

const { authMiddleware } = makeAuthMiddleware()

router.get('/', async (req: Request, res: Response) => {
  const { findTeamsController: findAllTeamsController } =
    makeFindTeamsController()

  await findAllTeamsController.handle(req, res)
})

router.get('/id/:id', async (req: Request, res: Response) => {
  const { findTeamByIdController } = makeFindTeamByIdController()

  await findTeamByIdController.handle(req, res)
})

router.get('/type/:type', async (req: Request, res: Response) => {
  const { findTeamByTypeController } = makeFindTeamByTypeController()

  await findTeamByTypeController.handle(req, res)
})

router.post(
  '/',
  (req: Request, res: Response, next: NextFunction) => {
    authMiddleware.isAdmin(req, res, next)
  },
  async (req: Request, res: Response) => {
    const { createTeamController } = makeCreateTeamController()

    await createTeamController.handle(req, res)
  }
)

router.put(
  '/:id',
  (req: Request, res: Response, next: NextFunction) => {
    authMiddleware.isAdmin(req, res, next)
  },
  async (req: Request, res: Response) => {
    const { updateTeamController } = makeUpdateTeamController()

    await updateTeamController.handle(req, res)
  }
)

router.delete(
  '/:id',
  (req: Request, res: Response, next: NextFunction) => {
    authMiddleware.isAdmin(req, res, next)
  },
  async (req: Request, res: Response) => {
    const { deleteTeamController } = makeDeleteTeamController()

    await deleteTeamController.handle(req, res)
  }
)

export { router as teamRoutes }
