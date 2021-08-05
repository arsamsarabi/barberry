import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'

import type { UserProfile } from '#types/user'
// import avatars from '#constants/avatars'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGE_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  databaseURL: import.meta.env.VITE_FIREBASE_DB_URL,
}

let app
if (firebase.apps.length) {
  app = firebase.app()
} else {
  app = firebase.initializeApp(firebaseConfig)
}

export const storage = firebase.storage().ref('avatars')
export const auth = app.auth()
export const db = app.firestore()
export default app
export type UserType = firebase.User

export const createUserProfile = async (user: UserType): Promise<unknown> => {
  return await db.collection('profiles').add({
    userId: user.uid,
    email: user.email,
    displayName: user.displayName,
    createdTime: user.metadata.creationTime,
    lastSignInTime: user.metadata.lastSignInTime,
    avatar: user.photoURL || '',
  })
}

export const fetchUserProfile = async (userId: string): Promise<unknown> => {
  return await db
    .collection('profiles')
    .where('userId', '==', userId)
    .get()
    .then(querySnapshot => {
      const arr: any[] = []
      querySnapshot.docs.map(doc => arr.push({ id: doc.id, value: doc.data() }))
      return arr
    })
}

export const patchUserProfile = async ({
  id,
  ...rest
}: Partial<UserProfile>): Promise<unknown> => {
  return await db.collection('profiles').doc(id).set(rest)
}
