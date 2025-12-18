import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import type { Request, Response } from 'express'
import z from 'zod'
import { HttpStatus } from '../../@types/status-code.ts'
import { NotFoundError } from '../../errors/not-found-error.ts'
import type { ICertificationRepository } from '../../repositories/certification/icertification-repository.ts'

extendZodWithOpenApi(z)

export const findCertificationByIdControllerSchema = z.object({
  id: z.uuid(),
})

export class FindCertificationByIdController {
  constructor(
    private readonly certificationRepository: ICertificationRepository,
  ) {}

  async handle(req: Request, res: Response) {
    const { id } = findCertificationByIdControllerSchema.parse(req.params)

    const certification = await this.certificationRepository.findById(id)

    if (!certification) {
      throw new NotFoundError('Certificado não encontrado.')
    }

    return res.status(HttpStatus.OK).json(certification)
  }
}
