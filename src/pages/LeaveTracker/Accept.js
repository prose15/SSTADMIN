import { db } from "firebase-config"
import { getDoc,doc, updateDoc,collection,Timestamp } from "firebase/firestore"
import Cookies from "js-cookie";
export const Accept = async(id,users,admin) =>{
  const docRef = doc(db, 'leave submssion',id)
  const docSnap = await getDoc(docRef);
  if(docSnap.exists()){
    const detail= docSnap.data()
    let rpm = []
    let status=[]
    if (detail.team === 'Delivery') {
      rpm = [...rpm,'Yuvashini', 'Keerthana',]
      status=[...status,'L1 approved','approved','approved']
      let forwardedRpm=rpm.filter((data,index)=>(index>0))
      forwardedRpm.push('')
      console.log('arr',forwardedRpm)
      let flag=0;
      let index1=0;
      if(Cookies.get('level')==='L3'){
        detail.reportManager=forwardedRpm[forwardedRpm.length-1]
        detail.status=status[status.length-1]
        detail.timestamp=Timestamp.now()
      }
      else{
        rpm.map((data,index)=>{
          if(detail.reportManager===data){
            flag=1
            index1=index
          }
        })
        if(flag==1){
          detail.reportManager=forwardedRpm[index1]
            detail.status=status[index1]
            detail.timestamp=Timestamp.now()
        }
      } 
    }
    else if (detail.team === 'Sales') {
      rpm = [...rpm,'Balaji', 'Keerthana',]
      status=[...status,'L1 approved','approved','approved']
      let forwardedRpm=rpm.filter((data,index)=>(index>0))
      forwardedRpm.push('')
      console.log('arr',forwardedRpm)
      let flag=0;
      let index1=0;
      if(Cookies.get('level')==='L3'){
        detail.reportManager=forwardedRpm[forwardedRpm.length-1]
        detail.status=status[status.length-1]
        detail.timestamp=Timestamp.now()
      }
      else{
        rpm.map((data,index)=>{
          if(detail.reportManager===data){
            flag=1
            index1=index
          }
        })
        if(flag==1){
          detail.reportManager=forwardedRpm[index1]
            detail.status=status[index1]
            detail.timestamp=Timestamp.now()
        }
      } 
    }
    else if (detail.team === 'HR') {
      rpm = [...rpm,'Keerthana', 'Gobi']
      status=[...status,'L1 approved','approved']
      status=[...status,'L1 approved','approved','approved']
      let forwardedRpm=rpm.filter((data,index)=>(index>0))
      forwardedRpm.push('')
      console.log('arr',forwardedRpm)
      let flag=0;
      let index1=0;
      if(Cookies.get('level')==='L3'){
        detail.reportManager=forwardedRpm[forwardedRpm.length-1]
        detail.status=status[status.length-1]
        detail.timestamp=Timestamp.now()
      }
      else{
        rpm.map((data,index)=>{
          if(detail.reportManager===data){
            flag=1
            index1=index
          }
        })
        if(flag==1){
          detail.reportManager=forwardedRpm[index1]
            detail.status=status[index1]
            detail.timestamp=Timestamp.now()
        }
      }   
      }
    const userDoc = doc(collection(db,'leave submssion'), id)
    updateDoc(userDoc, detail).then(() => {
      users.map((user) => {
        if (user.name == detail.name && detail.email === user.email && detail.status === 'approved') {
          let str=detail.leaveType
          let subLeave=detail.subLeave
          let leave = str.substring(0,str.length-5).toLocaleLowerCase()
          if(leave==='flexi'){
            user[leave+'Available']-=detail.totalDays
          }else{
            user[leave+'Available']+=detail.noofdays 
            if(subLeave==='both'){
              user.lopAvailable=user.lopAvailable+detail.lopBooked
              user.earnedAvailable=user.earnedAvailable-detail.earnedBooked
            }
           else if(subLeave==='lop'){
              user.lopAvailable=user.lopAvailable+detail.lopBooked
             }else if(subLeave==='earned'){
               user.earnedAvailable=user.earnedAvailable-detail.earnedBooked
             }
          }
             
          updateDoc(doc(db,'users', user.id), user).then(() => {
            console.log('profile update');
          }).catch((err) => {
            console.log(err);
          })
        }
      })
      admin.map((user) => {
        if (user.name == detail.name && detail.email === user.email && detail.status === 'approved') {
          let str=detail.leaveType
          let subLeave=detail.subLeave
          console.log(subLeave)
          let leave = str.substring(0,str.length-5).toLocaleLowerCase()
          if(leave==='flexi'){
            user[leave+'Available']-=detail.totalDays
          }else{
            user[leave+'Available']+=detail.noofdays 
            if(subLeave==='both'){
              user.lopAvailable=user.lopAvailable+detail.lopBooked
              user.earnedAvailable=user.earnedAvailable-detail.earnedBooked
            }
            else if(subLeave==='lop'){
              user.lopAvailable=user.lopAvailable+detail.lopBooked
             }else if(subLeave==='earned'){
               user.earnedAvailable=user.earnedAvailable-detail.earnedBooked
             } 
          }
           
          updateDoc(doc(db,'admin', user.id), user).then(() => {
            console.log('profile update');

          }).catch((err) => {
            console.log(err);
          })
        }
      })
      console.log('added successfully');
    }).catch((err) => {
      console.log(err);
    })
  }
}