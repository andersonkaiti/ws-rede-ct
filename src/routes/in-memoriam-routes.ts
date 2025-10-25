import { type NextFunction, type Request, type Response, Router } from 'express'
import {
  makeCreateInMemoriamController,
  makeDeleteInMemoriamController,
  makeFindInMemoriamByIdController,
  makeFindInMemoriamController,
  makeUpdateInMemoriamController,
} from '../factories/controllers/in-memoriam.factory.ts'
import { makeAuthMiddleware } from '../factories/middlewares/auth-middleware.ts'
import { upload } from '../middlewares/multer.ts'

const router = Router()

const { authMiddleware } = makeAuthMiddleware()

router.post(
  '/',
  (req: Request, res: Response, next: NextFunction) => {
    authMiddleware.authenticated(req, res, next)
  },
  upload.single('photo'),
  async (req: Request, res: Response) => {
    const { createInMemoriamController } = makeCreateInMemoriamController()

    await createInMemoriamController.handle(req, res)
  }
)

router.get('/', async (req: Request, res: Response) => {
  const { findInMemoriamsController } = makeFindInMemoriamController()

  await findInMemoriamsController.handle(req, res)
})

router.get('/:id', async (req: Request, res: Response) => {
  const { findInMemoriamByIdController } = makeFindInMemoriamByIdController()

  await findInMemoriamByIdController.handle(req, res)
})

router.put(
  '/:id',
  (req: Request, res: Response, next: NextFunction) => {
    authMiddleware.authenticated(req, res, next)
  },
  upload.single('photo'),
  async (req: Request, res: Response) => {
    const { updateInMemoriamController } = makeUpdateInMemoriamController()

    await updateInMemoriamController.handle(req, res)
  }
)

router.delete(
  '/:id',
  (req: Request, res: Response, next: NextFunction) => {
    authMiddleware.authenticated(req, res, next)
  },
  async (req: Request, res: Response) => {
    const { deleteInMemoriamController } = makeDeleteInMemoriamController()

    await deleteInMemoriamController.handle(req, res)
  }
)

export { router as inMemoriamRoutes }
