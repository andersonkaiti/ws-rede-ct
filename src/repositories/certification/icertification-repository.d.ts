import type { Certification, User } from '@prisma/client'
import type {
  ICountCertificationsDTO,
  IFindCertificationsDTO,
  IRegisterCertificationDTO,
} from '../../dto/certification.ts'

type CertificationWithUser = Certification & {
  user: Omit<User, 'passwordHash'>
}

export interface ICertificationRepository {
  register(data: IRegisterCertificationDTO): Promise<void>
  find(data: IFindCertificationsDTO): Promise<CertificationWithUser[]>
  findById(id: string): Promise<Certification | null>
  count(data: ICountCertificationsDTO): Promise<number>
}
