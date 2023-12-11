import React, { useState, useEffect, useMemo } from 'react'
const Weekrange = () => {
    var today = new Date();
    var startDate = new Date()
    startDate.setDate(today.getDate() - today.getDay());
    var endDate = new Date()
    endDate.setDate(startDate.getDate() + 4)
    const [startdate, setStartDate] = useState(startDate);
    const [enddate, setEndDate] = useState(endDate);
    const getMonthName = (index) => {
      const month = ['Jan', 'Feb', "Mar", 'Apr', "May", "Jun", "Jul", "Aug", "Sep", "Oct", 'Nov', "Dec"];
      return month[index];
    }
    const forward = (sDate, eDate) => {
      sDate.setDate(sDate.getDate() + 7)
      eDate.setDate(eDate.getDate() + 7)
      setStartDate(sDate);
      setEndDate(eDate)
      startdate.setHours(0);
      startdate.setMinutes(0);
      enddate.setHours(23);
      enddate.setMinutes(59);
    //   details.map((detail) => {
    //     if (detail.name === name && detail.email === email) {
  
    //       if (new Date(detail.timesheetDate) >= startdate && new Date(detail.timesheetDate) <= enddate) {
    //         newDetails = [...newDetails, detail]
    //       }
    //     }
    //   })
  
    }
    const backward = (sDate, eDate) => {
      sDate.setDate(sDate.getDate() - 7)
      eDate.setDate(eDate.getDate() - 7)
      console.log("sDate:" + sDate, "enddate:" + eDate);
      setStartDate(sDate);
      setEndDate(eDate)
      startdate.setHours(0);
      startdate.setMinutes(0);
      enddate.setHours(23);
      enddate.setMinutes(59);
    //   details.map((detail) => {
    //     if (detail.name === name && detail.email === email) {
  
    //       if (new Date(detail.timesheetDate) >= startdate && new Date(detail.timesheetDate) <= enddate) {
    //         newDetails = [...newDetails, detail]
    //       }
  
    //     }
    //   })
    }
    // startdate.setHours(0);
    // startdate.setMinutes(0);
    // startdate.setSeconds(0);
    // startdate.setMilliseconds(0);
    // enddate.setHours(23);
    // enddate.setMinutes(59);
    // enddate.setSeconds(59);
    // enddate.setMilliseconds(59);
    // details.map((detail) => {
    //   // if (detail.name === name && detail.email === email) {
  
    //     if (new Date(detail.timesheetDate) >= startdate && new Date(detail.timesheetDate) <= enddate) {
    //       newDetails = [...newDetails, detail]
    //     }
    //   // }
    // })
  
  return (
    <div className="  text-center text-secondary pt-2"><i className='bx bx-chevron-left' style={{cursor:'pointer'}}  onClick={() => backward(startdate, enddate)} />
    {startdate.getDate() + " " + (getMonthName(startdate.getMonth())) + ' ' + startdate.getFullYear() + " - " + enddate.getDate() + " " + getMonthName(enddate.getMonth()) + " " + enddate.getFullYear()}
    <i className='bx bx-chevron-right ' style={{cursor:'pointer'}}  onClick={() => forward(startdate, enddate)} ></i></div>
  )
}

export default Weekrange