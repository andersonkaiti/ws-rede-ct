import { ErrorHandler } from '../error-handler.ts'

export function makeErrorHandler() {
  return {
    errorHandler: new ErrorHandler(),
  }
}
