export interface ICreateLegitimatorCommitteeMemberDTO {
  role: string
  description?: string
  userId: string
}

export interface IFindAllLegitimatorCommitteeMembersDTO {
  pagination: {
    offset: number
    limit: number
  }
  filter: {
    role?: string
    orderBy?: 'asc' | 'desc'
  }
}

export interface IUpdateLegitimatorCommitteeMemberDTO {
  id: string
  role?: string
  description?: string
  userId?: string
}

export interface ICountLegitimatorCommitteeMembersDTO {
  filter: {
    role?: string
  }
}
