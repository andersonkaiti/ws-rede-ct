import type { NextFunction, Request, Response } from 'express'
import { UnauthorizedError } from '../errors/unauthorized-error.ts'
import type { IJWTService } from '../services/auth/jwt/ijwt.ts'

export class AuthMiddleware {
  constructor(private readonly jwtService: IJWTService) {}

  authenticated(req: Request, _res: Response, next: NextFunction) {
    const authorizationHeader = req.headers.authorization

    if (!authorizationHeader?.startsWith('Bearer ')) {
      throw new UnauthorizedError('Token inválido.')
    }

    const token = authorizationHeader.split(' ')[1]

    if (!token) {
      throw new UnauthorizedError('Token não fornecido.')
    }

    const decodedToken = this.jwtService.verify(token)

    if (!decodedToken) {
      throw new UnauthorizedError('Token inválido.')
    }

    req.user = decodedToken

    next()
  }

  isAdmin(req: Request, _res: Response, next: NextFunction) {
    const authorizationHeader = req.headers.authorization

    if (!authorizationHeader?.startsWith('Bearer ')) {
      throw new UnauthorizedError('Token inválido.')
    }

    const token = authorizationHeader.split(' ')[1]

    if (!token) {
      throw new UnauthorizedError('Token não fornecido.')
    }

    const decodedToken = this.jwtService.verify(token)

    if (!decodedToken) {
      throw new UnauthorizedError('Token inválido.')
    }

    if (decodedToken.role !== 'ADMIN') {
      throw new UnauthorizedError(
        'É necessário ter permissões de administrador.',
      )
    }

    req.user = decodedToken

    next()
  }
}
