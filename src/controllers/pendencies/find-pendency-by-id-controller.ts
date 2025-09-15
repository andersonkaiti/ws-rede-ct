import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import type { Request, Response } from 'express'
import z from 'zod'
import { HttpStatus } from '../../@types/status-code.ts'
import type { IPendencyRepository } from '../../repositories/pendency/ipendency-repository.ts'

extendZodWithOpenApi(z)

export const findPendencyByIdControllerSchema = z.object({
  pendencyId: z.uuid(),
})

export class FindPendencyByIdController {
  constructor(private readonly pendencyRepository: IPendencyRepository) {}

  async handle(req: Request, res: Response) {
    try {
      const parseResult = findPendencyByIdControllerSchema.safeParse({
        pendencyId: req.params.pendency_id,
      })

      if (!parseResult.success) {
        return res.status(HttpStatus.BAD_REQUEST).json({
          errors: z.prettifyError(parseResult.error),
        })
      }

      const pendency = await this.pendencyRepository.findById(
        parseResult.data.pendencyId
      )

      if (!pendency) {
        return res.status(HttpStatus.NOT_FOUND).json({
          message: 'Pendência não encontrada.',
        })
      }

      return res.status(HttpStatus.OK).json(pendency)
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
