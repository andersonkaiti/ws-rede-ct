import z from 'zod'

const envSchema = z.object({
  JWT_SECRET: z.string(),
  FIREBASE_BUCKET: z.string(),
  FIREBASE_CLIENT_EMAIL: z.string(),
  FIREBASE_PRIVATE_KEY: z.string(),
  FIREBASE_PROJECT_ID: z.string(),
  FIREBASE_TYPE: z.string(),
  FIREBASE_PRIVATE_KEY_ID: z.string(),
  FIREBASE_CLIENT_ID: z.string(),
  FIREBASE_AUTH_URI: z.string(),
  FIREBASE_TOKEN_URI: z.string(),
  FIREBASE_AUTH_PROVIDER_X509_CERT_URL: z.string(),
  FIREBASE_CLIENT_X509_CERT_URL: z.string(),
})

export const env = envSchema.parse(process.env)
