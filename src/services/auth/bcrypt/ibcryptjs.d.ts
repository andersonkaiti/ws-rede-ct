interface ICompare {
  password: string
  hashedPassword: string
}

export interface IBcryptService {
  hash(password: string): Promise<string>
  compare(data: ICompare): Promise<boolean>
}
