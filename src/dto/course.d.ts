export interface ICreateCourseDTO {
  title: string
  imageUrl?: string
  coordinatorId: string
  email: string
  instructorIds?: string[]
  scheduledAt: Date
  location: string
  registrationLink?: string
  description?: string
}

export interface IUpdateCourseDTO
  extends Partial<Omit<Course, 'createdAt' | 'updatedAt'>> {
  id: string
}
