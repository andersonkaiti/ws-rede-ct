import type { Request, Response } from 'express'
import z from 'zod'
import { File } from '../../@types/file.ts'
import { HttpStatus } from '../../@types/status-code.ts'
import type { INewsRepository } from '../../repositories/news/inews-repository.d.ts'
import type { IFirebaseStorageService } from '../../services/firebase-storage/ifirebase-storage.ts'

const MAX_IMAGE_SIZE_MB = 5
const KILOBYTE = 1024
const MEGABYTE = KILOBYTE * KILOBYTE

const MAX_IMAGE_SIZE_BYTES = MAX_IMAGE_SIZE_MB * MEGABYTE

const createNewsSchema = z.object({
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
      }
    ),
})

export class CreateNewsController {
  constructor(
    private readonly newsRepository: INewsRepository,
    private readonly firebaseStorageService: IFirebaseStorageService
  ) {}

  async handle(req: Request, res: Response) {
    try {
      const parseResult = createNewsSchema.safeParse({
        ...req.body,
        image: req.file,
      })

      if (!parseResult.success) {
        return res.status(HttpStatus.BAD_REQUEST).json({
          errors: z.prettifyError(parseResult.error),
        })
      }

      const { title, content, image } = parseResult.data

      const authenticatedUserId = req.user.id

      const imageUrl = await this.firebaseStorageService.uploadFile({
        file: image,
        folder: File.NEWS,
        id: authenticatedUserId,
      })

      const news = await this.newsRepository.create({
        title,
        content,
        authorId: authenticatedUserId,
        imageUrl,
      })

      res.status(HttpStatus.CREATED).json(news)
    } catch (error) {
      console.error(error)
      if (error instanceof Error) {
        res.status(HttpStatus.BAD_REQUEST).json({ message: error.message })
      }
    }
  }
}
