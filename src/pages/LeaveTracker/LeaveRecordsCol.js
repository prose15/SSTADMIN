import React, { useEffect, useState } from "react"
import {
  Badge,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
  Button,
} from "reactstrap"
import { Link, useNavigate } from "react-router-dom"
import Tooltip from "@mui/material/Tooltip"
import { db } from "firebase-config"
import { getDoc, doc, deleteDoc, updateDoc } from "firebase/firestore"
import Cookies from "js-cookie"
import { SplitMonth, getDatesBetweenDates, handleRevoke, isPromise } from "Functions/leaveFormFunctions"
import { useStateContext } from "Context/ContextProvider"
const Status = cell => {
  return (
    <Badge
      className={
        "font-size-11 badge-soft-" +
        (cell.value === "approved"
          ? "success"
          : cell.value === "L1 approved" || cell.value === "pending"
            ? "warning"
            : cell.value === "revoke" || cell.value === "escalate"
              ? "info"
              : cell.value === "re-apply"
                ? "secondary"
                : "danger")
      }
    >
      {cell.value}
    </Badge>
  )
}
const ReverseDate = cell => {
  const date = cell.value.split("-").reverse().join("-")
  return <>{date}</>
}
let details = []
const team = Cookies.get("team")
let reportingManager = ""
if (team === "Delivery") {
  details = [...details, "Yuvashini", "Keerthana", "Gobi"]
  reportingManager = details[details.length - 1]
} else if (team === "Sales") {
  details = [...details, "Balaji", "Keerthana", "Krishna kumar"]
  reportingManager = details[details.length - 1]
} else if (team === "HR") {
  details = [...details, "Keerthana", "Gobi"]
  reportingManager = details[details.length - 1]
}

const deleteData = async id => {
  await deleteDoc(doc(db, "leave submssion", id))
    .then(() => { })
    .catch(err => {
      console.log(err)
    })
}


async function composeEmail(data) {
  await updateDoc(doc(db, "leave submssion", data), {
    status: "escalate",
    reportManager: reportingManager,
  })
    .then(() => {
      let recipient
      if (
        Cookies.get("team").includes("Delivery") ||
        Cookies.get("team").includes("HR")
      ) {
        recipient = "ngobi@isupportz.com"
      } else if (Cookies.get("team").includes("Sales")) {
        recipient = "krishnakumar@isupportz.com"
      }
      const subject = "Escalation mail"
      const body = "Body of the email"

      // Construct the mailto URL
      const mailtoUrl = `mailto:${recipient}?subject=${encodeURIComponent(
        subject
      )}&body=${encodeURIComponent(body)}`
      // window.location.href = mailtoUrl
    })
    .catch(err => {
      console.log(err)
    })
}
const Actions = cell => {
  const { myRecords } = useStateContext()
  const [data, setData] = useState(null)
  const [userProfile, setUserProfile] = useState(null)
  let userData
  useEffect(() => {
    const getData = async () => {
      const docRef = doc(db, "leave submssion", cell.value)
      const userRef = doc(db, "admin", JSON.parse(sessionStorage.getItem("uid")))
      const RevokeUserData = await getDoc(userRef)
      const docSnap = await getDoc(docRef)
      if (docSnap.exists()) {
        setData(docSnap.data())
      }
      if (RevokeUserData.exists()) {
        setUserProfile(RevokeUserData.data())

      }

    }
    getData()
  }, [])
  userData = userProfile
  console.log(userData)
  async function revokeEmail(data) {
    const docRef = doc(db, "leave submssion", data)
    const RevokeData = await getDoc(docRef)
    const leaveData = RevokeData.data()
    leaveData.status = 'revoke'
    if (RevokeData.exists() && userData) {
      console.log('lop', userData.lopAvailable,'earned',userData.earnedAvailable)
      console.log('initial leaveBalance', userData.leaveBalance)
      const fromMonth = SplitMonth(leaveData.from)
      const toMonth = SplitMonth(leaveData.to)
      const dates = getDatesBetweenDates(new Date(leaveData.from), new Date(leaveData.to))
      const datesWithoutHolidays = dates.filter(date => (date.getDay() != 5 && date.getDay() != 6))
      let daysInSameMonth = []
      let totalMonth = [new Date(leaveData.from).getMonth()]
      let sum = 0
      let temp = 0;
      for (let i = 0; i < datesWithoutHolidays.length; i++) {
        var count = 0;
        var month = datesWithoutHolidays[temp].getMonth()
        for (let j = temp; j < datesWithoutHolidays.length; j++) {
          if (datesWithoutHolidays[j].getMonth() === month && leaveData.session==='FullDay') {
            count++;
          }
          else if(datesWithoutHolidays[j].getMonth() === month && leaveData.session!=='FullDay'){
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
      console.log(daysInSameMonth, totalMonth, leaveData)
      for (let i = 0; i < daysInSameMonth.length; i++) {
        const currentMonth = totalMonth[i]
        const days = daysInSameMonth[i]
        const subLeave = leaveData.subLeave[i]
        if (leaveData.subLeave.length === 0) {
          let str = leaveData.leaveType
          const leaveType = str.substring(0, str.length - 5).toLocaleLowerCase()
          const key = leaveType + "Available"
          userData[key] = userData[key] - days
          for (let i = currentMonth; i < userData.leaveBalance.length; i++) {
            userData.leaveBalance[i] += days
          }
          console.log('before revoke', userProfile.leaveBalance)
          // const availableLeave=userProfile.leaveBalance[currentMonth]
          if (userData.leaveBalance[currentMonth]>0) {
            const filterData = myRecords.filter(data => new Date(data.from).getMonth() + 1 == parseInt(fromMonth) && new Date(data.to).getMonth() + 1 >= parseInt(toMonth) && data.status === 'approved' && data.subLeave.length > 0 && data.from !== leaveData.from && data.to !== leaveData.to)
            console.log(filterData)
            userData=handleRevoke(userData,currentMonth,filterData,leaveData)
          }
        }
        else if (subLeave === 'earned') {
          let str = leaveData.leaveType
            const leaveType = str.substring(0, str.length - 5).toLocaleLowerCase()
            const key = leaveType + "Available"
            const getAvailDays = days - leaveData.earnedLeaveBalance[currentMonth]
            console.log('avail days',getAvailDays,leaveData.earnedLeaveBalance[currentMonth])
            let flag = 0
          if(subLeave==='earned' && leaveData.earnedLeaveBalance[currentMonth]==0){
            // userData[key] = userData[key] - days
            for (let i = currentMonth; i < userData.leaveBalance.length; i++) {
              userData.leaveBalance[i] += days
            }
            flag = 1;
          }
          if (getAvailDays > 0 && leaveData.earnedLeaveBalance[currentMonth]>0) {
            userData[key] = userData[key] - getAvailDays
            for (let i = currentMonth; i < userData.leaveBalance.length; i++) {
              userData.leaveBalance[i] += getAvailDays
            }
            userData.earnedAvailable += leaveData.earnedLeaveBalance[currentMonth]
            leaveData.earnedLeaveBalance[currentMonth]=0
            flag = 1;
          }else if(getAvailDays===0 && leaveData.earnedLeaveBalance[currentMonth]>0){
            userData.earnedAvailable += leaveData.earnedLeaveBalance[currentMonth]
            flag = 1;
          } 
          if (userData.leaveBalance[currentMonth]>0) {
            const filterData = myRecords.filter(data => new Date(data.from).getMonth() + 1 == parseInt(fromMonth) && new Date(data.to).getMonth() + 1 >= parseInt(toMonth) && data.status === 'approved' && data.subLeave.length > 0 && data.from !== leaveData.from && data.to !== leaveData.to)
            console.log(filterData)
            // if(userProfile.lopAvailable>0){
              userData=handleRevoke(userData,currentMonth,filterData,leaveData)
                        // }
          }
        }
        else if (subLeave === 'lop') {
          let str = leaveData.leaveType
          const leaveType = str.substring(0, str.length - 5).toLocaleLowerCase()
          const key = leaveType + "Available"
          const getAvailDays = days - leaveData.lopLeaveBalance[currentMonth]
          console.log('avail days',getAvailDays,leaveData.lopLeaveBalance[currentMonth])
          let flag = 0
          if(subLeave==='lop' && leaveData.lopLeaveBalance[currentMonth]==0){
            // userData[key] = userData[key] - days
            for (let i = currentMonth; i < userData.leaveBalance.length; i++) {
              userData.leaveBalance[i] += days
            }
            flag = 1;
          }
          if (getAvailDays > 0 &&  leaveData.lopLeaveBalance[currentMonth]>0) {
          
            userData[key] = userData[key] - getAvailDays
            for (let i = currentMonth; i < userData.leaveBalance.length; i++) {
              userProfile.leaveBalance[i] += getAvailDays
            }
            userProfile.lopAvailable -= leaveData.lopLeaveBalance[currentMonth]
            flag = 1;
          } else if(getAvailDays===0 && leaveData.lopLeaveBalance[currentMonth]>0){
            if(userData.lopAvailable>0){
              userData.lopAvailable -= leaveData.lopLeaveBalance[currentMonth]
            }
            // else{
            //   for (let i = currentMonth; i < userProfile.leaveBalance.length; i++) {
            //     userProfile.leaveBalance[i] += leaveData.lopLeaveBalance[currentMonth]
            //   }
            // }
            
            flag = 1
          }
          if (userData.leaveBalance[currentMonth]>0) {
            const filterData = myRecords.filter(data => new Date(data.from).getMonth() + 1 == parseInt(fromMonth) && new Date(data.to).getMonth() + 1 >= parseInt(toMonth) && data.status === 'approved' && data.subLeave.length > 0 && data.from !== leaveData.from && data.to !== leaveData.to)
            console.log(filterData)
              userData=handleRevoke(userData,currentMonth,filterData,leaveData)
          }
        }
        else if (subLeave === 'both') {
          const getAvailDays = days - (leaveData.earnedLeaveBalance[currentMonth] + leaveData.lopLeaveBalance[currentMonth])
          let flag = 0
          let str = leaveData.leaveType
          const leaveType = str.substring(0, str.length - 5).toLocaleLowerCase()
          const key = leaveType + "Available"
          if(subLeave==='both' && leaveData.lopLeaveBalance[currentMonth]==0 && leaveData.earnedLeaveBalance[currentMonth]===0){
            // userData[key] = userData[key] - days
            for (let i = currentMonth; i < userData.leaveBalance.length; i++) {
              userData.leaveBalance[i] += days
            }
            flag = 1;
          }
          if (getAvailDays > 0 && leaveData.lopLeaveBalance[currentMonth]>0 && leaveData.earnedLeaveBalance[currentMonth]>0) {
            userData[key] = userData[key] - getAvailDays
            for (let i = currentMonth; i < userData.leaveBalance.length; i++) {
              userData.leaveBalance[i] += getAvailDays
            }
            userData.lopAvailable -= leaveData.lopLeaveBalance[currentMonth]
            userData.earnedAvailable += leaveData.earnedLeaveBalance[currentMonth]
            flag = 1;
          }
          else if(getAvailDays==0 && leaveData.lopLeaveBalance[currentMonth]>0 && leaveData.earnedLeaveBalance[currentMonth]>0){
            if(userData.lopAvailable>0){
              userData.lopAvailable -= leaveData.lopLeaveBalance[currentMonth]
            }
            userData.earnedAvailable += leaveData.earnedLeaveBalance[currentMonth]
            flag = 1;
          }
         
          if (userData.leaveBalance[currentMonth]>0) {
            const filterData = myRecords.filter(data => new Date(data.from).getMonth() + 1 == parseInt(fromMonth) && new Date(data.to).getMonth() + 1 >= parseInt(toMonth) && data.status === 'approved' && data.subLeave.length > 0 && data.from !== leaveData.from && data.to !== leaveData.to)
            console.log(filterData)
            userData=handleRevoke(userData,currentMonth,filterData,leaveData)
          }
        }
      const flag = isPromise(userData)
      console.log(flag)
      if(flag===true){
        userData.then(async(value)=>await updateDoc(doc(db, "admin", JSON.parse(sessionStorage.getItem("uid"))),value).catch(err => console.log(err)))
      }else{
        updateDoc(doc(db, "admin", JSON.parse(sessionStorage.getItem("uid"))),userData).catch(err => console.log(err))
      }
          
      }

      let recipient
      if (
        Cookies.get("team").includes("Delivery") ||
        Cookies.get("team").includes("HR")
      ) {
        recipient = "ngobi@isupportz.com"
      } else if (Cookies.get("team").includes("Sales")) {
        recipient = "krishnakumar@isupportz.com"
      }
      const subject = "Revoke mail"
      const body = "Body of the email"
      const mailtoUrl = `mailto:${recipient}?subject=${encodeURIComponent(
        subject
      )}&body=${encodeURIComponent(body)}`
      window.location.href = mailtoUrl
      // updateDoc(doc(db, "admin", JSON.parse(sessionStorage.getItem("uid"))),userData).catch(err => console.log(err))
      updateDoc(doc(db, "leave submssion", data), leaveData).catch(err => console.log(err))
    } else {
      console.log("No data found")
    }

  }

  const today = new Date()
  const nav = useNavigate()
  return (
    <UncontrolledDropdown className="ms-auto">
      <DropdownToggle className="text-muted font-size-14" tag="a" color="white">
        <i className="mdi mdi-dots-horizontal"></i>
      </DropdownToggle>
      <DropdownMenu className="dropdown-menu-end">
        {(data && data.status.includes('denied') || data && data.status.includes('applied again'))?(
                        <Tooltip className="dropdown-item" title={data.reasonOfReject} placement='top' arrow>
                        Reason of Reject
                    </Tooltip>
                    ):(<></>)}
        {data &&
          data.status.includes("denied") &&
          data &&
          new Date(data.from) >= today ? (
          <>
            <Button
              className="btn dropdown-item"
              onClick={() => {
                updateDoc(doc(db, 'leave submssion', cell.value), { status: 'applied again' }).catch(err => console.log(err))
                nav(`/addleave/${cell.value}`)
              }}>
              Apply Again
              <i className="ms-2 far fa-hand-pointer font-size-17" />
            </Button>
          </>
        ) : (
          <></>
        )}
        {(data && data.status.includes("L1 approved")) ||
          (data && data.status.includes("pending")) ? (
          <Button
            className="btn dropdown-item"
            onClick={() => composeEmail(cell.value)}
          >
            Escalate
            <i className="ms-4 far fa-envelope font-size-17" />
          </Button>
        ) : (
          <></>
        )}

        {data &&
          data.status.includes("approved") && new Date(data.from) >= new Date() ? (

          <Button
            className="btn dropdown-item"
            onClick={() => revokeEmail(cell.value)}
          >
            <span className="me-2">Revoke</span>
            <i className="ms-4 far fa-envelope font-size-17" />
          </Button>
        ) : (
          <></>
        )}
        {data && data.status.includes("pending") ? (
          <Link
            className="dropdown-item d-flex d-inline"
            to="#"
            onClick={() => deleteData(cell.value)}
          >
            <span className="me-3">Delete</span>
            <i className=" ms-4 dripicons-trash font-size-17"></i>
          </Link>
        ) : (
          <></>
        )}
      </DropdownMenu>
    </UncontrolledDropdown>
  )
}

export { Status, Actions, ReverseDate }
