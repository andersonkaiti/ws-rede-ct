import { type Request, type Response, Router } from 'express'
import {
  makeCreateUserController,
  makeDeleteUserController,
  makeFindAllUsersController,
  makeUpdateUserController,
} from '../factories/controllers/user.factory.ts'

const { createUserController } = makeCreateUserController()
const { updateUserController } = makeUpdateUserController()
const { deleteUserController } = makeDeleteUserController()

const router = Router()

router.post(
  '/api/webhook/created-user',
  async (req: Request, res: Response) => {
    await createUserController.handle(req, res)
  }
)

router.post(
  '/api/webhook/updated-user',
  async (req: Request, res: Response) => {
    await updateUserController.handle(req, res)
  }
)

router.post(
  '/api/webhook/deleted-user',
  async (req: Request, res: Response) => {
    await deleteUserController.handle(req, res)
  }
)

router.get('/', async (req: Request, res: Response) => {
  const { findAllUsersController } = makeFindAllUsersController()

  await findAllUsersController.handle(req, res)
})

export { router as userRoutes }

