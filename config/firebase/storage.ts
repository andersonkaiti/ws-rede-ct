import { getStorage } from 'firebase-admin/storage'
import { env } from '../../src/config/env.ts'
import { app } from './index.ts'

const storage = getStorage(app)

const bucket = storage.bucket(env.FIREBASE_BUCKET) as unknown as ReturnType<
  typeof storage.bucket
>

export { bucket }
