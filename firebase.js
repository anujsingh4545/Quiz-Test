import { initializeApp, getApps, getApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: 'AIzaSyBpK71SoLLo6Y_1qoHlcn5weIF_YSx4s5A',
  authDomain: 'quiz-app-95f9b.firebaseapp.com',
  projectId: 'quiz-app-95f9b',
  storageBucket: 'quiz-app-95f9b.appspot.com',
  messagingSenderId: '968101418220',
  appId: '1:968101418220:web:b07dc7c30cbd673b0f41c9',
}

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()

const db = getFirestore()
const storage = getStorage()

export { app, db, storage }
