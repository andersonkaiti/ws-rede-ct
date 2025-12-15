import { type NextFunction, type Request, type Response, Router } from 'express'
import {
  makeCreateRegimentController,
  makeDeleteRegimentController,
  makeFindRegimentByIdController,
  makeFindRegimentByStatusController,
  makeFindRegimentsController,
  makeUpdateRegimentController,
} from '../factories/controllers/regiment.factory.ts'
import { makeAuthMiddleware } from '../factories/middlewares/auth-middleware.ts'
import { upload } from '../middlewares/multer.ts'

const router: Router = Router()

const { authMiddleware } = makeAuthMiddleware()

router.post(
  '/',
  (req: Request, res: Response, next: NextFunction) => {
    authMiddleware.isAdmin(req, res, next)
  },
  upload.single('document'),
  async (req: Request, res: Response) => {
    const { createRegimentController } = makeCreateRegimentController()

    await createRegimentController.handle(req, res)
  },
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

router.put(
  '/:id',
  (req: Request, res: Response, next: NextFunction) => {
    authMiddleware.isAdmin(req, res, next)
  },
  upload.single('document'),
  async (req: Request, res: Response) => {
    const { updateRegimentController } = makeUpdateRegimentController()

    await updateRegimentController.handle(req, res)
  },
)

router.delete(
  '/:id',
  (req: Request, res: Response, next: NextFunction) => {
    authMiddleware.isAdmin(req, res, next)
  },
  async (req: Request, res: Response) => {
    const { deleteRegimentController } = makeDeleteRegimentController()

    await deleteRegimentController.handle(req, res)
  },
)

export { router as regimentRoutes }
