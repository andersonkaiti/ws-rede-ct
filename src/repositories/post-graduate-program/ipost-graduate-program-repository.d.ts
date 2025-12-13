import type { PostGraduateProgram } from '../../../config/database/generated/client.ts'
import type {
  ICountPostGraduateProgramsDTO,
  ICreatePostGraduateProgramDTO,
  IFindPostGraduateProgramsDTO,
  IUpdatePostGraduateProgramDTO,
} from '../../dto/post-graduate-program.ts'

export interface IPostGraduateProgramRepository {
  create(data: ICreatePostGraduateProgramDTO): Promise<PostGraduateProgram>
  find(
    data: IFindPostGraduateProgramsDTO,
  ): Promise<PostGraduateProgram[] | null>
  findById(id: string): Promise<PostGraduateProgram | null>
  update(data: IUpdatePostGraduateProgramDTO): Promise<void>
  deleteById(id: string): Promise<void>
  count(data: ICountPostGraduateProgramsDTO): Promise<number>
}
