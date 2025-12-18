import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import type { Request, Response } from 'express'
import z from 'zod'
import { HttpStatus } from '../../@types/status-code.ts'
import { NotFoundError } from '../../errors/not-found-error.ts'
import { UnauthorizedError } from '../../errors/unauthorized-error.ts'
import type { INewsRepository } from '../../repositories/news/inews-repository.d.ts'
import type { IFirebaseStorageService } from '../../services/firebase-storage/ifirebase-storage.ts'

extendZodWithOpenApi(z)

export const deleteNewsSchema = z.object({
  id: z.string(),
})

export class DeleteNewsController {
  constructor(
    private readonly newsRepository: INewsRepository,
    private readonly firebaseStorageService: IFirebaseStorageService,
  ) {}

  async handle(req: Request, res: Response) {
    const { id } = deleteNewsSchema.parse(req.params)

    const authenticatedUserId = req.user.id

    const news = await this.newsRepository.findById(id)

    if (!news) {
      throw new NotFoundError('Notícia não encontrada.')
    }

    if (news.author.id !== authenticatedUserId) {
      throw new UnauthorizedError('Sem permissão.')
    }

    await Promise.all([
      this.newsRepository.delete(id),
      this.firebaseStorageService.deleteFile({
        fileUrl: news.imageUrl as string,
      }),
    ])

    res.sendStatus(HttpStatus.OK)
  }
}
