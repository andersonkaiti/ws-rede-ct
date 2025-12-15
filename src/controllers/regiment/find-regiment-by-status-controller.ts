import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import type { Request, Response } from 'express'
import z from 'zod'
import { RegimentStatus } from '../../../config/database/generated/enums.ts'
import { HttpStatus } from '../../@types/status-code.ts'
import { InternalServerError } from '../../errors/internal-server-error.ts'
import type { IRegimentRepository } from '../../repositories/regiment/iregiment-repository.d.ts'

extendZodWithOpenApi(z)

export const findRegimentByStatusSchema = z.object({
  status: z.enum(RegimentStatus),
})

export class FindRegimentByStatusController {
  constructor(private readonly regimentRepository: IRegimentRepository) {}

  async handle(req: Request, res: Response) {
    try {
      const { status } = findRegimentByStatusSchema.parse({
        status: req.params.status,
      })

      const regiments = await this.regimentRepository.findByStatus(status)

      return res.status(HttpStatus.OK).json(regiments)
    } catch (err) {
      if (err instanceof Error) {
        throw new InternalServerError(err.message)
      }
    }
  }
}
