import type { ICreateInternationalScientificCongressDTO } from '../../dto/international-scientific-congress/international-scientific-congress.js'

export interface IInternationalScientificCongressRepository {
  create(congress: ICreateInternationalScientificCongressDTO): Promise<void>
}
