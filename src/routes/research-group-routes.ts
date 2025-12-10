import { type NextFunction, type Request, type Response, Router } from 'express'
import {
  makeCreateResearchGroupController,
  makeFindResearchGroupByIdController,
  makeFindResearchGroupsController,
} from '../factories/controllers/research-group.factory.ts'
import { makeAuthMiddleware } from '../factories/middlewares/auth-middleware.ts'
import { upload } from '../middlewares/multer.ts'

const router = Router()

const { authMiddleware } = makeAuthMiddleware()

router.post(
  '/',
  (req: Request, res: Response, next: NextFunction) => {
    authMiddleware.isAdmin(req, res, next)
  },
  upload.single('logo'),
  async (req: Request, res: Response) => {
    const { createResearchGroupController } =
      makeCreateResearchGroupController()

    await createResearchGroupController.handle(req, res)
  }
)

router.get(
  '/',
  (req: Request, res: Response, next: NextFunction) => {
    authMiddleware.isAdmin(req, res, next)
  },
  async (req: Request, res: Response) => {
    const { findResearchGroupsController } = makeFindResearchGroupsController()

    await findResearchGroupsController.handle(req, res)
  }
)

router.get(
  '/:id',
  (req: Request, res: Response, next: NextFunction) => {
    authMiddleware.isAdmin(req, res, next)
  },
  async (req: Request, res: Response) => {
    const { findResearchGroupByIdController } =
      makeFindResearchGroupByIdController()

    await findResearchGroupByIdController.handle(req, res)
  }
)

export { router as researchGroupRoutes }
