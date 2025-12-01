import { CreatePostGraduateProgramController } from '../../controllers/post-graduate-programs/create-post-graduate-program-controller.ts'
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
