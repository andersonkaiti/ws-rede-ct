import { type NextFunction, type Request, type Response, Router } from 'express'
import {
  makeCreateRegionalCongressController,
  makeFindRegionalCongressByEditionController,
  makeFindRegionalCongressByIdController,
  makeFindRegionalCongressesController,
} from '../factories/controllers/regional-congress/regional-congress.factory.ts'
import { makeAuthMiddleware } from '../factories/middlewares/auth-middleware.ts'

const router = Router()

const { authMiddleware } = makeAuthMiddleware()

router.post(
  '/',
  (req: Request, res: Response, next: NextFunction) => {
    authMiddleware.authenticated(req, res, next)
  },
  async (req: Request, res: Response) => {
    const { createRegionalCongressController } =
      makeCreateRegionalCongressController()

    await createRegionalCongressController.handle(req, res)
  }
)

router.get('/', async (req: Request, res: Response) => {
  const { findRegionalCongressesController } =
    makeFindRegionalCongressesController()

  await findRegionalCongressesController.handle(req, res)
})

router.get('/:id', async (req: Request, res: Response) => {
  const { findRegionalCongressByIdController } =
    makeFindRegionalCongressByIdController()

  await findRegionalCongressByIdController.handle(req, res)
})

router.get('/edition/:edition', async (req: Request, res: Response) => {
  const { findRegionalCongressByEditionController } =
    makeFindRegionalCongressByEditionController()

  await findRegionalCongressByEditionController.handle(req, res)
})

export { router as regionalCongressRoutes }
