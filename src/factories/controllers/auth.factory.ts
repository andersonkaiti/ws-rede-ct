import { SignInController } from '../../controllers/auth/sign-in-controller.ts'
import { SignUpController } from '../../controllers/auth/sign-up-controller.ts'
import { makeUserRepository } from '../repositories/user.factory.ts'
import { makeBcryptService } from '../services/auth/bcryptjs.ts'
import { makeJwtService } from '../services/auth/jwt.ts'

export function makeSignUpController() {
  return {
    signUpController: new SignUpController(
      makeUserRepository(),
      makeBcryptService()
    ),
  }
}

export function makeSignInController() {
  return {
    signInController: new SignInController(
      makeUserRepository(),
      makeBcryptService(),
      makeJwtService()
    ),
  }
}
