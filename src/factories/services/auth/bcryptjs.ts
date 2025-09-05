import { compare, hash } from 'bcryptjs'
import { BcryptService } from '../../../services/auth/bcrypt/bcrypjs.service.ts'

export function makeBcryptService() {
  return new BcryptService(hash, compare)
}
