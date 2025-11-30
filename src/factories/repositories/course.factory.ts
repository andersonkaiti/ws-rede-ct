import { prisma } from '../../../config/database.ts'
import { CourseRepository } from '../../repositories/course/course-repository.ts'

export function makeCourseRepository() {
  return new CourseRepository(prisma)
}
