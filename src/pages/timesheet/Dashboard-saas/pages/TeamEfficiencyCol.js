import React, { useEffect, useState } from 'react';
import { Button,Badge,DropdownToggle, DropdownMenu,UncontrolledDropdown } from 'reactstrap';
import { Link } from 'react-router-dom';
import { db } from 'firebase-config';
import {  doc,getDoc,query,onSnapshot,where,collection, getDocs } from 'firebase/firestore';

const formateDate = (date, format) => {
    const dateFormat = format ? format : "DD MMM Y";
    const date1 = moment(new Date(date)).format(dateFormat);
    return date1;
};


const EmployeeName = (cell) => {
    return (
        <Link to="#" className="text-body fw-bold">{cell.value ? cell.value : ''}</Link>
    );
};

const   EmplyeeID=(cell) => {
    return cell.value ? cell.value : '';
};

const Team = (cell) => {
    return cell.value ? cell.value : '';
};

const Designation = (cell) => {
    return cell.value ? cell.value : '';
};
const Actions = ({cell,setVaryingModal,setUserId}) => {
  const handleClick=()=>{
setVaryingModal(true)
setUserId(cell.value)
  }
    return(
        <UncontrolledDropdown className="ms-auto">
        <DropdownToggle
        className="text-muted font-size-14"
        tag="a"
        color="white"
      >
        <i className="mdi mdi-dots-horizontal"></i>
      </DropdownToggle>
      <DropdownMenu className="dropdown-menu-end ">
      <Button className='btn dropdown-item' onClick={()=>handleClick()}> 
      {'View reports'}<i className='ms-2 fas fa-chart-line'/>
      </Button>
      <Link to={`/timesheet/view-timesheet/${cell.value}`}>
      <Button className='btn dropdown-item' > 
      {'View Timesheet'}<i className="bx bxs-detail ms-2" />
      </Button>
      </Link>
      </DropdownMenu>
      </UncontrolledDropdown>
    )
};


export {
  EmployeeName,
  EmplyeeID,Team,
  Designation,
Actions
};