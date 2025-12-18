import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import type { Request, Response } from 'express'
import z from 'zod'
import { HttpStatus } from '../../@types/status-code.ts'
import { NotFoundError } from '../../errors/not-found-error.ts'
import type { IMuseumRepository } from '../../repositories/museum/imuseum-repository.d.ts'

extendZodWithOpenApi(z)

export const findMuseumByIdSchema = z.object({
  id: z.uuid(),
})

export class FindMuseumByIdController {
  constructor(private readonly museumRepository: IMuseumRepository) {}

  async handle(req: Request, res: Response) {
    const { id } = findMuseumByIdSchema.parse({
      id: req.params.id,
    })

    const museum = await this.museumRepository.findById(id)

    if (!museum) {
      throw new NotFoundError('O museu não existe.')
    }

    return res.status(HttpStatus.OK).json(museum)
  }
}
