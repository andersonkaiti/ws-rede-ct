import type { IRegisterCertificationDTO } from '../../dto/certification.ts'

export interface ICertificationRepository {
  register(data: IRegisterCertificationDTO): Promise<void>
}
