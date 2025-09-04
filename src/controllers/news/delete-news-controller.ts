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
          errors: z.treeifyError(parseResult.error),
        })
      }

      const { id } = parseResult.data

      await Promise.all([
        this.newsRepository.delete(id),
        this.firebaseStorageService.deleteFile(req),
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
