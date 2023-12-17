import {initializeApp} from "firebase/app";
import {getAuth}from "firebase/auth"
import {getFirestore} from 'firebase/firestore'
import {getDownloadURL,getStorage,ref,uploadBytes} from 'firebase/storage'
const firebaseConfig = {

  apiKey: "AIzaSyC3QJGdNdbzPRoi5usIcbGqGjA9jWl4AtY",

  authDomain: "sst-lsm.firebaseapp.com",

  projectId: "sst-lsm",

  storageBucket: "sst-lsm.appspot.com",

  messagingSenderId: "743685208691",

  appId: "1:743685208691:web:249e83e08e9f0fa2190806",

  measurementId: "G-ZKMJGYD2K1"

};



  const app = initializeApp(firebaseConfig);
  const db=getFirestore(app)
  const auth = getAuth(app); 
  const storage=getStorage()
// export const user = JSON.parse(sessionStorage.getItem('uid'))
   
    // updateProfile(user,{photoURL:profileURL})

 
  export {auth,db ,storage}

