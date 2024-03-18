import React, { useEffect, useState } from 'react';
import { Button,Badge,DropdownToggle, DropdownMenu,UncontrolledDropdown } from 'reactstrap';
import { Link } from 'react-router-dom';
import { db } from 'firebase-config';
import {  doc,getDoc,query,onSnapshot,where,collection, getDocs, Timestamp,orderBy } from 'firebase/firestore';
import { useStateContext } from 'Context/ContextProvider';
import downloadAsExcel from 'Functions/downloadAsExcel';
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
const Actions = ({cell,setVaryingModal,setUserId,userId}) => {
  const {  startdate, } = useStateContext()
  const startDate = new Date(startdate)
  const lastDate = new Date(startDate.getFullYear(), startDate.getMonth() + 1, 1)
  const lastDateTimestamp = Timestamp.fromDate(lastDate)
  const firstDate = new Date(startDate.getFullYear(), startDate.getMonth(), 1)
  const firstDateTimestamp = Timestamp.fromDate(firstDate)
  const [data,setData]=useState([])
  const [id,setId]=useState('')
  // useEffect(() => {
  //   const getReport = async () => {
      
  //     if (id !== '') {
      
  //       }
  //     }
  //   }
  //   getReport()
  // },[id,startdate])
  const handleClick=()=>{
setVaryingModal(true)
setUserId(cell.value)
  }
  const handleDownload=async()=>{
    const docRef = doc(db, 'users', cell.value)
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
      const filteredQuery = query(collection(db, 'Timesheet'), where('name', '==', docSnap.data().name), where('dateTimestamp', '>=', firstDateTimestamp), where('dateTimestamp', '<=', lastDateTimestamp), orderBy('dateTimestamp', 'desc'));
      const data1 = await getDocs(filteredQuery)
      // setData(data1.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
      
      downloadAsExcel(data1.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
  }
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
      <Button className='btn dropdown-item' onClick={()=>handleDownload(cell.value)}> 
      {'Download'}<i className='ms-2 bx bx-download'/>
      </Button>
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