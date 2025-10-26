import { type NextFunction, type Request, type Response, Router } from 'express'
import {
  makeCreateETPController,
  makeDeleteETPController,
  makeFindETPByIdController,
  makeFindETPsController,
  makeUpdateETPController,
} from '../factories/controllers/etp.factory.ts'
import { makeAuthMiddleware } from '../factories/middlewares/auth-middleware.ts'

const router = Router()

const { authMiddleware } = makeAuthMiddleware()

router.post(
  '/',
  (req: Request, res: Response, next: NextFunction) => {
    authMiddleware.authenticated(req, res, next)
  },
  async (req: Request, res: Response) => {
    const { createETPController } = makeCreateETPController()

    await createETPController.handle(req, res)
  }
)

router.get('/', async (req: Request, res: Response) => {
  const { findETPsController } = makeFindETPsController()

  await findETPsController.handle(req, res)
})

router.get('/:id', async (req: Request, res: Response) => {
  const { findETPByIdController } = makeFindETPByIdController()

  await findETPByIdController.handle(req, res)
})

router.put(
  '/:id',
  (req: Request, res: Response, next: NextFunction) => {
    authMiddleware.authenticated(req, res, next)
  },
  async (req: Request, res: Response) => {
    const { updateETPController } = makeUpdateETPController()

    await updateETPController.handle(req, res)
  }
)

router.delete(
  '/:id',
  (req: Request, res: Response, next: NextFunction) => {
    authMiddleware.authenticated(req, res, next)
  },
  async (req: Request, res: Response) => {
    const { deleteETPController } = makeDeleteETPController()

    await deleteETPController.handle(req, res)
  }
)

export { router as etpRoutes }
