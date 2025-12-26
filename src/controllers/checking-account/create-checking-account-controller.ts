import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import type { Request, Response } from 'express'
import z from 'zod'
import { HttpStatus } from '../../@types/status-code.ts'
import type { ICheckingAccountRepository } from '../../repositories/checking-account/ichecking-account-repository.d.ts'

extendZodWithOpenApi(z)

export const createCheckingAccountSchema = z.object({
  type: z.enum(['EXCLUSIVE_REDECT_USE', 'EVENTS', 'COLLOQUIUM']),
  balance: z.number().positive('O saldo deve ser positivo'),
})

export class CreateCheckingAccountController {
  constructor(
    private readonly checkingAccountRepository: ICheckingAccountRepository,
  ) {}

  async handle(req: Request, res: Response) {
    const { type, balance } = createCheckingAccountSchema.parse(req.body)

    const balanceInCents = balance * 100

    const account = await this.checkingAccountRepository.create({
      type,
      balanceInCents,
    })

    return res.status(HttpStatus.CREATED).json({
      ...account,
      balance: account.balanceInCents / 100,
    })
  }
}
