import { getDatesBetweenDates } from "Functions/leaveFormFunctions";
import { db } from "firebase-config"
import { getDoc, doc, updateDoc, collection, Timestamp } from "firebase/firestore"
import Cookies from "js-cookie";
export const Accept = async (id, users, admin) => {
  const docRef = doc(db, 'leave submssion', id)
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    const detail = docSnap.data()
    let rpm = []
    let status = []
    if (detail.team === 'Delivery') {
      rpm = [...rpm, 'Yuvashini', 'Keerthana',]
      status = [...status, 'L1 approved', 'approved', 'approved']
      let forwardedRpm = rpm.filter((data, index) => (index > 0))
      forwardedRpm.push('')
      let flag = 0;
      let index1 = 0;
      if (Cookies.get('level') === 'L3') {
        detail.reportManager = forwardedRpm[forwardedRpm.length - 1]
        detail.status = status[status.length - 1]
        detail.timestamp = Timestamp.now()
      }
      else {
        rpm.map((data, index) => {
          if (detail.reportManager === data) {
            flag = 1
            index1 = index
          }
        })
        if (flag == 1) {
          detail.reportManager = forwardedRpm[index1]
          detail.status = status[index1]
          detail.timestamp = Timestamp.now()
        }
      }
    }
    else if (detail.team === 'Sales') {
      rpm = [...rpm, 'Balaji', 'Keerthana',]
      status = [...status, 'L1 approved', 'approved', 'approved']
      let forwardedRpm = rpm.filter((data, index) => (index > 0))
      forwardedRpm.push('')
      let flag = 0;
      let index1 = 0;
      if (Cookies.get('level') === 'L3') {
        detail.reportManager = forwardedRpm[forwardedRpm.length - 1]
        detail.status = status[status.length - 1]
        detail.timestamp = Timestamp.now()
      }
      else {
        rpm.map((data, index) => {
          if (detail.reportManager === data) {
            flag = 1
            index1 = index
          }
        })
        if (flag == 1) {
          detail.reportManager = forwardedRpm[index1]
          detail.status = status[index1]
          detail.timestamp = Timestamp.now()
        }
      }
    }
    else if (detail.team === 'HR') {
      rpm = [...rpm, 'Keerthana', 'Gobi']
      status = [...status, 'L1 approved', 'approved']
      status = [...status, 'L1 approved', 'approved', 'approved']
      let forwardedRpm = rpm.filter((data, index) => (index > 0))
      forwardedRpm.push('')
      let flag = 0;
      let index1 = 0;
      if (Cookies.get('level') === 'L3') {
        detail.reportManager = forwardedRpm[forwardedRpm.length - 1]
        detail.status = status[status.length - 1]
        detail.timestamp = Timestamp.now()
      }
      else {
        rpm.map((data, index) => {
          if (detail.reportManager === data) {
            flag = 1
            index1 = index
          }
        })
        if (flag == 1) {
          detail.reportManager = forwardedRpm[index1]
          detail.status = status[index1]
          detail.timestamp = Timestamp.now()
        }
      }
    }
    detail.lopLeaveBalance=[0,0,0,0,0,0,0,0,0,0,0,0]
    detail.earnedLeaveBalance=[0,0,0,0,0,0,0,0,0,0,0,0]
    const userDoc = doc(collection(db, 'leave submssion'), id)
    
    users.map((user) => {
      if (user.name == detail.name && detail.email === user.email && detail.status === 'approved') {
        console.log(user.leaveBalance)
        detail.subLeave=''
        detail.lopBooked=0;
        detail.earnedBooked=0;
        let balanceLeave=[]
        detail.subLeave=[]
        console.log(balanceLeave)
        const dates = getDatesBetweenDates(new Date(detail.from), new Date(detail.to))
        const datesWithoutHolidays = dates.filter(date => (date.getDay() != 5 && date.getDay() != 6))
        let daysInSameMonth = []
        let totalMonth = [new Date(detail.from).getMonth()]
        let sum = 0
        let temp = 0;
        for (let i = 0; i < datesWithoutHolidays.length; i++) {
          var count = 0;
          var month = datesWithoutHolidays[temp].getMonth()
          for (let j = temp; j < datesWithoutHolidays.length; j++) {
            if (datesWithoutHolidays[j].getMonth() === month && detail.session==='FullDay') {
              count++;
            }
            else if(datesWithoutHolidays[j].getMonth() === month && detail.session!=='FullDay'){
              count+=0.5
            }
            else {
              totalMonth.push(datesWithoutHolidays[j].getMonth())
              temp = j;
              break;
            }
          }
          daysInSameMonth.push(count)
          sum += count

          if (sum === datesWithoutHolidays.length) {
            break
          }
        }
        console.log(daysInSameMonth, totalMonth)
        let str = detail.leaveType
        let subLeave = detail.subLeave
        let leave = str.substring(0, str.length - 5).toLocaleLowerCase()
        const key = leave + 'Available';
        if(leave==='flexi'){
          user[key] -= detail.totalDays
        }
        else{
          for (let i = 0; i < daysInSameMonth.length; i++) {
            let totalDays = daysInSameMonth[i]
            const currentMonth = totalMonth[i]
            if (user.leaveBalance[currentMonth] >= totalDays) {
              if (leave === 'flexi') {
                user[key] -= detail.totalDays
              }
               else {
                user[key] += totalDays
              }
            } else if (user.leaveBalance[currentMonth] > 0 && totalDays > user.leaveBalance[currentMonth]) {
              const leaveBalance = totalDays - user.leaveBalance[currentMonth]
              user[key] += totalDays - leaveBalance
              if (user.earnedAvailable >= leaveBalance) {
                user.earnedAvailable = user.earnedAvailable - leaveBalance
                detail.subLeave = [...detail.subLeave,'earned']
                detail.earnedBooked += leaveBalance
                detail.earnedLeaveBalance[currentMonth]=leaveBalance
              }
              else if (user.earnedAvailable > 0 && leaveBalance >= user.earnedAvailable) {
                detail.subLeave =[...detail.subLeave,'both']
                const balanceLop = leaveBalance - user.earnedAvailable
                user.lopAvailable += balanceLop
                detail.lopBooked=balanceLop
                detail.lopLeaveBalance[currentMonth]=balanceLop
                const earnedLeaveBalance = leaveBalance - balanceLop
                user.earnedAvailable -= earnedLeaveBalance
                detail.earnedBooked+=earnedLeaveBalance
                detail.earnedLeaveBalance[currentMonth]=earnedLeaveBalance
              }
              else {
                user.lopAvailable += leaveBalance
                detail.lopBooked+=leaveBalance
                detail.subLeave =[...detail.subLeave,'lop']
                detail.lopLeaveBalance[currentMonth]=leaveBalance
              }
            }
            else if (user.earnedAvailable >= totalDays) {
              detail.subLeave = [...detail.subLeave,'earned']
              detail.earnedBooked +=totalDays
              user.earnedAvailable -= totalDays
              detail.earnedLeaveBalance[currentMonth] = detail.earnedBooked
            }
            else if (user.earnedAvailable > 0 && totalDays >= user.earnedAvailable) {
              detail.subLeave =[...detail.subLeave,'both']
              const balance = totalDays - user.earnedAvailable
              detail.lopBooked += balance
              detail.lopLeaveBalance[currentMonth]=balance
              user.lopAvailable += balance
              const earnedLeave = totalDays - balance
              detail.earnedLeaveBalance[currentMonth]=earnedLeave
              detail.earnedBooked += earnedLeave
              user.earnedAvailable -= earnedLeave
            } else {
              user.lopAvailable += totalDays
              detail.subLeave = [...detail.subLeave,'lop']
              detail.lopBooked += totalDays
              detail.lopLeaveBalance[currentMonth]=totalDays
            }
  
            const remaining = user.leaveBalance[currentMonth] - totalDays
            if (remaining >= 0) {
              user.leaveBalance[currentMonth] = remaining
              for (let i = currentMonth; i < user.leaveBalance.length - 1; i++) {
                user.leaveBalance[i + 1] -= totalDays
              }
            } else {
              for (let i = currentMonth; i < user.leaveBalance.length - 1; i++) {
                user.leaveBalance[i + 1] -= user.leaveBalance[currentMonth]
              }
              user.leaveBalance[currentMonth] = 0
            }
            if(remaining<0 && currentMonth>0 && user.leaveBalance[currentMonth] === 0){
              user.leaveBalance[currentMonth-1]=0
            } 
            console.log(user.leaveBalance, detail)
          }
        }
       
        console.log(user)
        updateDoc(doc(db,'users', user.id), user).catch((err) => {
          console.log(err);
        })
      }
    })
    admin.map((user) => {
      if (user.name == detail.name && detail.email === user.email && detail.status === 'approved') {
        console.log(user.leaveBalance)
        detail.subLeave=''
        detail.lopBooked=0;
        detail.earnedBooked=0;
        let balanceLeave=[]
        detail.subLeave=[]
        console.log(balanceLeave)
        const dates = getDatesBetweenDates(new Date(detail.from), new Date(detail.to))
        const datesWithoutHolidays = dates.filter(date => (date.getDay() != 5 && date.getDay() != 6))
        let daysInSameMonth = []
        let totalMonth = [new Date(detail.from).getMonth()]
        let sum = 0
        let temp = 0;
        for (let i = 0; i < datesWithoutHolidays.length; i++) {
          var count = 0;
          var month = datesWithoutHolidays[temp].getMonth()
          for (let j = temp; j < datesWithoutHolidays.length; j++) {
            if (datesWithoutHolidays[j].getMonth() === month && detail.session==='FullDay') {
              count++;
            }
            else if(datesWithoutHolidays[j].getMonth() === month && detail.session!=='FullDay'){
              count+=0.5
            }
            else {
              totalMonth.push(datesWithoutHolidays[j].getMonth())
              temp = j;
              break;
            }
          }
          daysInSameMonth.push(count)
          sum += count

          if (sum === datesWithoutHolidays.length) {
            break
          }
        }
        console.log(daysInSameMonth, totalMonth)
        let str = detail.leaveType
        let subLeave = detail.subLeave
        let leave = str.substring(0, str.length - 5).toLocaleLowerCase()
        const key = leave + 'Available';
        console.log('leave',leave)
        if(leave==='flexi'){
          user[key] -= detail.totalDays
        }
        else{
          for (let i = 0; i < daysInSameMonth.length; i++) {
            let totalDays = daysInSameMonth[i]
            const currentMonth = totalMonth[i]
            if (user.leaveBalance[currentMonth] >= totalDays) {
             
              if (leave === 'flexi') {
                user[key] -= detail.totalDays
              } else {
                user[key] += totalDays
              }
            } else if (user.leaveBalance[currentMonth] > 0 && totalDays > user.leaveBalance[currentMonth]) {
              const leaveBalance = totalDays - user.leaveBalance[currentMonth]
              user[key] += totalDays - leaveBalance
              if (user.earnedAvailable >= leaveBalance) {
                user.earnedAvailable = user.earnedAvailable - leaveBalance
                detail.subLeave = [...detail.subLeave,'earned']
                detail.earnedBooked += leaveBalance
                detail.earnedLeaveBalance[currentMonth]=leaveBalance
              }
              else if (user.earnedAvailable > 0 && leaveBalance >= user.earnedAvailable) {
                detail.subLeave =[...detail.subLeave,'both']
                const balanceLop = leaveBalance - user.earnedAvailable
                user.lopAvailable += balanceLop
                detail.lopBooked=balanceLop
                detail.lopLeaveBalance[currentMonth]=balanceLop
                const earnedLeaveBalance = leaveBalance - balanceLop
                user.earnedAvailable -= earnedLeaveBalance
                detail.earnedBooked+=earnedLeaveBalance
                detail.earnedLeaveBalance[currentMonth]=earnedLeaveBalance
              }
              else {
                user.lopAvailable += leaveBalance
                detail.lopBooked+=leaveBalance
                detail.subLeave =[...detail.subLeave,'lop']
                detail.lopLeaveBalance[currentMonth]=leaveBalance
              }
            }
            else if (user.earnedAvailable >= totalDays) {
              detail.subLeave = [...detail.subLeave,'earned']
              detail.earnedBooked +=totalDays
              user.earnedAvailable -= totalDays
              detail.earnedLeaveBalance[currentMonth] = detail.earnedBooked
            }
            else if (user.earnedAvailable > 0 && totalDays >= user.earnedAvailable) {
              detail.subLeave =[...detail.subLeave,'both']
              const balance = totalDays - user.earnedAvailable
              detail.lopBooked += balance
              detail.lopLeaveBalance[currentMonth]=balance
              user.lopAvailable += balance
              const earnedLeave = totalDays - balance
              detail.earnedLeaveBalance[currentMonth]=earnedLeave
              detail.earnedBooked += earnedLeave
              user.earnedAvailable -= earnedLeave
            } else {
              user.lopAvailable += totalDays
              detail.subLeave = [...detail.subLeave,'lop']
              detail.lopBooked += totalDays
              detail.lopLeaveBalance[currentMonth]=totalDays
            }
  
            const remaining = user.leaveBalance[currentMonth] - totalDays
            
            if (remaining >= 0) {
              user.leaveBalance[currentMonth] = remaining
              for (let i = currentMonth; i < user.leaveBalance.length - 1; i++) {
                user.leaveBalance[i + 1] -= totalDays
              }
            } else {
              for (let i = currentMonth; i < user.leaveBalance.length - 1; i++) {
                user.leaveBalance[i + 1] -= user.leaveBalance[currentMonth]
              }
              user.leaveBalance[currentMonth] = 0
            }
            if(remaining<=0 && currentMonth>0 && user.leaveBalance[currentMonth] === 0){
              user.leaveBalance[currentMonth-1]=0
            }
            console.log(user.leaveBalance, detail)
          }
        }
        
        console.log(user)
        updateDoc(doc(db,'admin', user.id), user).catch((err) => {
          console.log(err);
        })
      }
    })
    updateDoc(userDoc, detail).then(() => {
    }).catch((err) => {
      console.log(err);
    })
  }
}