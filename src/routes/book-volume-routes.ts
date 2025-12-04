import { type NextFunction, type Request, type Response, Router } from 'express'
import {
  makeCreateBookVolumeController,
  makeFindBookVolumeByIdController,
  makeFindBookVolumesController,
  makeUpdateBookVolumeController,
} from '../factories/controllers/book-volume.factory.ts'
import { makeAuthMiddleware } from '../factories/middlewares/auth-middleware.ts'
import { upload } from '../middlewares/multer.ts'

const router = Router()

const { authMiddleware } = makeAuthMiddleware()

router.post(
  '/',
  (req: Request, res: Response, next: NextFunction) => {
    authMiddleware.isAdmin(req, res, next)
  },
  upload.fields([
    { name: 'authorImage', maxCount: 1 },
    { name: 'coverImage', maxCount: 1 },
    { name: 'catalogSheet', maxCount: 1 },
  ]),
  async (req: Request, res: Response) => {
    const { createBookVolumeController } = makeCreateBookVolumeController()

    await createBookVolumeController.handle(req, res)
  }
)

router.get(
  '/',
  (req: Request, res: Response, next: NextFunction) => {
    authMiddleware.isAdmin(req, res, next)
  },
  async (req: Request, res: Response) => {
    const { findBookVolumesController } = makeFindBookVolumesController()

    await findBookVolumesController.handle(req, res)
  }
)

router.get(
  '/:id',
  (req: Request, res: Response, next: NextFunction) => {
    authMiddleware.isAdmin(req, res, next)
  },
  async (req: Request, res: Response) => {
    const { findBookVolumeByIdController } = makeFindBookVolumeByIdController()

    await findBookVolumeByIdController.handle(req, res)
  }
)

router.put(
  '/:id',
  (req: Request, res: Response, next: NextFunction) => {
    authMiddleware.isAdmin(req, res, next)
  },
  upload.fields([
    { name: 'authorImage', maxCount: 1 },
    { name: 'coverImage', maxCount: 1 },
    { name: 'catalogSheet', maxCount: 1 },
  ]),
  async (req: Request, res: Response) => {
    const { updateBookVolumeController } = makeUpdateBookVolumeController()

    await updateBookVolumeController.handle(req, res)
  }
)

export { router as bookVolumeRoutes }
