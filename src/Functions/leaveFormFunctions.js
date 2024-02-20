import { db } from "firebase-config"
import { getDoc, doc, deleteDoc, updateDoc } from "firebase/firestore"
export function getDatesBetweenDates(startDate, endDate) {
  const dates = [];
  for (let date = startDate; date <= endDate; date.setDate(date.getDate() + 1)) {
    dates.push(new Date(date));
  }
  return dates;
}
export const SplitMonth = (fromDate) => {
  const getMonth = fromDate.substring(5, 7)
  return getMonth
}
export const handleRevoke = async (userProfile, currentMonth, filterData, leaveData) => {
  const sortedLopData = filterData.filter(data => !data.subLeave.includes('earned'))
  const sortedEarnedData = filterData.filter(data => data.subLeave.includes('earned'))
  sortedLopData.sort(function (a, b) {
    if (a.lopLeaveBalance[currentMonth] > b.lopLeaveBalance[currentMonth]) return -1
    if (a.lopLeaveBalance[currentMonth] < b.lopLeaveBalance[currentMonth]) return 1
  })
  console.log(sortedLopData, sortedEarnedData)
  filterData = [...sortedLopData, ...sortedEarnedData]
  console.log(filterData)
  for (let i = 0; i < filterData.length; i++) {
    console.log(userProfile.lopAvailable, userProfile.earnedAvailable)
    const data = filterData[i]
    // const availableLeave = userProfile.leaveBalance[currentMonth]
    console.log('before', data.lopLeaveBalance[currentMonth], data.earnedLeaveBalance[currentMonth])
    if (data.lopLeaveBalance[currentMonth] > 0 && data.earnedLeaveBalance[currentMonth] > 0) {
      console.log('both')
      const remaining = userProfile.leaveBalance[currentMonth] - data.lopLeaveBalance[currentMonth]
      console.log('remaining', remaining)
      if (remaining >= 0) {
        for (let i = currentMonth; i < userProfile.leaveBalance.length; i++) {
          userProfile.leaveBalance[i] -= data.lopLeaveBalance[currentMonth]
        }
        userProfile.lopAvailable -= data.lopLeaveBalance[currentMonth]
        console.log(userProfile.lopAvailable)
        data.lopLeaveBalance[currentMonth] = 0
      } else {
        const balance = data.lopLeaveBalance[currentMonth] - userProfile.leaveBalance[currentMonth]
        for (let i = currentMonth; i < userProfile.leaveBalance.length; i++) {
          userProfile.leaveBalance[i] -= userProfile.leaveBalance[currentMonth]
        }
        userProfile.lopAvailable -= userProfile.leaveBalance[currentMonth]
        data.lopLeaveBalance[currentMonth] -= userProfile.leaveBalance[currentMonth]
        console.log(balance)
        if (userProfile.earnedAvailable > balance) {
          const outOfRemaining = userProfile.earnedAvailable - balance
          if (outOfRemaining > 0) {
            userProfile.earnedAvailable -= balance
            userProfile.lopAvailable -= balance
            data.lopLeaveBalance[currentMonth] -= balance
          }
        }
      }
      if (userProfile.leaveBalance[currentMonth] > 0) {
        console.log('iniside earnedLEave of both')
        const remainingEarnedLeave = userProfile.leaveBalance[currentMonth] - data.earnedLeaveBalance[currentMonth]
        if (remainingEarnedLeave >= 0) {
          for (let i = currentMonth; i < userProfile.leaveBalance.length; i++) {
            userProfile.leaveBalance[i] -= data.earnedLeaveBalance[currentMonth]
          }
          userProfile.earnedAvailable += data.earnedLeaveBalance[currentMonth]
          data.earnedLeaveBalance[currentMonth] = 0
        } else {
          userProfile.earnedAvailable += userProfile.leaveBalance[currentMonth]
          data.earnedLeaveBalance[currentMonth] -= userProfile.leaveBalance[currentMonth]
        }
      }
    } else if (data.lopLeaveBalance[currentMonth] > 0 && data.earnedLeaveBalance[currentMonth] <= 0 && userProfile.lopAvailable > 0) {
      console.log('lop')
      const remaining = userProfile.leaveBalance[currentMonth] - data.lopLeaveBalance[currentMonth]
      console.log('remaining', remaining)
      if (remaining >= 0) {
        for (let i = currentMonth; i < userProfile.leaveBalance.length; i++) {
          userProfile.leaveBalance[i] -= data.lopLeaveBalance[currentMonth]
        }
        userProfile.lopAvailable -= data.lopLeaveBalance[currentMonth]
        data.lopLeaveBalance[currentMonth] = 0
      } else {
        const balance = data.lopLeaveBalance[currentMonth] - userProfile.leaveBalance[currentMonth]
        for (let i = currentMonth; i < userProfile.leaveBalance.length; i++) {
          userProfile.leaveBalance[i] -= userProfile.leaveBalance[currentMonth]
        }
        userProfile.lopAvailable -= userProfile.leaveBalance[currentMonth]
        data.lopLeaveBalance[currentMonth] -= userProfile.leaveBalance[currentMonth]
        console.log(balance)
        if (userProfile.earnedAvailable > balance) {
          const outOfRemaining = userProfile.earnedAvailable - balance
          if (outOfRemaining > 0) {
            userProfile.earnedAvailable -= balance
            userProfile.lopAvailable -= balance
            data.lopLeaveBalance[currentMonth] -= balance
          }
        }
      }
    }
    // else if (data.lopLeaveBalance[currentMonth] > 0 && data.earnedLeaveBalance[currentMonth]<=0 && userProfile.earnedAvailable>0 && userProfile.leaveBalance[currentMonth]<=0) {
    //   const remaining = userProfile.earnedAvailable-data.lopLeaveBalance[currentMonth]
    //   if(remaining>=0){
    //     userProfile.earnedAvailable-=data.lopLeaveBalance[currentMonth]
    //     data.lopLeaveBalance[currentMonth]=0
    //   }else{
    //     userProfile.lopAvailable-=userProfile.earnedAvailable
    //     data.lopLeaveBalance[currentMonth]-=userProfile.earnedAvailable
    //   }
    // }
    else if (data.earnedLeaveBalance[currentMonth] > 0 && data.lopLeaveBalance[currentMonth] <= 0) {
      console.log('earned')
      const remainingEarnedLeave = userProfile.leaveBalance[currentMonth] - data.earnedLeaveBalance[currentMonth]
      if (remainingEarnedLeave >= 0) {
        for (let i = currentMonth; i < userProfile.leaveBalance.length; i++) {
          userProfile.leaveBalance[i] -= data.earnedLeaveBalance[currentMonth]
        }
        userProfile.earnedAvailable += data.earnedLeaveBalance[currentMonth]
        data.earnedLeaveBalance[currentMonth] = 0
      } else {
        userProfile.earnedAvailable += userProfile.leaveBalance[currentMonth]
        data.earnedLeaveBalance[currentMonth] -= userProfile.leaveBalance[currentMonth]
      }

    }
    await updateDoc(doc(db, "leave submssion", data.id), data).then(() => console.log('updated')).catch(err => console.log(err))
    console.log('after', data.lopLeaveBalance[currentMonth], data.earnedLeaveBalance[currentMonth])
    console.log(userProfile.lopAvailable, userProfile.earnedAvailable)
  }
  return userProfile


}