import { type NextFunction, type Request, type Response, Router } from 'express'
import { makeCreateCourseController } from '../factories/controllers/course.factory.ts'
import { makeAuthMiddleware } from '../factories/middlewares/auth-middleware.ts'
import { upload } from '../middlewares/multer.ts'

const router = Router()

const { authMiddleware } = makeAuthMiddleware()

router.post(
  '/',
  (req: Request, res: Response, next: NextFunction) => {
    authMiddleware.isAdmin(req, res, next)
  },
  upload.single('image'),
  async (req: Request, res: Response) => {
    const { createCourseController } = makeCreateCourseController()

    await createCourseController.handle(req, res)
  }
)

export { router as courseRoutes }
