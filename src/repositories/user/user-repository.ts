import type { PrismaClient } from "@prisma/client";
import type { IUserRepository } from "./iuser-repository.d.ts";
import type { IUserCreatedEvent } from "../../models/user-created-event.js";
import type { IUserUpdatedEvent } from "../../models/user-updated-event.js";
import type { IUserDeletedEvent } from "../../models/user-deleted-event.js";

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
        firstName: first_name,
        lastName: last_name ?? "",
        id: user.id,
        createdAt: user.created_at,
        lastSignInAt: user.last_sign_in_at,
        updatedAt: user.updated_at,
        imageUrl: user.image_url,
        profileImageUrl: user.profile_image_url,
        privateMetadata: user.private_metadata,
        publicMetadata: user.public_metadata,
        unsafeMetadata: user.unsafe_metadata,
        username: user.username,

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
        firstName: user.first_name,
        lastName: user.last_name ?? "",

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
