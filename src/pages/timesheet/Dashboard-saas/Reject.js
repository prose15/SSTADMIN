import { db } from "firebase-config"
import { getDoc,doc, updateDoc } from "firebase/firestore"
import Cookies from "js-cookie"

export const Reject=async(id)=>{
  const level=Cookies.get('level')
  console.log(id)
  const docRef=doc(db,'timesheet',id)
  const docSnap=await getDoc(docRef)
  if(docSnap.exists){

    if(docSnap.data().team==='Delivery'){
      if(Cookies.get('team')==='Delivery'){
        if(level=='L2'){
       await updateDoc(docRef,{L2status:'reject',status:'failed'}).then(()=>{
            console.log('rejected');
            nav('/timesheet/requests')
  
        }).catch((err)=>{
            console.log(err);
        })
    }
        else if(level=='L3'){
          await  updateDoc(docRef,{L3status:'reject',status:'failed'}).then(()=>{
                console.log('rejected');
                nav('/timesheet/requests')
            }).catch((err)=>{
                console.log(err);
            })
        }
      }
    }

        else if(Cookies.get('team')=='Product'){
          if(level=='L2'){
            await  updateDoc(docRef,{L4status:'reject',status:'failed'}).then(()=>{
              console.log('rejected');
              nav('/timesheet/requests')
          }).catch((err)=>{
              console.log(err);
          })
          }
        }

   if(docSnap.data().team==='Product'){
   if(Cookies.get('team')=='Product'){
    if(level=='L2'){
      await updateDoc(docRef,{L2status:'reject',status:'failed'}).then(()=>{
          //  console.log('accepted');
           nav('/timesheet/requests')
       }).catch((err)=>{
           console.log(err);
       })
   }
  }
    }
}
}
