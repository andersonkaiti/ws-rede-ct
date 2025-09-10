import type { Request, Response } from 'express'
import z from 'zod'
import { HttpStatus } from '../../@types/status-code.ts'
import type { INewsRepository } from '../../repositories/news/inews-repository.d.ts'
import type { IFirebaseStorageService } from '../../services/firebase-storage/ifirebase-storage.ts'

const deleteNewsSchema = z.object({
  id: z.string(),
})

export class DeleteNewsController {
  constructor(
    private readonly newsRepository: INewsRepository,
    private readonly firebaseStorageService: IFirebaseStorageService
  ) {}

  async handle(req: Request, res: Response) {
    try {
      const parseResult = deleteNewsSchema.safeParse(req.params)

      if (!parseResult.success) {
        return res.status(HttpStatus.BAD_REQUEST).json({
          errors: z.prettifyError(parseResult.error),
        })
      }

      const { id } = parseResult.data

      const authenticatedUserId = req.user.id

      const news = await this.newsRepository.findById(id)

      if (!news) {
        return res.status(HttpStatus.NOT_FOUND).json({
          message: 'Notícia não encontrada.',
        })
      }

      if (news.author.id !== authenticatedUserId) {
        return res.status(HttpStatus.UNAUTHORIZED).json({
          message: 'Sem permissão.',
        })
      }

      await Promise.all([
        this.newsRepository.delete(id),
        this.firebaseStorageService.deleteFile({
          fileUrl: news.imageUrl as string,
        }),
      ])

      res.status(HttpStatus.OK).json({
        message: 'Notícia deletada com sucesso.',
      })
    } catch (error) {
      console.error(error)
      if (error instanceof Error) {
        res.status(HttpStatus.BAD_REQUEST).json({ message: error.message })
      }
    }
  }
}
