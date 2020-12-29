import firebase from 'firebase/app'
import 'firebase/auth'

const firebaseConfig = {
    apiKey: 'AIzaSyD_7XxZrpPLne5ciqgE_JqbBqQtyzTTR3Q',
    authDomain: 'xpert-sankhia.firebaseapp.com',
    projectId: 'xpert-sankhia',
    storageBucket: 'xpert-sankhia.appspot.com',
    messagingSenderId: '438802009130',
    appId: '1:438802009130:web:19d522d9c91670f523c753',
    measurementId: 'G-JLXD9K29T4',
}

const fireApp = firebase.initializeApp(firebaseConfig)

export const storage = fireApp
    .storage()
    .refFromURL('gs://xpert-sankhia.appspot.com/')
export default fireApp
