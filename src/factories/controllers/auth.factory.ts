import { FindAuthenticatedUserCertificationsController } from '../../controllers/auth/find-user-certifications-controller.ts'
import { FindAuthenticatedUserController } from '../../controllers/auth/find-user-controller.ts'
import { FindAuthenticatedUserNewsController } from '../../controllers/auth/find-user-news-controller.ts'
import { FindAuthenticatedUserPendenciesController } from '../../controllers/auth/find-user-pendencies-controller.ts'
import { SignInController } from '../../controllers/auth/sign-in-controller.ts'
import { SignUpController } from '../../controllers/auth/sign-up-controller.ts'
import { makeCertificationRepository } from '../repositories/certification.factory.ts'
import { makeNewsRepository } from '../repositories/news.factory.ts'
import { makePendencyRepository } from '../repositories/pendency.factory.ts'
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

export function makeFindAuthenticatedUserController() {
  return {
    findAuthenticatedUserController: new FindAuthenticatedUserController(
      makeUserRepository()
    ),
  }
}

export function makeFindAuthenticatedUserNewsController() {
  return {
    findAuthenticatedUserController: new FindAuthenticatedUserNewsController(
      makeNewsRepository()
    ),
  }
}

export function makeFindAuthenticatedUserCertificationsController() {
  return {
    findAuthenticatedUserCertificationsController:
      new FindAuthenticatedUserCertificationsController(
        makeCertificationRepository()
      ),
  }
}

export function makeFindAuthenticatedUserPendenciesController() {
  return {
    findAuthenticatedUserPendenciesController:
      new FindAuthenticatedUserPendenciesController(makePendencyRepository()),
  }
}
