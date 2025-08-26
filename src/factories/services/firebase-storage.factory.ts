import type { Bucket } from '@google-cloud/storage'
import { bucket } from '../../../config/firebase/storage.ts'
import { FirebaseStorageService } from '../../services/firebase-storage/firebase-storage.service.ts'

export function makeFirebaseStorageService() {
  return new FirebaseStorageService(bucket as unknown as Bucket)
}
