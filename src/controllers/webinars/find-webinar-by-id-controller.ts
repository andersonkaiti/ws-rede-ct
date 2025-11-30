import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import type { Request, Response } from 'express'
import z from 'zod'
import { HttpStatus } from '../../@types/status-code.ts'
import { InternalServerError } from '../../errrors/internal-server-error.ts'
import { NotFoundError } from '../../errrors/not-found-error.ts'
import type { IWebinarRepository } from '../../repositories/webinar/iwebinar-repository.ts'

extendZodWithOpenApi(z)

export const findWebinarByIdSchema = z.object({
  id: z.uuid(),
})

export class FindWebinarByIdController {
  constructor(private readonly webinarRepository: IWebinarRepository) {}

  async handle(req: Request, res: Response) {
    try {
      const { id } = findWebinarByIdSchema.parse({
        id: req.params.id,
      })

      const webinar = await this.webinarRepository.findById(id)

      if (!webinar) {
        throw new NotFoundError('Webinar não encontrado.')
      }

      return res.status(HttpStatus.OK).json(webinar)
    } catch (err) {
      if (err instanceof Error) {
        throw new InternalServerError(err.message)
      }
    }
  }
}
