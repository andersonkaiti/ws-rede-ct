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

const updateNewsSchema = z.object({
  id: z.string(),
  title: z.string().min(1),
  content: z.string().min(1),
  image: z
    .any()
    .optional()
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

export class UpdateNewsController {
  constructor(
    private readonly newsRepository: INewsRepository,
    private readonly firebaseStorageService: IFirebaseStorageService
  ) {}

  async handle(req: Request, res: Response) {
    try {
      const parseResult = updateNewsSchema.safeParse({
        id: req.params.id,
        title: req.body.title,
        content: req.body.content,
        image: req.file,
      })

      if (!parseResult.success) {
        return res.status(HttpStatus.BAD_REQUEST).json({
          errors: z.prettifyError(parseResult.error),
        })
      }

      const { id, title, content, image } = parseResult.data

      const news = await this.newsRepository.findById(id)

      if (!news) {
        return res.status(HttpStatus.NOT_FOUND).json({
          message: 'Notícia não encontrada.',
        })
      }

      const authenticatedUserId = req.user.id

      if (news.author.id !== authenticatedUserId) {
        return res.status(HttpStatus.UNAUTHORIZED).json({
          message: 'Sem permissão.',
        })
      }

      let newImageUrl: string | undefined

      if (image && news.imageUrl) {
        newImageUrl = await this.firebaseStorageService.updateFile({
          file: image,
          folder: File.NEWS,
          id,
          imageUrl: news.imageUrl,
        })
      }

      const updatedNews = await this.newsRepository.update({
        id,
        title,
        content,
        imageUrl: newImageUrl,
      })

      res.status(HttpStatus.OK).json(updatedNews)
    } catch (error) {
      console.error(error)
      if (error instanceof Error) {
        res.status(HttpStatus.BAD_REQUEST).json({ message: error.message })
      }
    }
  }
}
