export interface IJWTPayload {
  role: 'USER' | 'ADMIN'
  id: string
  email: string
}

export interface IJWTService {
  sign(payload: IJWTPayload): string | null
  verify(token: string): IJWTPayload | null
}
