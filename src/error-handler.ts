import type { NextFunction, Request, Response } from 'express'
import z from 'zod'
import { HttpStatus } from './@types/status-code.ts'
import { BadRequestError } from './errrors/bad-request-error.ts'
import { ConflictError } from './errrors/conflict-error.ts'
import { InternalServerError } from './errrors/internal-server-error.ts'
import { NotFoundError } from './errrors/not-found-error.ts'
import { UnauthorizedError } from './errrors/unauthorized-error.ts'
import { ZodValidationError } from './errrors/zod-validation-error.ts'

export class ErrorHandler {
  handle(
    error: unknown,
    _request: Request,
    response: Response,
    _next: NextFunction
  ) {
    if (error instanceof ZodValidationError) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: 'Validation error',
        error: z.treeifyError(error),
      })
    }

    if (error instanceof BadRequestError) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: error.message,
      })
    }

    if (error instanceof NotFoundError) {
      return response.status(HttpStatus.NOT_FOUND).json({
        message: error.message,
      })
    }

    if (error instanceof UnauthorizedError) {
      return response.status(HttpStatus.UNAUTHORIZED).json({
        message: error.message,
      })
    }

    if (error instanceof ConflictError) {
      return response.status(HttpStatus.CONFLICT).json({
        message: error.message,
      })
    }

    if (error instanceof InternalServerError) {
      return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: error.message,
      })
    }

    return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      message: 'Internal server error',
    })
  }
}
