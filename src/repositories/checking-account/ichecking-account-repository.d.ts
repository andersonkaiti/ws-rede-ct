import type {
  ICountCheckingAccountDTO,
  ICreateCheckingAccountDTO,
  IFindAllCheckingAccountDTO,
  IUpdateCheckingAccountDTO,
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
  update(account: IUpdateCheckingAccountDTO): Promise<void>
  find(data: IFindAllCheckingAccountDTO): Promise<Array<ICheckingAccountEntity>>
  findById(id: string): Promise<ICheckingAccountEntity | null>
  findLatestByType(
    type: 'EXCLUSIVE_REDECT_USE' | 'EVENTS' | 'COLLOQUIUM',
  ): Promise<ICheckingAccountEntity | null>
  count(data: ICountCheckingAccountDTO): Promise<number>
}
