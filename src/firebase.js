import { getApp, getApps, initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyBJNVCVoA_0dfgPUlL7qvPvei08ViH_alE',
  authDomain: 'caisse-epar.firebaseapp.com',
  projectId: 'caisse-epar',
  storageBucket: 'caisse-epar.firebasestorage.app',
  messagingSenderId: '209910654720',
  appId: '1:209910654720:web:99377ab8406f18e6e135e5',
}

const app = getApps().length ? getApp() : initializeApp(firebaseConfig)
const db = getFirestore(app)

export { app, db, firebaseConfig }
export default app
