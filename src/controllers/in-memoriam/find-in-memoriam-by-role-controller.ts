import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import type { Request, Response } from 'express'
import z from 'zod'
import { InMemoriamRole } from '../../../config/database/generated/enums.ts'
import { HttpStatus } from '../../@types/status-code.ts'
import { InternalServerError } from '../../errors/internal-server-error.ts'
import type { IInMemoriamRepository } from '../../repositories/in-memoriam/iin-memoriam-repository.js'

extendZodWithOpenApi(z)

export const findInMemoriamByRoleSchema = z.object({
  role: z.enum(InMemoriamRole),
})

export class FindInMemoriamByRoleController {
  constructor(private readonly inMemoriamRepository: IInMemoriamRepository) {}

  async handle(req: Request, res: Response) {
    try {
      const { role } = findInMemoriamByRoleSchema.parse({
        role: req.params.role,
      })

      const inMemoriamList = await this.inMemoriamRepository.findByRole(role)

      return res.status(HttpStatus.OK).json(inMemoriamList)
    } catch (err) {
      if (err instanceof Error) {
        throw new InternalServerError(err.message)
      }
    }
  }
}
