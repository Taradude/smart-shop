import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyAvsoED8njlUMTEK5USOMciufXjYaveV1c',
  authDomain: 'smart-shop-ea227.firebaseapp.com',
  projectId: 'smart-shop-ea227',
  storageBucket: 'smart-shop-ea227.appspot.com',
  messagingSenderId: '530124184752',
  appId: '1:530124184752:web:c8b70d4f2365aa006c2f75',
}

const app = initializeApp(firebaseConfig)

// const auth = getAuth(firebaseConfig)
