export interface ICreatePostGraduateProgramDTO {
  title: string
  imageUrl?: string
  description?: string
  startDate: Date
  endDate: Date
  contact: string
  registrationLink?: string
}

export interface IUpdatePostGraduateProgramDTO
  extends Partial<Omit<PostGraduateProgram, 'createdAt' | 'updatedAt'>> {
  id: string
}
