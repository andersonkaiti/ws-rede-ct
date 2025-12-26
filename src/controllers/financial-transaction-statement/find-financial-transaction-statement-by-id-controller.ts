import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import type { Request, Response } from 'express'
import z from 'zod'
import { HttpStatus } from '../../@types/status-code.ts'
import { NotFoundError } from '../../errors/not-found-error.ts'
import type { IFinancialTransactionStatementRepository } from '../../repositories/financial-transaction-statement/ifinancial-transaction-statement-repository.d.ts'

extendZodWithOpenApi(z)

export const findFinancialTransactionStatementByIdSchema = z.object({
  id: z.uuid(),
})

export class FindFinancialTransactionStatementByIdController {
  constructor(
    private readonly financialTransactionStatementRepository: IFinancialTransactionStatementRepository,
  ) {}

  async handle(req: Request, res: Response) {
    const { id } = findFinancialTransactionStatementByIdSchema.parse({
      id: req.params.id,
    })

    const statement =
      await this.financialTransactionStatementRepository.findById(id)

    if (!statement) {
      throw new NotFoundError('O extrato de transação financeira não existe.')
    }

    return res.status(HttpStatus.OK).json(statement)
  }
}
