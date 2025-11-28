import type { ICreateRegionalCongressDTO } from '../../dto/regional-congress/regional-congress.js'

export interface IRegionalCongressRepository {
  create(congress: ICreateRegionalCongressDTO): Promise<void>
}
