import { type NextFunction, type Request, type Response, Router } from 'express'
import {
  makeCreatePendencyController,
  makeFindPendenciesController,
  makeFindPendencyByIdController,
} from '../factories/controllers/pendency.factory.ts'
import { makeAuthMiddleware } from '../factories/middlewares/auth-middleware.ts'
import { upload } from '../middlewares/multer.ts'

const router = Router()

const { authMiddleware } = makeAuthMiddleware()

router.post(
  '/:user_id',
  (req: Request, res: Response, next: NextFunction) => {
    authMiddleware.isAdmin(req, res, next)
  },
  upload.single('document'),
  async (req: Request, res: Response) => {
    const { createPendencyController } = makeCreatePendencyController()

    await createPendencyController.handle(req, res)
  }
)

router.get(
  '/',
  (req: Request, res: Response, next: NextFunction) => {
    authMiddleware.isAdmin(req, res, next)
  },
  async (req: Request, res: Response) => {
    const { findPendenciesController } = makeFindPendenciesController()

    await findPendenciesController.handle(req, res)
  }
)

router.get(
  '/:pendency_id',
  (req: Request, res: Response, next: NextFunction) => {
    authMiddleware.isAdmin(req, res, next)
  },
  async (req: Request, res: Response) => {
    const { findPendencyByIdController } = makeFindPendencyByIdController()

    await findPendencyByIdController.handle(req, res)
  }
)

export { router as pendencyRoutes }
