import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import type { Request, Response } from 'express'
import z from 'zod'
import { HttpStatus } from '../../@types/status-code.ts'
import { PATHS } from '../../constants/paths.ts'
import type { INewsRepository } from '../../repositories/news/inews-repository.d.ts'
import type { IFirebaseStorageService } from '../../services/firebase-storage/ifirebase-storage.ts'
import { validateImageFile } from '../../utils/validate-file.ts'

extendZodWithOpenApi(z)

export const createNewsSchema = z.object({
  title: z.string().min(1),
  content: z.string().min(1),
  image: z.any().refine((file) =>
    validateImageFile({
      file,
    }),
  ),
})

export class CreateNewsController {
  constructor(
    private readonly newsRepository: INewsRepository,
    private readonly firebaseStorageService: IFirebaseStorageService,
  ) {}

  async handle(req: Request, res: Response) {
    const { title, content, image } = createNewsSchema.parse({
      ...req.body,
      image: req.file,
    })

    const authenticatedUserId = req.user.id

    const imageUrl = await this.firebaseStorageService.uploadFile({
      file: image,
      folder: PATHS.NEWS,
      id: authenticatedUserId,
    })

    await this.newsRepository.create({
      title,
      content,
      authorId: authenticatedUserId,
      imageUrl,
    })

    res.sendStatus(HttpStatus.CREATED)
  }
}
