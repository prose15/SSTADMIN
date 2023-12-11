import { size } from 'lodash';
import React, { useState, useEffect, useMemo } from 'react'
import { Row,Col } from 'reactstrap';
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
    <div className=" form-control d-inline-sm text-center  text-secondary pt-2">
      {/* <Row className='d-inline'> */}
        {/* <Col sm={1}> */}
        <i className='bx bx-chevron-left ' style={{cursor:'pointer',position:'static'}}  onClick={() => backward(startdate, enddate)} ></i>
        {/* </Col> */}
        {/* <Col className='text-center'> */}
        {startdate.getDate() + " " + (getMonthName(startdate.getMonth())) + ' ' + startdate.getFullYear() + " - " + enddate.getDate() + " " + getMonthName(enddate.getMonth()) + " " + enddate.getFullYear()}
        {/* </Col> */}
        {/* <Col sm={1}> */}
        <i className='bx bx-chevron-right '  style={{cursor:'pointer',position:'static'}}  onClick={() => forward(startdate, enddate)} ></i>
        {/* </Col> */}
      {/* </Row> */}
      
   
    </div>
  )
}

export default Weekrange