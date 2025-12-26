import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import type { Request, Response } from 'express'
import z from 'zod'
import { HttpStatus } from '../../@types/status-code.ts'
import type { ICheckingAccountRepository } from '../../repositories/checking-account/ichecking-account-repository.d.ts'

extendZodWithOpenApi(z)

export const findLatestByTypeSchema = z.object({
  type: z.enum(['EXCLUSIVE_REDECT_USE', 'EVENTS', 'COLLOQUIUM']),
})

export class FindLatestByTypeController {
  constructor(
    private readonly checkingAccountRepository: ICheckingAccountRepository,
  ) {}

  async handle(req: Request, res: Response) {
    const { type } = findLatestByTypeSchema.parse(req.params)

    const account = await this.checkingAccountRepository.findLatestByType(type)

    if (!account) {
      return res.status(HttpStatus.OK).json(null)
    }

    return res.status(HttpStatus.OK).json({
      ...account,
      balance: account.balanceInCents / 100,
    })
  }
}
