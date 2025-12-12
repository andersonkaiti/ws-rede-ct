import { prisma } from '../../../config/database/index.ts'
import { CourseRepository } from '../../repositories/course/course-repository.ts'

export function makeCourseRepository() {
  return new CourseRepository(prisma)
}
