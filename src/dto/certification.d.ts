export interface IRegisterCertificationDTO {
  userId: string
  title: string
  description: string
  certificationUrl: string
}

export interface IFindCertificationsDTO {
  pagination: {
    offset: number
    limit: number
  }
  filter: {
    title?: string
    description?: string
    orderBy?: 'asc' | 'desc'
  }
}

export interface IFindByUserIdDTO {
  userId: string
  pagination: {
    offset: number
    limit: number
  }
  filter: {
    title?: string
    description?: string
    orderBy?: 'asc' | 'desc'
  }
}

export interface IUpdateCertificationDTO {
  id: string
  title: string
  description: string
  certificationUrl: string
}

export interface ICountCertificationsDTO {
  filter: {
    title?: string
    description?: string
    userId?: string
  }
}
