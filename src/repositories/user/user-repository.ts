import type { PrismaClient } from "@prisma/client";
import type { IUserRepository } from "./iuser-repository.d.ts";
import type { IUserCreatedEvent } from "../../models/user-created-event.d.ts";
import type { IUserUpdatedEvent } from "../../models/user-updated-event.d.ts";
import type { IUserDeletedEvent } from "../../models/user-deleted-event.d.ts";

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
        first_name: first_name,
        last_name: last_name,
        id: user.id,
        created_at: user.created_at,
        updated_at: user.updated_at,
        image_url: user.image_url,
        profile_image_url: user.profile_image_url,

        email_addresses: {
          create: email_addresses.map((email) => ({
            email_address: email.email_address,
            linked_to: JSON.stringify(email.linked_to),
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
        first_name: user.first_name,
        last_name: user.last_name,
        image_url: user.image_url,
        profile_image_url: user.profile_image_url,

        email_addresses: {
          update: user.email_addresses.map((email) => ({
            where: { id: email.id },
            data: {
              email_address: email.email_address,
              linked_to: JSON.stringify(email.linked_to),
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
