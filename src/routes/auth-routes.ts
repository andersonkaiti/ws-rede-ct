import { type Request, type Response, Router } from 'express'
import {
  makeSignInController,
  makeSignUpController,
} from '../factories/controllers/auth.factory.ts'

const router = Router()

const { signUpController } = makeSignUpController()
const { signInController } = makeSignInController()

router.post('/sign-up', async (req: Request, res: Response) => {
  await signUpController.handle(req, res)
})

router.post('/sign-in', async (req: Request, res: Response) => {
  await signInController.handle(req, res)
})

export { router as authRoutes }
