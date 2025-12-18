import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import type { Request, Response } from 'express'
import z from 'zod'
import { HttpStatus } from '../../@types/status-code.ts'
import { NotFoundError } from '../../errors/not-found-error.ts'
import type { ILawRepository } from '../../repositories/law/ilaw-repository.d.ts'

extendZodWithOpenApi(z)

export const updateLawSchema = z.object({
  id: z.uuid(),
  title: z.string().min(1).optional(),
  link: z.url().optional(),
  country: z.string().min(1).optional(),
})

export class UpdateLawController {
  constructor(private readonly lawRepository: ILawRepository) {}

  async handle(req: Request, res: Response) {
    const { id, title, link, country } = updateLawSchema.parse({
      id: req.params.id,
      ...req.body,
    })

    const existingLaw = await this.lawRepository.findById(id)

    if (!existingLaw) {
      throw new NotFoundError('A lei não existe.')
    }

    await this.lawRepository.update({
      id,
      title,
      link,
      country,
    })

    return res.sendStatus(HttpStatus.OK)
  }
}
