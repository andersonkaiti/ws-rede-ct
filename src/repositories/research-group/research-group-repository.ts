import type { PrismaClient, ResearchGroup } from '@prisma/client'
import type {
  ICreateResearchGroupDTO,
  IUpdateResearchGroupDTO,
} from '../../dto/research-group.ts'
import type { IResearchGroupRepository } from './iresearch-group-repository.ts'

export class ResearchGroupRepository implements IResearchGroupRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async create({
    name,
    acronym,
    description,
    url,
    logoUrl,
    foundedAt,
    scope,
    email,
    leaderId,
    deputyLeaderId,
  }: ICreateResearchGroupDTO): Promise<ResearchGroup> {
    return await this.prisma.researchGroup.create({
      data: {
        name,
        acronym,
        description,
        url,
        logoUrl,
        foundedAt,
        scope,
        email,
        leaderId,
        deputyLeaderId,
      },
    })
  }

  async update({
    id,
    name,
    acronym,
    description,
    url,
    logoUrl,
    foundedAt,
    scope,
    email,
    leaderId,
    deputyLeaderId,
  }: IUpdateResearchGroupDTO): Promise<void> {
    await this.prisma.researchGroup.update({
      where: {
        id,
      },
      data: {
        name,
        acronym,
        description,
        url,
        logoUrl,
        foundedAt,
        scope,
        email,
        leaderId,
        deputyLeaderId,
      },
    })
  }
}
