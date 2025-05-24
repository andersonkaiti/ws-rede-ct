import type { PrismaClient } from "@prisma/client";
import type { IUserRepository } from "./iuser-repository.d.ts";
import { IUserCreatedEvent } from "../../models/user-created-event.js";
import { IUserUpdatedEvent } from "../../models/user-updated-event.js";
import { IUserDeletedEvent } from "../../models/user-deleted-event.js";

export class UserRepository implements IUserRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async create({
    email_addresses,
    first_name,
    last_name,
    ...user
  }: IUserCreatedEvent["data"]) {
    await this.prisma.user.create({
      data: {
        ...user,
        firstName: first_name,
        lastName: last_name,
        emailAddresses: {
          create: email_addresses.map((email) => ({
            emailAddress: email.email_address,
            object: email.object,
            verification: JSON.stringify(email.verification),
            linkedTo: JSON.stringify(email.linked_to),
            id: email.id,
          })),
        },
      },
    });
  }

  async update(user: IUserUpdatedEvent["data"]) {
    await this.prisma.user.update({
      where: { id: user.id },
      data: {
        ...user,
        emailAddresses: {
          update: user.email_addresses.map((email) => ({
            where: { id: email.id },
            data: {
              emailAddress: email.email_address,
              object: email.object,
              verification: JSON.stringify(email.verification),
              linkedTo: JSON.stringify(email.linked_to),
            },
          })),
        },
      },
    });
  }

  async delete(user: IUserDeletedEvent["data"]) {
    await this.prisma.user.delete({
      where: { id: user.id },
    });
  }
}
