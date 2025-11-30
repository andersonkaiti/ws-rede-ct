import { type NextFunction, type Request, type Response, Router } from 'express'
import {
  makeCreateCourseController,
  makeFindCourseByIdController,
  makeFindCoursesController,
} from '../factories/controllers/course.factory.ts'
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

router.get(
  '/',
  (req: Request, res: Response, next: NextFunction) => {
    authMiddleware.isAdmin(req, res, next)
  },
  async (req: Request, res: Response) => {
    const { findCoursesController } = makeFindCoursesController()

    await findCoursesController.handle(req, res)
  }
)

router.get(
  '/:id',
  (req: Request, res: Response, next: NextFunction) => {
    authMiddleware.isAdmin(req, res, next)
  },
  async (req: Request, res: Response) => {
    const { findCourseByIdController } = makeFindCourseByIdController()

    await findCourseByIdController.handle(req, res)
  }
)

export { router as courseRoutes }
