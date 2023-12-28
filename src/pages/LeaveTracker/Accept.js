import { db } from "firebase-config"
import { getDoc,doc, updateDoc,collection,Timestamp } from "firebase/firestore"

export const Accept = async(id,users,admin) =>{
  // console.log('users:',users,'id:',id,'admin:',admin);
  const userRef=collection(db,'users');
  const adminRef=collection(db,'admin');
  const docRef = doc(db, 'leave submssion',id)
  const docSnap = await getDoc(docRef);
  if(docSnap.exists()){
    const detail= docSnap.data()
    let rpm = []
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
      rpm = [...rpm, 'Keerthana', 'Gobi', 'Krishna kumar']
      if (detail.reportManager == 'Yuvashini') {
        detail.reportManager = '';
        detail.L1status = 'accept'
        detail.status = 'accept'
        detail.L2status='Keerthana'
        detail.L3status='Gobi'
        detail.kstatus='Krishna kumar'
        detail.timestamp=Timestamp.now()
      }
    }
    else if (detail.team === 'Sales') {
      rpm = [...rpm, 'Keerthana', 'Krishna kumar']
      if (detail.reportManager == 'Balaji') {
        detail.reportManager = '';
        detail.L1status = 'accept'
        detail.status = 'accept'
        detail.L2status='Keerthana'
        detail.kstatus='Krishna kumar'
        detail.timestamp=Timestamp.now()
      }
    }
    // else if (detail.team === 'HR') {
    //   rpm = [...rpm, 'Gobi', 'Krishna kumar']
    //   if (detail.reportManager == 'Keerthana') {
    //     detail.reportManager = rpm[0];

    //     detail.L1status = 'accept'
    //   }
    //   else if (detail.reportManager == 'Gobi') {
    //     detail.reportManager = rpm[1];
    //     detail.status = 'accept'
    //     detail.L2status = 'accept'
    //   }
    //   else if (detail.reportManager == 'Krishna kumar') {
    //     detail.reportManager = ''
    //     detail.status = 'accept'
    //     detail.L3status = 'accept'
    //     detail.reasonOfReject = ''
    //   }
    // }
    // else if (detail.team === 'Product') {
    //   rpm = [...rpm, 'Krishna kumar']
    //   if (detail.reportManager == 'Keerthana') {
    //     detail.reportManager = rpm[0];
    //     detail.L1status = 'accept'
    //   }
    //   else if (detail.reportManager == 'Krishna kumar') {
    //     detail.reportManager = ''
    //     detail.status = 'accept'
    //     detail.L1status = 'accept'
    //     detail.reasonOfReject = ''

    //   }
    // }

    const userDoc = doc(collection(db,'leave submssion'), id)

    updateDoc(userDoc, detail).then(() => {
      users.map((user) => {
        if (user.name == detail.name && detail.email === user.email && detail.reportManager === '') {
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
        if (user.name == detail.name && detail.email === user.email && detail.reportManager === '') {
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