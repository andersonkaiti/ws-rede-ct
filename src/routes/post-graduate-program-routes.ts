import { type NextFunction, type Request, type Response, Router } from 'express'
import {
  makeCreatePostGraduateProgramController,
  makeDeletePostGraduateProgramController,
  makeFindPostGraduateProgramByIdController,
  makeFindPostGraduateProgramsController,
  makeUpdatePostGraduateProgramController,
} from '../factories/controllers/post-graduate-program.factory.ts'
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
    const { createPostGraduateProgramController } =
      makeCreatePostGraduateProgramController()

    await createPostGraduateProgramController.handle(req, res)
  },
)

router.get('/', async (req: Request, res: Response) => {
  const { findPostGraduateProgramsController } =
    makeFindPostGraduateProgramsController()

  await findPostGraduateProgramsController.handle(req, res)
})

router.get('/:id', async (req: Request, res: Response) => {
  const { findPostGraduateProgramByIdController } =
    makeFindPostGraduateProgramByIdController()

  await findPostGraduateProgramByIdController.handle(req, res)
})

router.put(
  '/:id',
  (req: Request, res: Response, next: NextFunction) => {
    authMiddleware.isAdmin(req, res, next)
  },
  upload.single('image'),
  async (req: Request, res: Response) => {
    const { updatePostGraduateProgramController } =
      makeUpdatePostGraduateProgramController()

    await updatePostGraduateProgramController.handle(req, res)
  },
)

router.delete(
  '/:id',
  (req: Request, res: Response, next: NextFunction) => {
    authMiddleware.isAdmin(req, res, next)
  },
  async (req: Request, res: Response) => {
    const { deletePostGraduateProgramController } =
      makeDeletePostGraduateProgramController()

    await deletePostGraduateProgramController.handle(req, res)
  },
)

export { router as postGraduateProgramRoutes }
