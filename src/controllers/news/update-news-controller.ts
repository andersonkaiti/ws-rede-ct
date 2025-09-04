import type { Request, Response } from 'express'
import z from 'zod'
import { File } from '../../@types/file.ts'
import { HttpStatus } from '../../@types/status-code.ts'
import type { INewsRepository } from '../../repositories/news/inews-repository.d.ts'
import type { IFirebaseStorageService } from '../../services/firebase-storage/ifirebase-storage.ts'

const updateNewsSchema = z.object({
  id: z.string(),
  title: z.string().min(1),
  content: z.string().min(1),
  image_url: z.string().optional(),
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
        image_url: req.body.image_url,
      })

      if (!parseResult.success) {
        return res.status(HttpStatus.BAD_REQUEST).json({
          errors: z.treeifyError(parseResult.error),
        })
      }

      const { id, title, content, image_url } = parseResult.data

      let newImageUrl: string | undefined

      if (image_url) {
        newImageUrl = await this.firebaseStorageService.updateFile(
          req,
          File.NEWS
        )
      }

      const news = await this.newsRepository.update({
        id,
        title,
        content,
        image_url: newImageUrl,
      })

      res.status(HttpStatus.OK).json(news)
    } catch (error) {
      console.error(error)
      if (error instanceof Error) {
        res.status(HttpStatus.BAD_REQUEST).json({ message: error.message })
      }
    }
  }
}
