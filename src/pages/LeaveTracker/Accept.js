import { db } from "firebase-config"
import { getDoc,doc, updateDoc } from "firebase/firestore"

export const Accept = async(id) =>{
  const docRef = doc(db, 'leave submssion',id)
  const docSnap = await getDoc(docRef);
  if(docSnap.exists()){
    const detail= docSnap.data()
    console.log(detail);
    const name=docSnap.data().name
    const email=docSnap.data().email
    let rpm = []
        if (detail.leaveType === 'Casual leave') {
          detail.casualAvailable = detail.casualAvailable - detail.noofdays
        }
        else if (detail.leaveType === 'Earned leave') {
          detail.earnedAvailable = detail.earnedAvailable - detail.noofdays
        }
        else if (detail.leaveType === 'Leave without pay') {
          detail.lopAvailable = detail.lopAvailable + detail.noofdays
        }
        else if (detail.leaveType === 'Sick leave') {
          detail.sickAvailable = detail.sickAvailable - detail.noofdays
        }
        else if (detail.leaveType === 'Paternity leave') {
          detail.paternityAvailable = detail.paternityAvailable + detail.noofdays
        }

    // let nextRPM=''
    if (detail.team === 'Delivery') {
      rpm = [...rpm, 'Yuvashini', 'Gobi', 'Krishna kumar']
      if (detail.reportManager == 'Keerthana') {
        detail.reportManager = rpm[0];
        detail.L1status = 'accept'
      }
      else if (detail.reportManager == 'Yuvashini') {
        detail.reportManager = rpm[1];
        detail.L2status = 'accept'
      }
      else if (detail.reportManager == 'Gobi') {
        detail.reportManager = rpm[2];
        detail.status = 'accept'
        detail.L3status = 'accept'
      }
      else if (detail.reportManager == 'Krishna kumar') {
        detail.reportManager = ''
        detail.status = 'accept'
        detail.L4status = 'accept'
        detail.reasonOfReject = ''
      }
    }
    else if (detail.team === 'Sales') {
      rpm = [...rpm, 'Balaji', 'Krishna kumar']
      if (detail.reportManager == 'Keerthana') {
        detail.reportManager = rpm[0];
        detail.L1status = 'accept'
      }
      else if (detail.reportManager == 'Balaji') {
        detail.reportManager = rpm[1];
        detail.L2status = 'accept'
      }
      else if (detail.reportManager == 'Krishna kumar') {
        detail.reportManager = ''
        detail.status = 'accept'
        detail.L3status = 'accept'
        detail.reasonOfReject = ''
      }
    }
    else if (detail.team === 'HR') {
      rpm = [...rpm, 'Gobi', 'Krishna kumar']
      if (detail.reportManager == 'Keerthana') {
        detail.reportManager = rpm[0];

        detail.L1status = 'accept'
      }
      else if (detail.reportManager == 'Gobi') {
        detail.reportManager = rpm[1];
        detail.status = 'accept'
        detail.L2status = 'accept'
      }
      else if (detail.reportManager == 'Krishna kumar') {
        detail.reportManager = ''
        detail.status = 'accept'
        detail.L3status = 'accept'
        detail.reasonOfReject = ''
      }
    }
    else if (detail.team === 'Product') {
      rpm = [...rpm, 'Krishna kumar']
      if (detail.reportManager == 'Keerthana') {
        detail.reportManager = rpm[0];
        detail.L1status = 'accept'
      }
      else if (detail.reportManager == 'Krishna kumar') {
        detail.reportManager = ''
        detail.status = 'accept'
        detail.L1status = 'accept'
        detail.reasonOfReject = ''

      }
    }

    

    updateDoc(docRef, detail).then(() => {
      //users.map((user) => {
       // if (user.name == detail.name && detail.email === user.email && detail.reportManager === '') {
          if (detail.leaveType === 'Casual leave') {
            detail.casualAvailable = 12 - detail.casual
            if (detail.casualAvailable <= 0) {
              detail.casualAvailable = 0;
            }
          }
          else if (detail.leaveType === 'Earned leave') {
            detail.earnedAvailable = 12 - detail.earned
            if (detail.earnedAvailable <= 0) {
              detail.earnedAvailable = 0;
            }
          }
          else if (detail.leaveType === 'Sick leave') {
            detail.sickAvailable = 12 - detail.sick
            if (detail.sickAvailable <= 0) {
              detail.sickAvailable = 0;
            }
          }
          else if (detail.leaveType === 'Paternity leave') {
            detail.paternityAvailable = 0 + detail.paternity
          }
          else if (detail.leaveType === 'Leave without pay') {
            detail.lopAvailable = 0 + detail.lop
          }

          const profile = doc(docRef,id)
          updateDoc(profile, detail).then(() => {
            console.log('profile update');
            console.log('added successfully');
          }).catch((err) => {
            console.log(err);
          })
      
    }).catch((err) => {
      console.log(err);
    })
  }
  
}