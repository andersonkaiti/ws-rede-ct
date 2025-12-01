export interface ICreatePostGraduateProgramDTO {
  title: string
  imageUrl?: string
  description?: string
  startDate: Date
  endDate: Date
  contact: string
  registrationLink?: string
}

export interface IFindPostGraduateProgramsDTO {
  pagination: {
    offset: number
    limit: number
  }
  filter: {
    title?: string
    description?: string
    contact?: string
    orderBy?: 'asc' | 'desc'
  }
}

export interface IUpdatePostGraduateProgramDTO
  extends Partial<Omit<PostGraduateProgram, 'createdAt' | 'updatedAt'>> {
  id: string
}

export interface ICountPostGraduateProgramsDTO {
  filter: {
    title?: string
    description?: string
    contact?: string
  }
}
