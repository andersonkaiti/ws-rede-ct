import type { ICreateCheckingAccountDTO } from '../../dto/checking-account.d.ts'

export interface ICheckingAccountRepository {
  create(account: ICreateCheckingAccountDTO): Promise<void>
}
