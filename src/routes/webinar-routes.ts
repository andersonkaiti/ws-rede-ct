import { type NextFunction, type Request, type Response, Router } from 'express'
import {
  makeCreateWebinarController,
  makeDeleteWebinarController,
  makeFindWebinarByIdController,
  makeFindWebinarsController,
  makeUpdateWebinarController,
} from '../factories/controllers/webinar.factory.ts'
import { makeAuthMiddleware } from '../factories/middlewares/auth-middleware.ts'
import { upload } from '../middlewares/multer.ts'

const router = Router()

const { authMiddleware } = makeAuthMiddleware()

router.post(
  '/',
  (req: Request, res: Response, next: NextFunction) => {
    authMiddleware.isAdmin(req, res, next)
  },
  upload.single('thumbnail'),
  async (req: Request, res: Response) => {
    const { createWebinarController } = makeCreateWebinarController()

    await createWebinarController.handle(req, res)
  }
)

router.get(
  '/',
  (req: Request, res: Response, next: NextFunction) => {
    authMiddleware.isAdmin(req, res, next)
  },
  async (req: Request, res: Response) => {
    const { findWebinarsController } = makeFindWebinarsController()

    await findWebinarsController.handle(req, res)
  }
)

router.get(
  '/:id',
  (req: Request, res: Response, next: NextFunction) => {
    authMiddleware.isAdmin(req, res, next)
  },
  async (req: Request, res: Response) => {
    const { findWebinarByIdController } = makeFindWebinarByIdController()

    await findWebinarByIdController.handle(req, res)
  }
)

router.put(
  '/:id',
  (req: Request, res: Response, next: NextFunction) => {
    authMiddleware.isAdmin(req, res, next)
  },
  upload.single('thumbnail'),
  async (req: Request, res: Response) => {
    const { updateWebinarController } = makeUpdateWebinarController()

    await updateWebinarController.handle(req, res)
  }
)

router.delete(
  '/:id',
  (req: Request, res: Response, next: NextFunction) => {
    authMiddleware.isAdmin(req, res, next)
  },
  async (req: Request, res: Response) => {
    const { deleteWebinarController } = makeDeleteWebinarController()

    await deleteWebinarController.handle(req, res)
  }
)

export { router as webinarRoutes }
