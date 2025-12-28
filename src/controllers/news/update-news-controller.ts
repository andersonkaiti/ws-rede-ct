import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import type { Request, Response } from 'express'
import z from 'zod'
import { HttpStatus } from '../../@types/status-code.ts'
import { PATHS } from '../../constants/paths.ts'
import { NotFoundError } from '../../errors/not-found-error.ts'
import { UnauthorizedError } from '../../errors/unauthorized-error.ts'
import type { INewsRepository } from '../../repositories/news/inews-repository.d.ts'
import type { IFirebaseStorageService } from '../../services/firebase-storage/ifirebase-storage.ts'
import { validateImageFile } from '../../utils/validate-file.ts'

extendZodWithOpenApi(z)

const updateNewsSchema = z.object({
  id: z.string(),
  title: z.string().min(1),
  content: z.string().min(1),
  image: z
    .any()
    .refine((file) =>
      validateImageFile({
        file,
        optional: true,
      }),
    )
    .optional(),
})

export class UpdateNewsController {
  constructor(
    private readonly newsRepository: INewsRepository,
    private readonly firebaseStorageService: IFirebaseStorageService,
  ) {}

  async handle(req: Request, res: Response) {
    const { id, title, content, image } = updateNewsSchema.parse({
      id: req.params.id,
      image: req.file,
      ...req.body,
    })

    const news = await this.newsRepository.findById(id)

    if (!news) {
      throw new NotFoundError('Notícia não encontrada.')
    }

    const authenticatedUserId = req.user.id

    if (news.author.id !== authenticatedUserId) {
      throw new UnauthorizedError('Sem permissão.')
    }

    let imageUrl = news.imageUrl || ''

    if (image && news.imageUrl) {
      imageUrl = await this.firebaseStorageService.updateFile({
        file: image,
        folder: PATHS.NEWS,
        id,
        fileUrl: news.imageUrl,
      })
    }

    const updatedNews = await this.newsRepository.update({
      id,
      title,
      content,
      imageUrl,
    })

    res.status(HttpStatus.OK).json(updatedNews)
  }
}
