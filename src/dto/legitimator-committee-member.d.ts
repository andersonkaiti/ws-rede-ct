export interface ICreateLegitimatorCommitteeMemberDTO {
  role: string
  description?: string
  userId: string
  order?: number
}

export interface IFindAllLegitimatorCommitteeMembersDTO {
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
  order?: number
}

export interface ICountLegitimatorCommitteeMembersDTO {
  filter: {
    role?: string
  }
}
