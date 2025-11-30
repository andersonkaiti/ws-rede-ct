import type { Course } from '@prisma/client'
import type { ICreateCourseDTO, IUpdateCourseDTO } from '../../dto/course.ts'

export interface ICourseRepository {
  create(data: ICreateCourseDTO): Promise<Course>
  update(data: IUpdateCourseDTO): Promise<void>
}
