import { UserRepository } from "../../repositories/user/user-repository.ts";
import { prisma } from "../../../config/database.ts";

export function makeUserRepository() {
  return new UserRepository(prisma);
}
