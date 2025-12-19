import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import type { Request, Response } from 'express'
import z from 'zod'
import { HttpStatus } from '../../@types/status-code.ts'
import type { ILawRepository } from '../../repositories/law/ilaw-repository.d.ts'

extendZodWithOpenApi(z)

export const createLawSchema = z.object({
  title: z.string().min(1),
  link: z.url(),
  country: z.string().min(1),
})

export class CreateLawController {
  constructor(private readonly lawRepository: ILawRepository) {}

  async handle(req: Request, res: Response) {
    const { title, link, country } = createLawSchema.parse(req.body)

    await this.lawRepository.create({
      title,
      link,
      country,
    })

    return res.sendStatus(HttpStatus.CREATED)
  }
}
