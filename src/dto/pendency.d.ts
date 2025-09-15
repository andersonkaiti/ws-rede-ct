export interface ICreatePendencyDTO {
  title: string
  description?: string
  status: 'PENDING' | 'PAID'
  dueDate?: Date
  documentUrl: string
  userId: string
}
