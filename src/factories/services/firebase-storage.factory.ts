import { FirebaseStorageService } from "../../services/firebase-storage/firebase-storage.service.ts";
import { bucket } from "../../../config/firebase/storage.ts";
import type { Bucket } from "@google-cloud/storage";

export function makeFirebaseStorageService() {
  return new FirebaseStorageService(bucket as unknown as Bucket);
}
