import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import type { Request, Response } from 'express'
import z from 'zod'
import { HttpStatus } from '../../@types/status-code.ts'
import { InternalServerError } from '../../errors/internal-server-error.ts'
import { NotFoundError } from '../../errors/not-found-error.ts'
import type { IEventRepository } from '../../repositories/event/ievent-repository.d.ts'

extendZodWithOpenApi(z)

export const findEventByIdSchema = z.object({
  id: z.uuid(),
})

export class FindEventByIdController {
  constructor(private readonly eventRepository: IEventRepository) {}

  async handle(req: Request, res: Response) {
    try {
      const { id } = findEventByIdSchema.parse({
        id: req.params.id,
      })

      const event = await this.eventRepository.findById(id)

      if (!event) {
        throw new NotFoundError('O evento não existe.')
      }

      return res.status(HttpStatus.OK).json(event)
    } catch (err) {
      if (err instanceof Error) {
        throw new InternalServerError(err.message)
      }
    }
  }
}
