import { type NextFunction, type Request, type Response, Router } from 'express'
import {
  makeCreateCourseController,
  makeDeleteCourseController,
  makeFindCourseByIdController,
  makeFindCoursesController,
  makeUpdateCourseController,
} from '../factories/controllers/course.factory.ts'
import { makeAuthMiddleware } from '../factories/middlewares/auth-middleware.ts'
import { upload } from '../middlewares/multer.ts'

const router: Router = Router()

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
  },
)

router.get('/', async (req: Request, res: Response) => {
  const { findCoursesController } = makeFindCoursesController()

  await findCoursesController.handle(req, res)
})

router.get('/:id', async (req: Request, res: Response) => {
  const { findCourseByIdController } = makeFindCourseByIdController()

  await findCourseByIdController.handle(req, res)
})

router.put(
  '/:id',
  (req: Request, res: Response, next: NextFunction) => {
    authMiddleware.isAdmin(req, res, next)
  },
  upload.single('image'),
  async (req: Request, res: Response) => {
    const { updateCourseController } = makeUpdateCourseController()

    await updateCourseController.handle(req, res)
  },
)

router.delete(
  '/:id',
  (req: Request, res: Response, next: NextFunction) => {
    authMiddleware.isAdmin(req, res, next)
  },
  async (req: Request, res: Response) => {
    const { deleteCourseController } = makeDeleteCourseController()

    await deleteCourseController.handle(req, res)
  },
)

export { router as courseRoutes }
