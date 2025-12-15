import { DeleteUserController } from '../../controllers/users/delete-user-controller.ts'
import { FindUserController } from '../../controllers/users/find-user-controller.ts'
import { FindUsersController } from '../../controllers/users/find-users-controller.ts'
import { UpdateUserController } from '../../controllers/users/update-user-controller.ts'
import { makeUserRepository } from '../repositories/user.factory.ts'
import { makeFirebaseStorageService } from '../services/firebase-storage.factory.ts'

export function makeUpdateUserController() {
  return {
    updateUserController: new UpdateUserController(
      makeUserRepository(),
      makeFirebaseStorageService(),
    ),
  }
}

export function makeDeleteUserController() {
  return {
    deleteUserController: new DeleteUserController(makeUserRepository()),
  }
}

export function makeFindUsersController() {
  return {
    findUsersController: new FindUsersController(makeUserRepository()),
  }
}

export function makeFindUserController() {
  return {
    findUserController: new FindUserController(makeUserRepository()),
  }
}
