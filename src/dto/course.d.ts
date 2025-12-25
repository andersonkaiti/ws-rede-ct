import type { Course } from '../../config/database/generated/client.ts'

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

export interface IFindCoursesDTO {
  pagination: {
    offset?: number
    limit?: number
  }
  filter: {
    title?: string
    description?: string
    coordinator?: string
    orderBy?: 'asc' | 'desc'
  }
}

export interface IUpdateCourseDTO
  extends Partial<Omit<Course, 'createdAt' | 'updatedAt'>> {
  id: string
  instructorIds?: string[]
}

export interface ICountCoursesDTO {
  filter: {
    title?: string
    description?: string
    coordinator?: string
  }
}
