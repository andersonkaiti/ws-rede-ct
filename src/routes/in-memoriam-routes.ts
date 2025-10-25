import { type NextFunction, type Request, type Response, Router } from 'express'
import { makeCreateInMemoriamController } from '../factories/controllers/in-memoriam.factory.ts'
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

export { router as inMemoriamRoutes }
