import type { IUserDeletedDTO, IUserDTO } from "../../dto/user.d.ts";

export interface IUserRepository {
  create(user: IUserDTO): Promise<void>;
  update(user: IUserDTO): Promise<void>;
  delete(user: IUserDeletedDTO): Promise<void>;
  findAll(): Promise<User[]>;
}
