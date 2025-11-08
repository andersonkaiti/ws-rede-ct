import { type NextFunction, type Request, type Response, Router } from 'express'
import {
  makeCreateRegimentController,
  makeFindRegimentByIdController,
  makeFindRegimentByStatusController,
  makeFindRegimentsController,
} from '../factories/controllers/regiment.factory.ts'
import { makeAuthMiddleware } from '../factories/middlewares/auth-middleware.ts'
import { upload } from '../middlewares/multer.ts'

const router = Router()

const { authMiddleware } = makeAuthMiddleware()

router.post(
  '/',
  (req: Request, res: Response, next: NextFunction) => {
    authMiddleware.authenticated(req, res, next)
  },
  upload.single('document'),
  async (req: Request, res: Response) => {
    const { createRegimentController } = makeCreateRegimentController()

    await createRegimentController.handle(req, res)
  }
)

router.get('/', async (req: Request, res: Response) => {
  const { findRegimentsController } = makeFindRegimentsController()

  await findRegimentsController.handle(req, res)
})

router.get('/:id', async (req: Request, res: Response) => {
  const { findRegimentByIdController } = makeFindRegimentByIdController()

  await findRegimentByIdController.handle(req, res)
})

router.get('/status/:status', async (req: Request, res: Response) => {
  const { findRegimentByStatusController } =
    makeFindRegimentByStatusController()

  await findRegimentByStatusController.handle(req, res)
})

export { router as regimentRoutes }
