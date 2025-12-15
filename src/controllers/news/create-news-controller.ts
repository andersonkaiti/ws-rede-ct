import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import type { Request, Response } from 'express'
import z from 'zod'
import { File } from '../../@types/file.ts'
import { HttpStatus } from '../../@types/status-code.ts'
import { InternalServerError } from '../../errrors/internal-server-error.ts'
import type { INewsRepository } from '../../repositories/news/inews-repository.d.ts'
import type { IFirebaseStorageService } from '../../services/firebase-storage/ifirebase-storage.ts'

const MAX_IMAGE_SIZE_MB = 5
const KILOBYTE = 1024
const MEGABYTE = KILOBYTE * KILOBYTE

const MAX_IMAGE_SIZE_BYTES = MAX_IMAGE_SIZE_MB * MEGABYTE

extendZodWithOpenApi(z)

export const createNewsSchema = z.object({
  title: z.string().min(1),
  content: z.string().min(1),
  image: z
    .any()
    .refine(
      (file) =>
        !file ||
        (typeof file === 'object' &&
          typeof file.mimetype === 'string' &&
          file.mimetype.startsWith('image/') &&
          typeof file.size === 'number' &&
          file.size <= MAX_IMAGE_SIZE_BYTES),
      {
        message: 'A imagem deve ser uma imagem válida de no máximo 5MB.',
      },
    ),
})

export class CreateNewsController {
  constructor(
    private readonly newsRepository: INewsRepository,
    private readonly firebaseStorageService: IFirebaseStorageService,
  ) {}

  async handle(req: Request, res: Response) {
    try {
      const { title, content, image } = createNewsSchema.parse({
        ...req.body,
        image: req.file,
      })

      const authenticatedUserId = req.user.id

      const imageUrl = await this.firebaseStorageService.uploadFile({
        file: image,
        folder: File.NEWS,
        id: authenticatedUserId,
      })

      await this.newsRepository.create({
        title,
        content,
        authorId: authenticatedUserId,
        imageUrl,
      })

      res.sendStatus(HttpStatus.CREATED)
    } catch (error) {
      if (error instanceof Error) {
        throw new InternalServerError(error.message)
      }
    }
  }
}
