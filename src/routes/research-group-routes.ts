import { type NextFunction, type Request, type Response, Router } from 'express'
import {
  makeCreateResearchGroupController,
  makeDeleteResearchGroupController,
  makeFindResearchGroupByIdController,
  makeFindResearchGroupsController,
  makeUpdateResearchGroupController,
} from '../factories/controllers/research-group.factory.ts'
import { makeAuthMiddleware } from '../factories/middlewares/auth-middleware.ts'
import { upload } from '../middlewares/multer.ts'

const router: Router = Router()

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
  },
)

router.get('/', async (req: Request, res: Response) => {
  const { findResearchGroupsController } = makeFindResearchGroupsController()

  await findResearchGroupsController.handle(req, res)
})

router.get('/:id', async (req: Request, res: Response) => {
  const { findResearchGroupByIdController } =
    makeFindResearchGroupByIdController()

  await findResearchGroupByIdController.handle(req, res)
})

router.put(
  '/:id',
  (req: Request, res: Response, next: NextFunction) => {
    authMiddleware.isAdmin(req, res, next)
  },
  upload.single('logo'),
  async (req: Request, res: Response) => {
    const { updateResearchGroupController } =
      makeUpdateResearchGroupController()

    await updateResearchGroupController.handle(req, res)
  },
)

router.delete(
  '/:id',
  (req: Request, res: Response, next: NextFunction) => {
    authMiddleware.isAdmin(req, res, next)
  },
  async (req: Request, res: Response) => {
    const { deleteResearchGroupController } =
      makeDeleteResearchGroupController()

    await deleteResearchGroupController.handle(req, res)
  },
)

export { router as researchGroupRoutes }
