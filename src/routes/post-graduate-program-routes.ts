import { type NextFunction, type Request, type Response, Router } from 'express'
import {
  makeCreatePostGraduateProgramController,
  makeFindPostGraduateProgramsController,
} from '../factories/controllers/post-graduate-program.factory.ts'
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
    const { createPostGraduateProgramController } =
      makeCreatePostGraduateProgramController()

    await createPostGraduateProgramController.handle(req, res)
  }
)

router.get(
  '/',
  (req: Request, res: Response, next: NextFunction) => {
    authMiddleware.isAdmin(req, res, next)
  },
  async (req: Request, res: Response) => {
    const { findPostGraduateProgramsController } =
      makeFindPostGraduateProgramsController()

    await findPostGraduateProgramsController.handle(req, res)
  }
)

export { router as postGraduateProgramRoutes }
