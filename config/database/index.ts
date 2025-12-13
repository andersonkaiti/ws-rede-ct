import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from './generated/client.ts'

const adapter = new PrismaPg({
  connection: {
    url: 'postgresql://localhost:5432/rede-ct'
  }
})

const prisma = new PrismaClient({
  log: ['warn', 'error'],
  adapter,
})

export { prisma }

