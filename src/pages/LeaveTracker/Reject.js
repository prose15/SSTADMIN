import { db } from "firebase-config"
import { getDoc,doc, updateDoc } from "firebase/firestore"
import RejectModal from "components/Common/RejectModal";
import React from "react";
import { Timestamp } from "firebase/firestore";
export const Reject = async (id,reason) => {
 
  const docRef = doc(db, 'leave submssion',id)
  
  const docSnap = await getDoc(docRef);
  if(docSnap.exists()){
    const detail= docSnap.data()
     let rpm = []
  let nextRPM=''

  if (detail.team === 'Delivery') {
    rpm = [...rpm, 'Keerthana', 'Gobi', 'Krishna kumar']
    if (detail.reportManager == 'Yuvashini') {
      detail.reportManager = '';
      detail.L1status = 'reject'
      detail.status = 'reject'
      detail.L2status='Keerthana'
      detail.L3status='Gobi'
      detail.kstatus='Krishna kumar'
      detail.reasonOfReject=reason
      detail.timestamp=Timestamp.now()
    }
  }
  else if (detail.team === 'Sales') {
    rpm = [...rpm, 'Keerthana', 'Krishna kumar']
    if (detail.reportManager == 'Balaji') {
      detail.reportManager = '';
      detail.L1status = 'reject'
      detail.status = 'reject'
      detail.L2status='Keerthana'
      detail.kstatus='Krishna kumar'
      detail.reasonOfReject=reason
      detail.timestamp=Timestamp.now()
    }
  }
  
  // else if (detail.team === 'HR') {
  //   rpm = [...rpm, 'Gobi', 'Krishna kumar']
  //   if (detail.reportManager == 'Keerthana') {
  //     detail.reportManager = rpm[0]
  //     detail.reasonOfReject = reason
  //   }
  //   else if (detail.reportManager == 'Gobi') {
  //     detail.reportManager = rpm[1];
  //     detail.status = 'reject'
  //     detail.L1status = 'reject'
  //     detail.reasonOfReject = reason
  //   }
  //   else if (detail.reportManager == 'Krishna kumar') {
  //     detail.reportManager = ''
  //     detail.status = 'reject'
  //     detail.L2status = 'reject'
  //     detail.reasonOfReject = reason
  //   }
  //   // else if(detail.level=='L3'){
  //   //     detail.reportManager=rpm[0];
  //   // }
  // }
  // else if (detail.team === 'Product') {
  //   rpm = [...rpm, 'Krishna kumar']
  //   if (detail.reportManager == 'Keerthana') {
  //     detail.reportManager = rpm[0]
  //     detail.L1status = 'reject'
  //     detail.reasonOfReject = reason
  //   }
  //   else if (detail.reportManager == 'Krishna kumar') {
  //     detail.reportManager = ''
  //     detail.status = 'reject'
  //     detail.L2status = 'reject'
  //     detail.reasonOfReject = reason
  //   }
  // }
  
  updateDoc(docRef, detail).then(() => {
    console.log('rejected successfully');
  }).catch((err) => {
    console.log(err);
  })
  }
}


