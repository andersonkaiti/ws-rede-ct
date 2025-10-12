import { apiReference } from '@scalar/express-api-reference'
import cors, { type CorsOptions } from 'cors'
import express, {
  type Application,
  type NextFunction,
  type Request,
  type Response,
} from 'express'
import { makeErrorHandler } from './factories/error-handler.ts'
import { swaggerDocument } from './openapi/index.ts'
import { authRoutes } from './routes/auth-routes.ts'
import { certificationRoutes } from './routes/certification-routes.ts'
import { indexRoutes } from './routes/index-routes.ts'
import { newsRoutes } from './routes/news-routes.ts'
import { pendencyRoutes } from './routes/pendency-routes.ts'
import { teamMembersRoutes } from './routes/team-member-routes.ts'
import { teamRoutes } from './routes/team-routes.ts'
import { userRoutes } from './routes/user-routes.ts'

const app: Application = express()

const corsOptions: CorsOptions = {
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  origin: ['http://localhost:3000', 'https://rede-ct.vercel.app'],
  credentials: true,
}

app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(
  '/docs',
  apiReference({
    content: swaggerDocument,
    theme: 'kepler',
  })
)

app.use('/', indexRoutes)
app.use('/auth', authRoutes)
app.use('/user', userRoutes)
app.use('/news', newsRoutes)
app.use('/team', teamRoutes)
app.use('/team', teamMembersRoutes)
app.use('/certification', certificationRoutes)
app.use('/pendency', pendencyRoutes)

app.use(
  (
    error: unknown,
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    const { errorHandler } = makeErrorHandler()

    errorHandler.handle(error, request, response, next)
  }
)

export { app }
