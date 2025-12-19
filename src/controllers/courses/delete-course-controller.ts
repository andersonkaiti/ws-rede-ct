import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi'
import type { Request, Response } from 'express'
import z from 'zod'
import { HttpStatus } from '../../@types/status-code.ts'
import { NotFoundError } from '../../errors/not-found-error.ts'
import type { ICourseRepository } from '../../repositories/course/icourse-repository.ts'
import type { IFirebaseStorageService } from '../../services/firebase-storage/ifirebase-storage.ts'

extendZodWithOpenApi(z)

export const deleteCourseSchema = z.object({
  id: z.uuid(),
})

export class DeleteCourseController {
  constructor(
    private readonly courseRepository: ICourseRepository,
    private readonly firebaseStorageService: IFirebaseStorageService,
  ) {}

  async handle(req: Request, res: Response) {
    const { id } = deleteCourseSchema.parse({
      id: req.params.id,
    })

    const existingCourse = await this.courseRepository.findById(id)

    if (!existingCourse) {
      throw new NotFoundError('O curso não existe.')
    }

    if (existingCourse.imageUrl) {
      this.firebaseStorageService.deleteFile({
        fileUrl: existingCourse.imageUrl,
      })
    }

    await this.courseRepository.deleteById(id)

    return res.sendStatus(HttpStatus.OK)
  }
}
