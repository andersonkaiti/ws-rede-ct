import type {
  CongressGalleryItem,
  CongressPartner,
  InternationalScientificCongress,
} from '@prisma/client'
import type {
  ICountInternationalScientificCongressDTO,
  ICreateInternationalScientificCongressDTO,
  IFindAllInternationalScientificCongressDTO,
  IUpdateInternationalScientificCongressDTO,
} from '../../dto/international-scientific-congress/international-scientific-congress.js'

export interface InternationalScientificCongressWithRelations
  extends InternationalScientificCongress {
  partners: CongressPartner[]
  galleries: CongressGalleryItem[]
}

export interface IInternationalScientificCongressRepository {
  create(congress: ICreateInternationalScientificCongressDTO): Promise<void>
  update(congress: IUpdateInternationalScientificCongressDTO): Promise<void>
  deleteById(id: string): Promise<void>
  find(
    data: IFindAllInternationalScientificCongressDTO,
  ): Promise<InternationalScientificCongressWithRelations[] | null>
  findById(
    id: string,
  ): Promise<InternationalScientificCongressWithRelations | null>
  findByEdition(
    edition: number,
  ): Promise<InternationalScientificCongressWithRelations[] | null>
  count(data: ICountInternationalScientificCongressDTO): Promise<number>
}
