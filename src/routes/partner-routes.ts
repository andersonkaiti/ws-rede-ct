import { type NextFunction, type Request, type Response, Router } from 'express'
import { makeCreatePartnerController } from '../factories/controllers/partner.factory.ts'
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
    const { createPartnerController } = makeCreatePartnerController()

    await createPartnerController.handle(req, res)
  }
)

export { router as partnerRoutes }
