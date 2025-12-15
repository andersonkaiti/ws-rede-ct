import { CreateCourseController } from '../../controllers/courses/create-course-controller.ts'
import { DeleteCourseController } from '../../controllers/courses/delete-course-controller.ts'
import { FindCourseByIdController } from '../../controllers/courses/find-course-by-id-controller.ts'
import { FindCoursesController } from '../../controllers/courses/find-courses-controller.ts'
import { UpdateCourseController } from '../../controllers/courses/update-course-controller.ts'
import { makeCourseRepository } from '../repositories/course.factory.ts'
import { makeFirebaseStorageService } from '../services/firebase-storage.factory.ts'

export function makeCreateCourseController() {
  return {
    createCourseController: new CreateCourseController(
      makeCourseRepository(),
      makeFirebaseStorageService(),
    ),
  }
}

export function makeFindCoursesController() {
  return {
    findCoursesController: new FindCoursesController(makeCourseRepository()),
  }
}

export function makeFindCourseByIdController() {
  return {
    findCourseByIdController: new FindCourseByIdController(
      makeCourseRepository(),
    ),
  }
}

export function makeUpdateCourseController() {
  return {
    updateCourseController: new UpdateCourseController(
      makeCourseRepository(),
      makeFirebaseStorageService(),
    ),
  }
}

export function makeDeleteCourseController() {
  return {
    deleteCourseController: new DeleteCourseController(
      makeCourseRepository(),
      makeFirebaseStorageService(),
    ),
  }
}
