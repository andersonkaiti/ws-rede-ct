import { PrismaPg } from '@prisma/adapter-pg'
import { env } from '../../src/config/env.ts'
import { PrismaClient } from './generated/client.ts'

const adapter = new PrismaPg({
  connectionString: env.DATABASE_URL,
})

const prisma = new PrismaClient({
  log: ['warn', 'error'],
  adapter,
})

export { prisma }
