import * as express from "express";

declare global {
  namespace Express {
    interface Request {
      headers: express.Request["headers"] & {
        "svix-id": string;
        "svix-timestamp": string;
        "svix-signature": string;
      };
    }
  }
}
