import { initializeApp } from 'firebase/app'
import { collection, getFirestore } from 'firebase/firestore'
const firebaseConfig = {
  apiKey: 'AIzaSyAUmuyRXUWKaagB-e_WFvZu7OaHILJnXdc',
  authDomain: 'markdown-notes-d95b1.firebaseapp.com',
  projectId: 'markdown-notes-d95b1',
  storageBucket: 'markdown-notes-d95b1.appspot.com',
  messagingSenderId: '332376017428',
  appId: '1:332376017428:web:a330c7356351ad1611f501',
}

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
export const notesCollection = collection(db, 'notes')

