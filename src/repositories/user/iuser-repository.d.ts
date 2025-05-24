import type { IUserCreatedEvent } from "../../models/user-created-event.js";
import type { IUserUpdatedEvent } from "../../models/user-updated-event.js";
import type { IUserDeletedEvent } from "../../models/user-deleted-event.js";

export interface IUserRepository {
  create(user: IUserCreatedEvent["data"]): Promise<void>;
  update(user: IUserUpdatedEvent["data"]): Promise<void>;
  delete(user: IUserDeletedEvent["data"]): Promise<void>;
}
