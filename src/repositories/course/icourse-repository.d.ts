import type { Course, User } from '@prisma/client'
import type {
  ICountCoursesDTO,
  ICreateCourseDTO,
  IFindCoursesDTO,
  IUpdateCourseDTO,
} from '../../dto/course.ts'

interface CourseWithInstructorsAndCoordinator extends Course {
  instructors: Omit<User, 'passwordHash'>[]
  coordinator: Omit<User, 'passwordHash'>
}

export interface ICourseRepository {
  create(data: ICreateCourseDTO): Promise<Course>
  find(
    data: IFindCoursesDTO
  ): Promise<CourseWithInstructorsAndCoordinator[] | null>
  findById(id: string): Promise<CourseWithInstructorsAndCoordinator | null>
  update(data: IUpdateCourseDTO): Promise<void>
  deleteById(id: string): Promise<void>
  count(data: ICountCoursesDTO): Promise<number>
}
