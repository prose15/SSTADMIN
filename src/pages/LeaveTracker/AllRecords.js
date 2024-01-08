// src/components/filter.
import React, { useEffect, useMemo, useState } from "react";
// import details from "pages/Tables/Data";
// import PropTypes from 'prop-types';
// import { useState,useEffect } from 'react';
import {collection,getDocs,query,where,orderBy,onSnapshot} from 'firebase/firestore'
// import PropTypes from 'prop-types';
import { db } from "firebase-config";
// import Leavedata from "pages/Tables/Leavedata";
//import components
import Breadcrumbs from '../../components/Common/Breadcrumb';
import TableContainer from '../../components/Common/TableContainer';
// import DatatableTables from "pages/Tables/DatatableTables";
import { Status } from "pages/timesheet/Dashboard-saas/pages/MytimesheetCol";
import Cookies from "js-cookie";
function AllRecords  ()  {
    const [details,setDetails]=useState([])
const name=Cookies.get('name')
const email=Cookies.get('email')
useEffect(()=>{
    const handleGet=async()=>{
        const filteredUsersQuery =query(collection(db,'leave submssion'),orderBy('timestamp','asc'));
        onSnapshot(filteredUsersQuery,(data)=>{
          setDetails(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
        })
    }
    handleGet()
},[])
console.log(details);

    const columns = useMemo(
        () => [
            {
                Header: 'Date of Request',
                accessor: 'requestDate',
            },
            {
                Header: 'Name',
                accessor: 'name'
            },
            {
                Header: 'Leave Type',
                accessor: 'leaveType'
            },
            {
                Header: 'Subject',
                accessor: 'subject'
            },
           
            {
                Header: 'From',
                accessor: 'from'
            },
            {
                Header: 'To',
                accessor: 'to'
            },
            {
                Header: "Status",
                accessor: "status",
                disableFilters: true,
                filterable: false,
                Cell: cellProps => {
                  return <Status {...cellProps} />;
                },
              },
        ],
        []
    );    
    return (
        <div className="page-content">
            <div className="container-fluid">
                <Breadcrumbs title='Team Request' breadcrumbItem="All Records" />
                <TableContainer
                    columns={columns}
                    data={details}
                    isGlobalFilter={true}
                    isAddOptions={false}
                    customPageSize={10}
                    isPagination={true}
                    tableClass="align-middle table-nowrap table-check table"
                    theadClass="table-light"
                    paginationDiv="col-12"
                    pagination="justify-content-center pagination pagination-rounded"
                />
                {/* <DatatableTables /> */}
            </div>
        </div>
    );
}
export default AllRecords;