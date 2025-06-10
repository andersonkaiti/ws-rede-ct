import { Request, Response } from "express";
import { UserRepository } from "../../repositories/user/user-repository.ts";

export class FindAllUsersController {
  constructor(private readonly userRepository: UserRepository) {}

  async handle(_req: Request, res: Response) {
    try {
      const users = await this.userRepository.findAll();

      return res.status(200).json(users);
    } catch (error) {
      return res.status(500).json({ message: "Erro ao buscar usuários" });
    }
  }
}
