import { db } from "firebase-config"
import { getDoc,doc, updateDoc } from "firebase/firestore"
import Cookies from "js-cookie"

export const Accept=async(id)=>{
  const level=Cookies.get('level')
  const docRef=doc(db,'timesheet',id)
  const docSnap=await getDoc(docRef)
  const status = level+'status'
  if(docSnap.exists){
  if(Cookies.get('name')==='Krishna kumar'){
    await updateDoc(docRef,{L4status:'accept'}).catch((err)=>{
      console.log(err)
    })
  }else{
    const data = docSnap.data()
    data[status]='accept'
    if(data.L1status === 'accept' && data.L3status==='accept'){
      data.L4status='accept'
      data.status='approved'
    }
    await updateDoc(docRef,data).catch((err)=>{
      console.log(err)
    })
  }
}
}
