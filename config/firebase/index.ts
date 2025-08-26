import { config } from 'dotenv'
import admin, { type ServiceAccount } from 'firebase-admin'

config()

const app = admin.initializeApp({
  credential: admin.credential.cert({
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY,
    projectId: process.env.FIREBASE_PROJECT_ID,
    type: process.env.FIREBASE_TYPE,
    privateKeyId: process.env.FIREBASE_PRIVATE_KEY_ID,
    clientId: process.env.FIREBASE_CLIENT_ID,
    authUri: process.env.FIREBASE_AUTH_URI,
    tokenUri: process.env.FIREBASE_TOKEN_URI,
    authProviderX509CertUrl: process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
    clientX509CertUrl: process.env.FIREBASE_CLIENT_X509_CERT_URL,
  } as ServiceAccount),
  storageBucket: process.env.FIREBASE_BUCKET,
})

if (app.name) {
  console.log('🔥 Firebase conectado com sucesso!')
} else {
  console.error('❌ Erro ao se conectar ao Firebase.')
}

export { app }
