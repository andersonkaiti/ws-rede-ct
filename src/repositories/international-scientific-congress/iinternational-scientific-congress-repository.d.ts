import type {
  CongressGalleryItem,
  CongressPartner,
  InternationalScientificCongress,
} from '@prisma/client'
import type {
  ICountInternationalScientificCongressDTO,
  ICreateInternationalScientificCongressDTO,
  IFindAllInternationalScientificCongressDTO,
} from '../../dto/international-scientific-congress/international-scientific-congress.js'

export interface InternationalScientificCongressWithRelations
  extends InternationalScientificCongress {
  partners: CongressPartner[]
  galleries: CongressGalleryItem[]
}

export interface IInternationalScientificCongressRepository {
  create(congress: ICreateInternationalScientificCongressDTO): Promise<void>
  find(
    data: IFindAllInternationalScientificCongressDTO
  ): Promise<InternationalScientificCongressWithRelations[] | null>
  count(data: ICountInternationalScientificCongressDTO): Promise<number>
}
