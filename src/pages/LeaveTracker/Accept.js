import { db } from "firebase-config"
import { getDoc,doc, updateDoc,collection,Timestamp } from "firebase/firestore"
import Cookies from "js-cookie";
export const Accept = async(id,users,admin) =>{
  // console.log('users:',users,'id:',id,'admin:',admin);
  const userRef=collection(db,'users');
  const adminRef=collection(db,'admin');
  const docRef = doc(db, 'leave submssion',id)
  const docSnap = await getDoc(docRef);
  if(docSnap.exists()){
    const detail= docSnap.data()
    let rpm = []
    let status=[]
    users.map((user) => {
      if (user.name == detail.name && detail.email === user.email) {
        if (detail.leaveType === 'Casual leave') {
          user.casualAvailable = user.casualAvailable - 1
        }
        else if (detail.leaveType === 'Earned leave') {
          user.earnedAvailable = user.earnedAvailable - 1
        }
        else if (detail.leaveType === 'Leave without pay') {
          user.lopAvailable = user.lopAvailable + 1
        }
        else if (detail.leaveType === 'Sick leave') {
          user.sickAvailable = user.sickAvailable - 1
        }
        else if (detail.leaveType === 'Paternity leave') {
          user.paternityAvailable = user.paternityAvailable + 1
        }
      }
    })


    admin.map((user) => {
      if (user.name == detail.name && detail.email === user.email) {
        if (detail.leaveType === 'Casual leave') {
          user.casualAvailable = user.casualAvailable - 1
        }
        else if (detail.leaveType === 'Earned leave') {
          user.earnedAvailable = user.earnedAvailable - 1
        }
        else if (detail.leaveType === 'Leave without pay') {
          user.lopAvailable = user.lopAvailable + 1
        }
        else if (detail.leaveType === 'Sick leave') {
          user.sickAvailable = user.sickAvailable - 1
        }
        else if (detail.leaveType === 'Paternity leave') {
          user.paternityAvailable = user.paternityAvailable + 1
        }
      }
    })
    if (detail.team === 'Delivery') {
      rpm = [...rpm,'Yuvashini', 'Keerthana', 'Gobi']
      status=[...status,'L1 approved','approved','approved']
      const forwardedRpm=rpm.filter((data,index)=>(index>0))
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
      rpm = [...rpm,'Balaji', 'Keerthana', 'Krishna kumar']
      status=[...status,'L1 approved','approved','approved']
      const forwardedRpm=rpm.filter((data,index)=>index>0).push('')
      forwardedRpm.push('')
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
      const forwardedRpm=rpm.filter((data,index)=>index>0)
      if(Cookies.get('level')==='L3'){
        detail.reportManager=forwardedRpm[forwardedRpm.length-1]
        detail.status=status[status.length-1]
        detail.timestamp=Timestamp.now()
      }
      else{
      forwardedRpm.push('')
      let flag=0;
      let index1=0;
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
 
    console.log(detail)

    const userDoc = doc(collection(db,'leave submssion'), id)

    updateDoc(userDoc, detail).then(() => {
      users.map((user) => {
        if (user.name == detail.name && detail.email === user.email && detail.status === 'approved') {
          if (detail.leaveType === 'Casual leave') {
            user.casualAvailable = 12 - user.casual
            if (user.casualAvailable <= 0) {
              user.casualAvailable = 0;
            }
          }
          else if (detail.leaveType === 'Earned leave') {
            user.earnedAvailable = 12 - user.earned
            if (user.earnedAvailable <= 0) {
              user.earnedAvailable = 0;
            }
          }
          else if (detail.leaveType === 'Sick leave') {
            user.sickAvailable = 12 - user.sick
            if (user.sickAvailable <= 0) {
              user.sickAvailable = 0;
            }
          }
          else if (detail.leaveType === 'Paternity leave') {
            user.paternityAvailable = 0 + user.paternity
          }
          else if (detail.leaveType === 'Leave without pay') {
            user.lopAvailable = 0 + user.lop
          }

          const profile = doc(userRef, user.id)
          updateDoc(profile, user).then(() => {
            console.log('profile update');

          }).catch((err) => {
            console.log(err);
          })

        }
      })

      admin.map((user) => {
        if (user.name == detail.name && detail.email === user.email && detail.status === 'approved') {
          if (detail.leaveType === 'Casual leave') {
            console.log(user.casualAvailable);
            user.casualAvailable = 12 - user.casual
            if (user.casualAvailable <= 0) {
              user.casualAvailable = 0;
            }
          }
          else if (detail.leaveType === 'Earned leave') {
            user.earnedAvailable = 12 - user.earned
            if (user.earnedAvailable <= 0) {
              user.earnedAvailable = 0;
            }
          }
          else if (detail.leaveType === 'Sick leave') {
            user.sickAvailable = 12 - user.sick
            if (user.sickAvailable <= 0) {
              user.sickAvailable = 0;
            }
          }
          else if (detail.leaveType === 'Paternity leave') {
            user.paternityAvailable = 0 + user.paternity
          }
          else if (detail.leaveType === 'Leave without pay') {
            user.lopAvailable = 0 + user.lop
          }

          const profile = doc(adminRef, user.id)
          updateDoc(profile, user).then(() => {
            console.log('profile updated in admin');

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