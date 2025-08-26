import { getStorage } from 'firebase-admin/storage'
import { app } from './index.ts'

const storage = getStorage(app)

const bucket = storage.bucket(
  process.env.FIREBASE_BUCKET
) as unknown as ReturnType<typeof storage.bucket>

export { bucket }
