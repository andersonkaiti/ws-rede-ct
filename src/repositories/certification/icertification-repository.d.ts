import type { Certification, User } from '@prisma/client'
import type {
  ICountCertificationsDTO,
  IFindByUserIdDTO,
  IFindCertificationsDTO,
  IRegisterCertificationDTO,
  IUpdateCertificationDTO,
} from '../../dto/certification.ts'

type CertificationWithUser = Certification & {
  user: Omit<User, 'passwordHash'>
}

export interface ICertificationRepository {
  register(data: IRegisterCertificationDTO): Promise<void>
  find(data: IFindCertificationsDTO): Promise<CertificationWithUser[] | null>
  findById(id: string): Promise<Certification | null>
  findByUserId(data: IFindByUserIdDTO): Promise<Certification[] | null>
  update(data: IUpdateCertificationDTO): Promise<void>
  deleteById(id: string): Promise<void>
  count(data: ICountCertificationsDTO): Promise<number>
}
