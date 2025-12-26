import { type NextFunction, type Request, type Response, Router } from 'express'
import {
  makeCreateCheckingAccountController,
  makeFindCheckingAccountByIdController,
  makeFindCheckingAccountsController,
  makeFindLatestByTypeController,
  makeGetTotalBalanceController,
  makeUpdateCheckingAccountController,
} from '../factories/controllers/checking-account.factory.ts'
import { makeAuthMiddleware } from '../factories/middlewares/auth-middleware.ts'

const router: Router = Router()

const { authMiddleware } = makeAuthMiddleware()

router.post(
  '/',
  (req: Request, res: Response, next: NextFunction) => {
    authMiddleware.isAdmin(req, res, next)
  },
  async (req: Request, res: Response) => {
    const { createCheckingAccountController } =
      makeCreateCheckingAccountController()

    await createCheckingAccountController.handle(req, res)
  },
)

router.get('/', async (req: Request, res: Response) => {
  const { findCheckingAccountsController } =
    makeFindCheckingAccountsController()

  await findCheckingAccountsController.handle(req, res)
})

router.get('/total-balance', async (req: Request, res: Response) => {
  const { getTotalBalanceController } = makeGetTotalBalanceController()

  await getTotalBalanceController.handle(req, res)
})

router.get('/latest/:type', async (req: Request, res: Response) => {
  const { findLatestByTypeController } = makeFindLatestByTypeController()

  await findLatestByTypeController.handle(req, res)
})

router.get('/:id', async (req: Request, res: Response) => {
  const { findCheckingAccountByIdController } =
    makeFindCheckingAccountByIdController()

  await findCheckingAccountByIdController.handle(req, res)
})

router.put(
  '/:id',
  (req: Request, res: Response, next: NextFunction) => {
    authMiddleware.isAdmin(req, res, next)
  },
  async (req: Request, res: Response) => {
    const { updateCheckingAccountController } =
      makeUpdateCheckingAccountController()

    await updateCheckingAccountController.handle(req, res)
  },
)

export { router as checkingAccountRoutes }
