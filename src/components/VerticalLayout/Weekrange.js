import { size } from 'lodash';
import React, { useState, useEffect, useMemo } from 'react'
import { useStateContext } from 'Context/ContextProvider';
import { Row,Col } from 'reactstrap';
import Cookies from 'js-cookie';

const Weekrange = () => {
    const {startdate,enddate,setStartDate,setEndDate}=useStateContext();
  const getMonthName = (index) => {
    const month = ['Jan', 'Feb', "Mar", 'Apr', "May", "Jun", "Jul", "Aug", "Sep", "Oct", 'Nov', "Dec"];
    return month[index];
  }
  let temp=[]
  let newDetails=[];
  let id=0;
  
  new Date(startdate).setHours(0)
  new Date(startdate).setMinutes(0);
  new Date(startdate).setSeconds(0);
  new Date(startdate).setMilliseconds(0);
  new Date(enddate).setHours(23);
  new Date(enddate).setMinutes(59);
  new Date(enddate).setSeconds(59);
  new Date(enddate).setMilliseconds(59);
  const forward = (sDate,eDate) => {
      sDate.setDate(sDate.getDate() + 7)
      eDate.setDate(eDate.getDate() + 7)
      setStartDate(sDate);
      setEndDate(eDate)
      new Date(startdate).getHours(0)
      new Date(startdate).setMinutes(0);
      new Date(enddate).setHours(23);
      new Date(enddate).setMinutes(59);
    }
    const backward = (sDate, eDate) => {
      sDate.setDate(sDate.getDate() - 7)
      eDate.setDate(eDate.getDate() - 7)
      setStartDate(sDate);
      setEndDate(eDate)
      startdate.setHours(0);
      startdate.setMinutes(0);
      enddate.setHours(23);
      enddate.setMinutes(59);
    }
  return (
    <div className=" form-control d-inline-sm text-center  text-secondary pt-2">
        <i className='bx bx-chevron-left ' style={{cursor:'pointer',position:'static'}}  onClick={() => {
          
         
          backward(new Date(startdate),new Date(enddate))
          
          
        }} ></i>
        {new Date(startdate).getDate() + " " + (getMonthName(new Date(startdate).getMonth())) + ' ' + new Date(startdate).getFullYear() + " - " + new Date(enddate).getDate() + " " + getMonthName(new Date(enddate).getMonth()) + " " + new Date(enddate).getFullYear()}
        <i className='bx bx-chevron-right '  style={{cursor:'pointer',position:'static'}}  onClick={() =>{
        
            forward(new Date(startdate),new Date(enddate))
          
          }} ></i>
    </div>
  )
}

export default Weekrange