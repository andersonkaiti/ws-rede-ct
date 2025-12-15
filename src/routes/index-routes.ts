import { type Request, type Response, Router } from 'express'
import { HttpStatus } from '../@types/status-code.ts'

const router: Router = Router()

router.get('/', (_req: Request, res: Response) => {
  res.status(HttpStatus.OK).json({
    message: 'Rede CT',
  })
})

export { router as indexRoutes }
