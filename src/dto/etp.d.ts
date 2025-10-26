export interface ICreateETPDTO {
  code: string
  title: string
  description?: string
  notes?: string
  leaderId: string
  deputyLeaderId: string
  secretaryId: string
  memberIds: string[]
}
