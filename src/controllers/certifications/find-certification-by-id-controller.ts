import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import type { Request, Response } from 'express'
import z from 'zod'
import { HttpStatus } from '../../@types/status-code.ts'
import type { ICertificationRepository } from '../../repositories/certification/icertification-repository.ts'

extendZodWithOpenApi(z)

export const findCertificationByIdControllerSchema = z.object({
  certificationId: z.uuid(),
})

export class FindCertificationByIdController {
  constructor(
    private readonly certificationRepository: ICertificationRepository
  ) {}

  async handle(req: Request, res: Response) {
    try {
      const parseResult = findCertificationByIdControllerSchema.safeParse({
        certificationId: req.params.certification_id,
      })

      if (!parseResult.success) {
        return res.status(HttpStatus.BAD_REQUEST).json({
          message: z.prettifyError(parseResult.error),
        })
      }

      const certification = await this.certificationRepository.findById(
        parseResult.data.certificationId
      )

      if (!certification) {
        return res.status(HttpStatus.NOT_FOUND).json({
          message: 'Certificado não encontrado.',
        })
      }

      return res.status(HttpStatus.OK).json(certification)
    } catch (err) {
      console.log(err)
      if (err instanceof Error) {
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
          message: err.message,
        })
      }
    }
  }
}
