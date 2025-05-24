import "express";

declare module "express" {
  export interface Request {
    headers: Request["headers"] & {
      "svix-id": string;
      "svix-timestamp": string;
      "svix-signature": string;
    };
  }
}
