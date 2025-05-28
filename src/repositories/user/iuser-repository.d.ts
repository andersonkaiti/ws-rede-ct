import type { IUserCreatedEvent } from "../../models/user-created-event.d.ts";
import type { IUserUpdatedEvent } from "../../models/user-updated-event.d.ts";
import type { IUserDeletedEvent } from "../../models/user-deleted-event.d.ts";

export interface IUserRepository {
  create(user: IUserCreatedEvent["data"]): Promise<void>;
  update(user: IUserUpdatedEvent["data"]): Promise<void>;
  delete(user: IUserDeletedEvent["data"]): Promise<void>;
}
