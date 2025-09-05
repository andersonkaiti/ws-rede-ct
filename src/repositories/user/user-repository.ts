import type { PrismaClient } from '@prisma/client'
import type { ICreateUserDTO, IUpdateUserDTO } from '../../dto/user.d.ts'
import type { IUserRepository } from './iuser-repository.d.ts'

export class UserRepository implements IUserRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async create(user: ICreateUserDTO) {
    await this.prisma.user.create({
      data: user,
    })
  }

  async update(user: IUpdateUserDTO) {
    await this.prisma.user.update({
      where: {
        id: user.id,
      },
      data: user,
    })
  }

  async deleteById(id: string) {
    await this.prisma.user.delete({
      where: { id },
    })
  }

  async find() {
    return await this.prisma.user.findMany({
      omit: {
        passwordHash: true,
      },
    })
  }

  async findByEmail(emailAddress: string) {
    return await this.prisma.user.findFirst({
      where: {
        emailAddress,
      },
    })
  }

  async findById(id: string) {
    return await this.prisma.user.findFirst({
      where: {
        id,
      },
    })
  }
}
