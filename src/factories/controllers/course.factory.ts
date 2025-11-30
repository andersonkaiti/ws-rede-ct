import { CreateCourseController } from '../../controllers/courses/create-course-controller.ts'
import { FindCoursesController } from '../../controllers/courses/find-courses-controller.ts'
import { makeCourseRepository } from '../repositories/course.factory.ts'
import { makeFirebaseStorageService } from '../services/firebase-storage.factory.ts'

export function makeCreateCourseController() {
  return {
    createCourseController: new CreateCourseController(
      makeCourseRepository(),
      makeFirebaseStorageService()
    ),
  }
}

export function makeFindCoursesController() {
  return {
    findCoursesController: new FindCoursesController(makeCourseRepository()),
  }
}
