import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import type { Request, Response } from 'express'
import z from 'zod'
import { HttpStatus } from '../../@types/status-code.ts'
import { InternalServerError } from '../../errors/internal-server-error.ts'
import { NotFoundError } from '../../errors/not-found-error.ts'
import type { IBookVolumeRepository } from '../../repositories/book-volume/ibook-volume-repository.ts'

extendZodWithOpenApi(z)

export const findBookVolumeByIdSchema = z.object({
  id: z.uuid(),
})

export class FindBookVolumeByIdController {
  constructor(private readonly bookVolumeRepository: IBookVolumeRepository) {}

  async handle(req: Request, res: Response) {
    try {
      const { id } = findBookVolumeByIdSchema.parse({
        id: req.params.id,
      })

      const bookVolume = await this.bookVolumeRepository.findById(id)

      if (!bookVolume) {
        throw new NotFoundError('Volume de livro não encontrado.')
      }

      return res.status(HttpStatus.OK).json(bookVolume)
    } catch (err) {
      if (err instanceof Error) {
        throw new InternalServerError(err.message)
      }
    }
  }
}
