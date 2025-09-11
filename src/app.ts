import cors, { type CorsOptions } from 'cors'
import express, { type Application } from 'express'
import { authRoutes } from './routes/auth-routes.ts'
import { certificationRoutes } from './routes/certification-routes.ts'
import { indexRoutes } from './routes/index-routes.ts'
import { newsRoutes } from './routes/news-routes.ts'
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

app.use('/', indexRoutes)
app.use('/auth', authRoutes)
app.use('/user', userRoutes)
app.use('/news', newsRoutes)
app.use('/team', teamRoutes)
app.use('/team', teamMembersRoutes)
app.use('/certification', certificationRoutes)

export { app }
