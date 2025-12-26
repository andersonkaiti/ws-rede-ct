import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import type { Request, Response } from 'express'
import z from 'zod'
import { HttpStatus } from '../../@types/status-code.ts'
import { PATHS } from '../../constants/paths.ts'
import type { IFinancialTransactionStatementRepository } from '../../repositories/financial-transaction-statement/ifinancial-transaction-statement-repository.d.ts'
import type { IFirebaseStorageService } from '../../services/firebase-storage/ifirebase-storage.js'

const MAX_DOCUMENT_SIZE_MB = 10
const KILOBYTE = 1024
const MEGABYTE = KILOBYTE * KILOBYTE
const MAX_DOCUMENT_SIZE_BYTES = MAX_DOCUMENT_SIZE_MB * MEGABYTE

extendZodWithOpenApi(z)

export const createFinancialTransactionStatementSchema = z.object({
  document: z.any().refine((value) => {
    if (value === undefined || value === null) {
      return false
    }

    if (typeof value !== 'object' || typeof value.size !== 'number') {
      return false
    }

    return value.size <= MAX_DOCUMENT_SIZE_BYTES
  }, `O documento deve ter no máximo ${MAX_DOCUMENT_SIZE_MB}MB.`),
})

export class CreateFinancialTransactionStatementController {
  constructor(
    private readonly financialTransactionStatementRepository: IFinancialTransactionStatementRepository,
    private readonly firebaseStorageService: IFirebaseStorageService,
  ) {}

  async handle(req: Request, res: Response) {
    const { document } = createFinancialTransactionStatementSchema.parse({
      document: req.file,
    })

    const statement = await this.financialTransactionStatementRepository.create(
      {
        documentUrl: '',
      },
    )

    const documentUrl = await this.firebaseStorageService.uploadFile({
      file: document,
      id: statement.id,
      folder: PATHS.FINANCIAL_TRANSACTION_STATEMENT,
    })

    await this.financialTransactionStatementRepository.update({
      id: statement.id,
      documentUrl,
    })

    return res.sendStatus(HttpStatus.CREATED)
  }
}
