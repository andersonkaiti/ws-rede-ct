import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import type { Request, Response } from 'express'
import z from 'zod'
import { HttpStatus } from '../../@types/status-code.ts'
import { PATHS } from '../../constants/paths.ts'
import { NotFoundError } from '../../errors/not-found-error.ts'
import type { IFinancialTransactionStatementRepository } from '../../repositories/financial-transaction-statement/ifinancial-transaction-statement-repository.d.ts'
import type { IFirebaseStorageService } from '../../services/firebase-storage/ifirebase-storage.js'

const MAX_DOCUMENT_SIZE_MB = 10
const KILOBYTE = 1024
const MEGABYTE = KILOBYTE * KILOBYTE
const MAX_DOCUMENT_SIZE_BYTES = MAX_DOCUMENT_SIZE_MB * MEGABYTE

extendZodWithOpenApi(z)

export const updateFinancialTransactionStatementSchema = z.object({
  id: z.uuid(),
  document: z
    .any()
    .refine((value) => {
      if (value === undefined || value === null) {
        return true
      }

      if (typeof value !== 'object' || typeof value.size !== 'number') {
        return false
      }

      return value.size <= MAX_DOCUMENT_SIZE_BYTES
    }, `O documento deve ter no máximo ${MAX_DOCUMENT_SIZE_MB}MB.`)
    .optional(),
})

export class UpdateFinancialTransactionStatementController {
  constructor(
    private readonly financialTransactionStatementRepository: IFinancialTransactionStatementRepository,
    private readonly firebaseStorageService: IFirebaseStorageService,
  ) {}

  async handle(req: Request, res: Response) {
    const { id, document } = updateFinancialTransactionStatementSchema.parse({
      id: req.params.id,
      document: req.file,
    })

    const existingStatement =
      await this.financialTransactionStatementRepository.findById(id)

    if (!existingStatement) {
      throw new NotFoundError('O extrato de transação financeira não existe.')
    }

    let documentUrl = existingStatement.documentUrl

    if (document) {
      if (existingStatement.documentUrl) {
        await this.firebaseStorageService.deleteFile({
          fileUrl: existingStatement.documentUrl,
        })
      }

      documentUrl = await this.firebaseStorageService.uploadFile({
        file: document,
        id,
        folder: PATHS.FINANCIAL_TRANSACTION_STATEMENT,
      })
    }

    await this.financialTransactionStatementRepository.update({
      id,
      documentUrl: documentUrl ?? undefined,
    })

    return res.sendStatus(HttpStatus.OK)
  }
}
