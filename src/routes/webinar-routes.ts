import { type NextFunction, type Request, type Response, Router } from 'express'
import { makeCreateWebinarController } from '../factories/controllers/webinar.factory.ts'
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

export { router as webinarRoutes }
