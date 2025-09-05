import type { sign as jwtSign, verify as jwtVerify } from 'jsonwebtoken'
import { env } from '../../../config/env.ts'
import type { IJWTPayload, IJWTService } from './ijwt.ts'

export class JWTService implements IJWTService {
  constructor(
    private readonly signFn: typeof jwtSign,
    private readonly verifyFn: typeof jwtVerify
  ) {}

  sign(payload: IJWTPayload): string | null {
    try {
      return this.signFn(payload, env.JWT_SECRET, {
        expiresIn: '3d',
        subject: payload.id,
      })
    } catch {
      return null
    }
  }

  verify(token: string): IJWTPayload | null {
    try {
      return this.verifyFn(token, env.JWT_SECRET) as IJWTPayload
    } catch {
      return null
    }
  }
}
