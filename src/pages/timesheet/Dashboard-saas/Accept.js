import { db } from "firebase-config"
import { getDoc,doc, updateDoc } from "firebase/firestore"
import Cookies from "js-cookie"
import { useNavigate } from "react-router-dom"

export const Accept=async(id)=>{
  
  const level=Cookies.get('level')
  const docRef=doc(db,'timesheet',id)
  const docSnap=await getDoc(docRef)
  if(docSnap.exists){

  if(docSnap.data().team==='Delivery'){
  if(Cookies.get('team')==='Delivery'){
  if(level=='L1'){
 await updateDoc(docRef,{L1status:'accept'}).then(()=>{
  }).catch((err)=>{
      console.log(err);
  })
}
  else if(level=='L3'){
    await  updateDoc(docRef,{L3status:'accept',status:'accept'}).then(()=>{
      }).catch((err)=>{
          console.log(err);
      })
  }
}
}

  else if(Cookies.get('team')=='Product'){
    if(level=='L2'){
      await  updateDoc(docRef,{L4status:'accept',status:'accept'}).then(()=>{
        console.log('accepted');
    }).catch((err)=>{
        console.log(err);
    })
    } 
  }
if(docSnap.data().team==='Product'){
if(Cookies.get('team')=='Product'){
  if(level=='L2'){
    await updateDoc(docRef,{L2status:'accept',status:'accept'}).then(()=>{
         console.log('accepted');
     }).catch((err)=>{
         console.log(err);
     })
 }
}
}
}
}
