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
