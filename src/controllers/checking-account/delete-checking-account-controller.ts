import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import type { Request, Response } from 'express'
import z from 'zod'
import { HttpStatus } from '../../@types/status-code.ts'
import { NotFoundError } from '../../errors/not-found-error.ts'
import type { ICheckingAccountRepository } from '../../repositories/checking-account/ichecking-account-repository.d.ts'

extendZodWithOpenApi(z)

export const deleteCheckingAccountSchema = z.object({
  id: z.uuid(),
})

export class DeleteCheckingAccountController {
  constructor(
    private readonly checkingAccountRepository: ICheckingAccountRepository,
  ) {}

  async handle(req: Request, res: Response) {
    const { id } = deleteCheckingAccountSchema.parse(req.params)

    const existingAccount = await this.checkingAccountRepository.findById(id)

    if (!existingAccount) {
      throw new NotFoundError('Conta corrente não encontrada.')
    }

    await this.checkingAccountRepository.deleteById(id)

    return res.status(HttpStatus.OK).send()
  }
}
