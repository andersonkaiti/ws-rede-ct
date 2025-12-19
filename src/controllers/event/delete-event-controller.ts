import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import type { Request, Response } from 'express'
import z from 'zod'
import { HttpStatus } from '../../@types/status-code.ts'
import { NotFoundError } from '../../errors/not-found-error.ts'
import type { IEventRepository } from '../../repositories/event/ievent-repository.d.ts'

extendZodWithOpenApi(z)

export const deleteEventSchema = z.object({
  id: z.uuid(),
})

export class DeleteEventController {
  constructor(private readonly eventRepository: IEventRepository) {}

  async handle(req: Request, res: Response) {
    const { id } = deleteEventSchema.parse({
      id: req.params.id,
    })

    const existingEvent = await this.eventRepository.findById(id)

    if (!existingEvent) {
      throw new NotFoundError('O evento não existe.')
    }

    await this.eventRepository.deleteById(id)

    return res.sendStatus(HttpStatus.OK)
  }
}
