// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// TODO: store api key to .env file
const firebaseConfig = {
  apiKey: 'AIzaSyBwfVYa5XMOm9Q97Bvm0Qd7sK7zU-iNTxw',
  authDomain: 'video-823ea.firebaseapp.com',
  projectId: 'video-823ea',
  storageBucket: 'video-823ea.appspot.com',
  messagingSenderId: '961303693512',
  appId: '1:961303693512:web:31b0721a2331ec99737dfd'
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const auth = getAuth()
export const provider = new GoogleAuthProvider()
export default app