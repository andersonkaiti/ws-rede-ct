import type { NextFunction, Request, Response } from 'express'
import { HttpStatus } from '../@types/status-code.ts'
import type { IJWTService } from '../services/auth/jwt/ijwt.ts'

export class AuthMiddleware {
  constructor(private readonly jwtService: IJWTService) {}

  authenticated(req: Request, res: Response, next: NextFunction) {
    const authorizationHeader = req.headers.authorization

    if (!authorizationHeader?.startsWith('Bearer ')) {
      return res.status(HttpStatus.UNAUTHORIZED).json({
        message: 'Token inválido.',
        invalid: true,
      })
    }

    const token = authorizationHeader.split(' ')[1]

    if (!token) {
      return res.status(HttpStatus.UNAUTHORIZED).json({
        message: 'Token não fornecido.',
      })
    }

    try {
      const decodedToken = this.jwtService.verify(token)

      if (!decodedToken) {
        return res.status(HttpStatus.UNAUTHORIZED).json({
          message: 'Token inválido.',
          invalid: true,
        })
      }

      req.user = decodedToken

      next()
    } catch (err) {
      console.log(err)
      if (err instanceof Error) {
        return res.status(HttpStatus.UNAUTHORIZED).json({
          message: err.message,
        })
      }
    }
  }

  isAdmin(req: Request, res: Response, next: NextFunction) {
    const authorizationHeader = req.headers.authorization

    if (!authorizationHeader?.startsWith('Bearer ')) {
      return res.status(HttpStatus.UNAUTHORIZED).json({
        message: 'Token inválido.',
        invalid: true,
      })
    }

    const token = authorizationHeader.split(' ')[1]

    if (!token) {
      return res.status(HttpStatus.UNAUTHORIZED).json({
        message: 'Token não fornecido.',
      })
    }

    try {
      const decodedToken = this.jwtService.verify(token)

      if (!decodedToken) {
        return res.status(HttpStatus.UNAUTHORIZED).json({
          message: 'Token inválido.',
          invalid: true,
        })
      }

      if (decodedToken.role !== 'ADMIN') {
        return res.status(HttpStatus.UNAUTHORIZED).json({
          message: 'É necessário ter permissões de administrador.',
        })
      }

      req.user = decodedToken

      next()
    } catch (err) {
      console.log(err)
      if (err instanceof Error) {
        return res.status(HttpStatus.UNAUTHORIZED).json({
          message: err.message,
        })
      }
    }
  }
}
