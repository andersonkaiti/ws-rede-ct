import type { compare as CompareFn, hash as HashFn } from 'bcryptjs'
import type { IBcryptService, ICompare } from './ibcryptjs.ts'

const SALT_ROUNDS = 6

export class BcryptService implements IBcryptService {
  constructor(
    private readonly hashFn: typeof HashFn,
    private readonly compareFn: typeof CompareFn
  ) {}

  async hash(password: string): Promise<string> {
    return await this.hashFn(password, SALT_ROUNDS)
  }

  async compare({ password, hashedPassword }: ICompare): Promise<boolean> {
    return await this.compareFn(password, hashedPassword)
  }
}
