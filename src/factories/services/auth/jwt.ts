import jwt from 'jsonwebtoken'
import { JWTService } from '../../../services/auth/jwt/jwt.service.ts'

export function makeJwtService() {
  return new JWTService(jwt.sign, jwt.verify)
}
