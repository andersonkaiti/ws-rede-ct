import { type NextFunction, type Request, type Response, Router } from 'express'
import { makeCreateBookVolumeController } from '../factories/controllers/book-volume.factory.ts'
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

export { router as bookVolumeRoutes }
