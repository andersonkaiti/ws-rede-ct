import type { PostGraduateProgram } from '@prisma/client'
import type {
  ICreatePostGraduateProgramDTO,
  IUpdatePostGraduateProgramDTO,
} from '../../dto/post-graduate-program.ts'

export interface IPostGraduateProgramRepository {
  create(data: ICreatePostGraduateProgramDTO): Promise<PostGraduateProgram>
  update(data: IUpdatePostGraduateProgramDTO): Promise<void>
}
