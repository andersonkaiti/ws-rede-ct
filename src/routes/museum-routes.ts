import { type NextFunction, type Request, type Response, Router } from 'express'
import {
  makeCreateMuseumController,
  makeFindMuseumByIdController,
  makeFindMuseumsController,
} from '../factories/controllers/museum.factory.ts'
import { makeAuthMiddleware } from '../factories/middlewares/auth-middleware.ts'
import { upload } from '../middlewares/multer.ts'

const router = Router()

const { authMiddleware } = makeAuthMiddleware()

router.post(
  '/',
  (req: Request, res: Response, next: NextFunction) => {
    authMiddleware.authenticated(req, res, next)
  },
  upload.single('logo'),
  async (req: Request, res: Response) => {
    const { createMuseumController } = makeCreateMuseumController()

    await createMuseumController.handle(req, res)
  }
)

router.get('/', async (req: Request, res: Response) => {
  const { findMuseumsController } = makeFindMuseumsController()

  await findMuseumsController.handle(req, res)
})

router.get('/:id', async (req: Request, res: Response) => {
  const { findMuseumByIdController } = makeFindMuseumByIdController()

  await findMuseumByIdController.handle(req, res)
})

export { router as museumRoutes }
