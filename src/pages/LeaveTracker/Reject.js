import { db } from "firebase-config"
import { getDoc,doc, updateDoc } from "firebase/firestore"
import RejectModal from "components/Common/RejectModal";
import React from "react";

export const Reject = async (id) => {
  console.log(id);
  // const collectionRef = collection(db,'leave submssion')

  const docRef = doc(db, 'leave submssion',id)
  
  const docSnap = await getDoc(docRef);
  if(docSnap.exists()){
    const detail= docSnap.data()
     let rpm = []
  let nextRPM=''

  if (detail.team === 'Delivery'){
    rpm = [...rpm, 'Yuvashini', 'Gobi', 'Krishna kumar']
    if (detail.reportManager == 'Keerthana') {
      detail.reportManager = rpm[0];
      detail.L1status = 'reject'
      // detail.reasonOfReject = reason
    }
    else if (detail.reportManager == 'Yuvashini') {
      detail.reportManager = rpm[1];
      detail.L1status = 'reject'
      // detail.reasonOfReject = reason
    }
    else if (detail.reportManager == 'Gobi') {
      detail.reportManager = rpm[2];
      detail.status = 'reject'
      detail.L2status = 'reject'
      // detail.reasonOfReject = reason
    }
    else if (detail.reportManager == 'Krishna kumar') {
      detail.reportManager = ''
      detail.status = 'reject'
      detail.L3status = 'reject'
      // detail.reasonOfReject = reason
    }
  }

  else if (detail.team === 'Sales') {
    rpm = [...rpm, 'Balaji', 'Krishna kumar']
    if (detail.reportManager == 'Keerthana') {
      detail.reportManager = rpm[0];
      detail.L1status = 'reject'
      // detail.reasonOfReject = reason
    }
    else if (detail.reportManager == 'Balaji') {
      detail.reportManager = rpm[1];
      detail.L2status = 'reject'
      // detail.reasonOfReject = reason
    }
    else if (detail.reportManager == 'Krishna kumar') {
      detail.reportManager = ''
      detail.status = 'reject'
      detail.L3status = 'reject'
      // detail.reasonOfReject = reason
    }
  }
  
  else if (detail.team === 'HR') {
    rpm = [...rpm, 'Gobi', 'Krishna kumar']
    if (detail.reportManager == 'Keerthana') {
      detail.reportManager = rpm[0]
      // detail.reasonOfReject = reason
    }
    else if (detail.reportManager == 'Gobi') {
      detail.reportManager = rpm[1];
      detail.status = 'reject'
      detail.L1status = 'reject'
      // detail.reasonOfReject = reason
    }
    else if (detail.reportManager == 'Krishna kumar') {
      detail.reportManager = ''
      detail.status = 'reject'
      detail.L2status = 'reject'
      // detail.reasonOfReject = reason
    }
    // else if(detail.level=='L3'){
    //     detail.reportManager=rpm[0];
    // }
  }
  else if (detail.team === 'Product') {
    rpm = [...rpm, 'Krishna kumar']
    if (detail.reportManager == 'Keerthana') {
      detail.reportManager = rpm[0]
      detail.L1status = 'reject'
      // detail.reasonOfReject = reason
    }
    else if (detail.reportManager == 'Krishna kumar') {
      detail.reportManager = ''
      detail.status = 'reject'
      detail.L2status = 'reject'
      // detail.reasonOfReject = reason
    }
  }
  
  updateDoc(docRef, detail).then(() => {
    console.log('rejected successfully');
    // document.getElementById('overlay').style.display = 'none'
    // document.getElementById(detail.id).style.display = 'none'
    // localStorage.setItem('count', localStorage.getItem('count') - 1)
  }).catch((err) => {
    console.log(err);
  })
  }
}

// export const Rejectbox = (id) => {
//   return <RejectModal/>
// }

