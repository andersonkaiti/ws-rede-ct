import { AuthMiddleware } from '../../middlewares/auth-middleware.ts'
import { makeJwtService } from '../services/auth/jwt.ts'

export function makeAuthMiddleware() {
  return {
    authMiddleware: new AuthMiddleware(makeJwtService()),
  }
}
