import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import type { Request, Response } from 'express'
import z from 'zod'
import { HttpStatus } from '../../@types/status-code.ts'
import type { IFinancialTransactionStatementRepository } from '../../repositories/financial-transaction-statement/ifinancial-transaction-statement-repository.d.ts'

extendZodWithOpenApi(z)

export class FindLatestFinancialTransactionStatementController {
  constructor(
    private readonly financialTransactionStatementRepository: IFinancialTransactionStatementRepository,
  ) {}

  async handle(_req: Request, res: Response) {
    const statements = await this.financialTransactionStatementRepository.find({
      pagination: {
        offset: 0,
        limit: 1,
      },
      filter: {
        orderBy: 'desc',
      },
    })

    const latestStatement = statements?.[0] ?? null

    return res.status(HttpStatus.OK).json(latestStatement)
  }
}
