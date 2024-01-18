import {initializeApp} from "firebase/app";
import {getAuth}from "firebase/auth"
import {getFirestore} from 'firebase/firestore'
import {getMessaging, getToken, onMessage} from 'firebase/messaging'
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
  const messaging = getMessaging(app)
  export {auth,db ,storage ,messaging}
  export const requestPermission= async()=>{
   const permission=await Notification.requestPermission()
      if(permission==='granted'){
        console.log('permission granted')
        const token=await getToken(messaging,{
          vapidKey:"BLX_Cgc9zYvyOHjzZj6EikSyvdqkiwIMtas5NnN0kezZta6WxmIi-tM3Wj6NXgttiVfnhaqyZIIenSgPZHZdXM0" 
        }
        )
        console.log(token)
      }
      else{
        console.log('permission denied')
      }
    

    
  }
 

