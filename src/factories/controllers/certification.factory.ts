import { FindCertificationByIdController } from '../../controllers/certifications/find-certification-by-id-controller.ts'
import { FindCertificationsController } from '../../controllers/certifications/find-certifications-controller.ts'
import { RegisterCertificationController } from '../../controllers/certifications/register-certification-controller.ts'
import { makeCertificationRepository } from '../repositories/certification.factory.ts'
import { makeUserRepository } from '../repositories/user.factory.ts'
import { makeFirebaseStorageService } from '../services/firebase-storage.factory.ts'

export function makeRegisterCertificationController() {
  return {
    registerCertificationController: new RegisterCertificationController(
      makeUserRepository(),
      makeCertificationRepository(),
      makeFirebaseStorageService()
    ),
  }
}

export function makeFindCertificationsController() {
  return {
    findCertificationsController: new FindCertificationsController(
      makeCertificationRepository()
    ),
  }
}

export function makeFindCertificationByIdController() {
  return {
    findCertificationByIdController: new FindCertificationByIdController(
      makeCertificationRepository()
    ),
  }
}
