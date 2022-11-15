import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
import {getAuth} from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyCQKIe70TZMhqr9ojUWs5PJjYBuUbnebVA",
  authDomain: "appteste-7520c.firebaseapp.com",
  projectId: "appteste-7520c",
  storageBucket: "appteste-7520c.appspot.com",
  messagingSenderId: "240474825083",
  appId: "1:240474825083:web:385c45f13db26ecc6d9dde"
};

const firebaseApp = initializeApp(firebaseConfig)

const db = getFirestore(firebaseApp)
const auth = getAuth(firebaseApp)

export { db, auth }