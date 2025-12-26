import { type NextFunction, type Request, type Response, Router } from 'express'
import {
  makeCreateFinancialTransactionStatementController,
  makeFindFinancialTransactionStatementByIdController,
  makeFindFinancialTransactionStatementsController,
  makeFindLatestFinancialTransactionStatementController,
  makeUpdateFinancialTransactionStatementController,
} from '../factories/controllers/financial-transaction-statement.factory.ts'
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
    const { createFinancialTransactionStatementController } =
      makeCreateFinancialTransactionStatementController()

    await createFinancialTransactionStatementController.handle(req, res)
  },
)

router.get('/', async (req: Request, res: Response) => {
  const { findFinancialTransactionStatementsController } =
    makeFindFinancialTransactionStatementsController()

  await findFinancialTransactionStatementsController.handle(req, res)
})

router.get('/latest', async (req: Request, res: Response) => {
  const { findLatestFinancialTransactionStatementController } =
    makeFindLatestFinancialTransactionStatementController()

  await findLatestFinancialTransactionStatementController.handle(req, res)
})

router.get('/:id', async (req: Request, res: Response) => {
  const { findFinancialTransactionStatementByIdController } =
    makeFindFinancialTransactionStatementByIdController()

  await findFinancialTransactionStatementByIdController.handle(req, res)
})

router.put(
  '/:id',
  (req: Request, res: Response, next: NextFunction) => {
    authMiddleware.isAdmin(req, res, next)
  },
  upload.single('document'),
  async (req: Request, res: Response) => {
    const { updateFinancialTransactionStatementController } =
      makeUpdateFinancialTransactionStatementController()

    await updateFinancialTransactionStatementController.handle(req, res)
  },
)

export { router as financialTransactionStatementRoutes }
