import admin, { type ServiceAccount } from 'firebase-admin'
import { env } from '../../src/config/env.ts'

const app = admin.initializeApp({
  credential: admin.credential.cert({
    clientEmail: env.FIREBASE_CLIENT_EMAIL,
    privateKey: env.FIREBASE_PRIVATE_KEY,
    projectId: env.FIREBASE_PROJECT_ID,
    type: env.FIREBASE_TYPE,
    privateKeyId: env.FIREBASE_PRIVATE_KEY_ID,
    clientId: env.FIREBASE_CLIENT_ID,
    authUri: env.FIREBASE_AUTH_URI,
    tokenUri: env.FIREBASE_TOKEN_URI,
    authProviderX509CertUrl: env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
    clientX509CertUrl: env.FIREBASE_CLIENT_X509_CERT_URL,
  } as ServiceAccount),
  storageBucket: env.FIREBASE_BUCKET,
})

if (app.name) {
  console.log('🔥 Firebase conectado com sucesso!')
} else {
  console.error('❌ Erro ao se conectar ao Firebase.')
}

export { app }
