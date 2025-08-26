import { config } from 'dotenv'
import { CreateUserController } from '../../controllers/user/create-user-controller.ts'
import { DeleteUserController } from '../../controllers/user/delete-user-controller.ts'
import { FindAllUsersController } from '../../controllers/user/find-all-users-controller.ts'
import { UpdateUserController } from '../../controllers/user/update-user.controller.ts'
import { makeUserRepository } from '../repositories/user.factory.ts'
import { makeClerkWebhookService } from '../services/clerk-webhook-service.factory.ts'

config()

export function makeCreateUserController() {
  return {
    createUserController: new CreateUserController(
      makeClerkWebhookService(process.env.CLERK_USER_CREATED as string),
      makeUserRepository()
    ),
  }
}

export function makeUpdateUserController() {
  return {
    updateUserController: new UpdateUserController(
      makeClerkWebhookService(process.env.CLERK_USER_UPDATED as string),
      makeUserRepository()
    ),
  }
}

export function makeDeleteUserController() {
  return {
    deleteUserController: new DeleteUserController(
      makeClerkWebhookService(process.env.CLERK_USER_DELETED as string),
      makeUserRepository()
    ),
  }
}

export function makeFindAllUsersController() {
  return {
    findAllUsersController: new FindAllUsersController(makeUserRepository()),
  }
}
