import { CreatePostGraduateProgramController } from '../../controllers/post-graduate-programs/create-post-graduate-program-controller.ts'
import { DeletePostGraduateProgramController } from '../../controllers/post-graduate-programs/delete-post-graduate-program-controller.ts'
import { FindPostGraduateProgramByIdController } from '../../controllers/post-graduate-programs/find-post-graduate-program-by-id-controller.ts'
import { FindPostGraduateProgramsController } from '../../controllers/post-graduate-programs/find-post-graduate-programs-controller.ts'
import { UpdatePostGraduateProgramController } from '../../controllers/post-graduate-programs/update-post-graduate-program-controller.ts'
import { makePostGraduateProgramRepository } from '../repositories/post-graduate-program.factory.ts'
import { makeFirebaseStorageService } from '../services/firebase-storage.factory.ts'

export function makeCreatePostGraduateProgramController() {
  return {
    createPostGraduateProgramController:
      new CreatePostGraduateProgramController(
        makePostGraduateProgramRepository(),
        makeFirebaseStorageService()
      ),
  }
}

export function makeFindPostGraduateProgramsController() {
  return {
    findPostGraduateProgramsController: new FindPostGraduateProgramsController(
      makePostGraduateProgramRepository()
    ),
  }
}

export function makeFindPostGraduateProgramByIdController() {
  return {
    findPostGraduateProgramByIdController:
      new FindPostGraduateProgramByIdController(
        makePostGraduateProgramRepository()
      ),
  }
}

export function makeUpdatePostGraduateProgramController() {
  return {
    updatePostGraduateProgramController:
      new UpdatePostGraduateProgramController(
        makePostGraduateProgramRepository(),
        makeFirebaseStorageService()
      ),
  }
}

export function makeDeletePostGraduateProgramController() {
  return {
    deletePostGraduateProgramController:
      new DeletePostGraduateProgramController(
        makePostGraduateProgramRepository(),
        makeFirebaseStorageService()
      ),
  }
}
