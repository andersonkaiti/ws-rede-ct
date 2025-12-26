import type {
  ICountCheckingAccountDTO,
  ICreateCheckingAccountDTO,
  IFindAllCheckingAccountDTO,
} from '../../dto/checking-account.d.ts'

export interface ICheckingAccountEntity {
  id: string
  type: 'EXCLUSIVE_REDECT_USE' | 'EVENTS' | 'COLLOQUIUM'
  balanceInCents: number
  createdAt: Date
  updatedAt: Date
}

export interface ICheckingAccountRepository {
  create(account: ICreateCheckingAccountDTO): Promise<void>
  find(data: IFindAllCheckingAccountDTO): Promise<Array<ICheckingAccountEntity>>
  count(data: ICountCheckingAccountDTO): Promise<number>
}
