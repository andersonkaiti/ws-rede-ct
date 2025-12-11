import { type NextFunction, type Request, type Response, Router } from 'express'
import {
  makeCreateRedeCTHighlightController,
  makeDeleteRedeCTHighlightController,
  makeFindRedeCTHighlightByIdController,
  makeFindRedeCTHighlightsController,
  makeUpdateRedeCTHighlightController,
} from '../factories/controllers/redect-highlight.factory.ts'
import { makeAuthMiddleware } from '../factories/middlewares/auth-middleware.ts'
import { upload } from '../middlewares/multer.ts'

const router = Router()

const { authMiddleware } = makeAuthMiddleware()

router.post(
  '/',
  (req: Request, res: Response, next: NextFunction) => {
    authMiddleware.authenticated(req, res, next)
  },
  upload.single('image'),
  async (req: Request, res: Response) => {
    const { createRedeCTHighlightController } =
      makeCreateRedeCTHighlightController()

    await createRedeCTHighlightController.handle(req, res)
  }
)

router.get('/', async (req: Request, res: Response) => {
  const { findRedeCTHighlightsController } =
    makeFindRedeCTHighlightsController()

  await findRedeCTHighlightsController.handle(req, res)
})

router.get('/:id', async (req: Request, res: Response) => {
  const { findRedeCTHighlightByIdController } =
    makeFindRedeCTHighlightByIdController()

  await findRedeCTHighlightByIdController.handle(req, res)
})

router.put(
  '/:id',
  (req: Request, res: Response, next: NextFunction) => {
    authMiddleware.authenticated(req, res, next)
  },
  upload.single('image'),
  async (req: Request, res: Response) => {
    const { updateRedeCTHighlightController } =
      makeUpdateRedeCTHighlightController()

    await updateRedeCTHighlightController.handle(req, res)
  }
)

router.delete(
  '/:id',
  (req: Request, res: Response, next: NextFunction) => {
    authMiddleware.authenticated(req, res, next)
  },
  async (req: Request, res: Response) => {
    const { deleteRedeCTHighlightController } =
      makeDeleteRedeCTHighlightController()

    await deleteRedeCTHighlightController.handle(req, res)
  }
)

export { router as redectHighlightRoutes }
