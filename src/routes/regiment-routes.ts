import { type NextFunction, type Request, type Response, Router } from 'express'
import { makeCreateRegimentController } from '../factories/controllers/regiment.factory.ts'
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

export { router as regimentRoutes }
