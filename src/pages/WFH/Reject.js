import { db } from "firebase-config"
import { getDoc,doc, updateDoc } from "firebase/firestore"
import Cookies from "js-cookie";
import RejectModal from "components/Common/RejectModal";
import React from "react";
import { Timestamp } from "firebase/firestore";
export const Reject = async (id,reason) => {
 
  const docRef = doc(db, 'WFH',id)
  
  const docSnap = await getDoc(docRef);
  if(docSnap.exists()){
    const detail= docSnap.data()
     let rpm = []
     let status=[]

     if (detail.team === 'Delivery') {
      rpm = [...rpm,'Yuvashini', 'Keerthana', 'Gobi']
      status=[...status,'denied','denied','denied']
      const forwardedRpm=rpm.filter((data,index)=>(index>0))
      forwardedRpm.push('')
      let flag=0;
      let index1=0;
      if(Cookies.get('level')==='L3'){
        detail.reportManager=forwardedRpm[forwardedRpm.length-1]
        detail.status=status[status.length-1]
        detail.reasonOfReject = reason
        detail.timestamp = Timestamp.now()
      }
      else{
        rpm.map((data,index)=>{
          if(detail.reportManager===data){
            flag=1
            index1=index
          }
        })
        if(flag==1){
          detail.reportManager=forwardedRpm[forwardedRpm.length-1]
            detail.status=status[index1]
            detail.reasonOfReject = reason
            detail.timestamp = Timestamp.now()
        }
      } 
    }
  else if (detail.team === 'Sales') {
    rpm = [...rpm,'Balaji', 'Keerthana', 'Krishna kumar']
    status=[...status,'denied','denied','denied']
    const forwardedRpm=rpm.filter((data,index)=>(index>0))
    forwardedRpm.push('')
    let flag=0;
    let index1=0;
    if(Cookies.get('level')==='L3'){
      detail.reportManager=forwardedRpm[forwardedRpm.length-1]
      detail.status=status[status.length-1]
      detail.reasonOfReject = reason
      detail.timestamp = Timestamp.now()
    }
    else{
      rpm.map((data,index)=>{
        if(detail.reportManager===data){
          flag=1
          index1=index
        }
      })
      if(flag==1){
        detail.reportManager=forwardedRpm[forwardedRpm.length-1]
          detail.status=status[index1]
          detail.reasonOfReject = reason
          detail.timestamp = Timestamp.now()
      }
    } 
  }
  else if (detail.team === 'HR') {
    rpm = [...rpm,'Keerthana', 'Gobi']
    status=[...status,'denied','denied',]
    const forwardedRpm=rpm.filter((data,index)=>(index>0))
    forwardedRpm.push('')
    let flag=0;
    let index1=0;
    if(Cookies.get('level')==='L3'){
      detail.reportManager=forwardedRpm[forwardedRpm.length-1]
      detail.status=status[status.length-1]
      detail.reasonOfReject = reason
      detail.timestamp = Timestamp.now()
    }
    else{
      rpm.map((data,index)=>{
        if(detail.reportManager===data){
          flag=1
          index1=index
        }
      })
      if(flag==1){
        detail.reportManager=forwardedRpm[forwardedRpm.length-1]
        detail.status=status[index1]
        detail.reasonOfReject = reason
        detail.timestamp = Timestamp.now()
      }
    } 
  }
  
  updateDoc(docRef, detail).then(() => {
    console.log('rejected successfully');
  }).catch((err) => {
    console.log(err);
  })
  }
}


