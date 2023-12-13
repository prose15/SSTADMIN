// src/components/filter.
import React, { useMemo } from "react";
import { useState,useEffect } from 'react';
import {collection,getDocs,query,where,orderBy} from 'firebase/firestore'
import PropTypes from 'prop-types';
import { db } from "firebase-config";


//import components
import Breadcrumbs from '../../components/Common/Breadcrumb';
import TableContainer from '../../components/Common/TableContainer';
import Cookies from "js-cookie";
// import { orderBy } from "lodash";

function DatatableTables() {
    let newDetails=[]

//   details.map((detail)=>{
//     if(detail.name===name && detail.email===email){
//         newDetails=[...newDetails,detail]
//     }
//   })
    const columns = useMemo(
        () => [
            {
                Header: 'Type of leave',
                accessor: 'typeofleave',
            },
            {
                Header: 'Start date',
                accessor: 'startdate'
            },
            {
                Header: 'End date',
                accessor: 'enddate'
            },
            {
                Header: 'Total days',
                accessor: 'totaldays'
            },
            {
                Header: 'Reason',
                accessor: 'reason'
            },
            {
                Header: 'Approval',
                accessor: 'approval'
            },
        ],
        []
    );
//    let dataSet={}
//  details.map((detail)=>{
    
//      dataSet=   {
//             typesofleave:detail.leaveType,
//             startdate:detail.from,
//             enddate:detail.to,
//             reason:detail.reason,
//             status:detail.status,
//         }
    
// })
console.log(details);
    const data = [
    
        {
            typeofleave: "Casual",
            startdate: "21/12/23",
            enddate: "22/12/23",
            totaldays: "2",
            reason: "Going to temple",
            approval: "Accepted"
        },
        {
            typeofleave: "Casual",
            startdate: "21/12/23",
            enddate: "22/12/23",
            totaldays: "2",
            reason: "Going to temple",
            approval: "Accepted"
        },
        {
            typeofleave: "Casual",
            startdate: "21/12/23",
            enddate: "22/12/23",
            totaldays: "2",
            reason: "Going to temple",
            approval: "Accepted"
        },
        {
            typeofleave: "Casual",
            startdate: "21/12/23",
            enddate: "22/12/23",
            totaldays: "2",
            reason: "Going to temple",
            approval: "Accepted"
        },
        {
            typeofleave: "Casual",
            startdate: "21/12/23",
            enddate: "22/12/23",
            totaldays: "2",
            reason: "Going to temple",
            approval: "Accepted"
        },
        {
            typeofleave: "Casual",
            startdate: "21/12/23",
            enddate: "22/12/23",
            totaldays: "2",
            reason: "Going to temple",
            approval: "Accepted"
        },
        {
            typeofleave: "Casual",
            startdate: "21/12/23",
            enddate: "22/12/23",
            totaldays: "2",
            reason: "Going to temple",
            approval: "Accepted"
        },
        {
            typeofleave: "Casual",
            startdate: "21/12/23",
            enddate: "22/12/23",
            totaldays: "2",
            reason: "Going to temple",
            approval: "Accepted"
        },
        {
            typeofleave: "Casual",
            startdate: "21/12/23",
            enddate: "22/12/23",
            totaldays: "2",
            reason: "Going to temple",
            approval: "Accepted"
        },
        {
            typeofleave: "Casual",
            startdate: "21/12/23",
            enddate: "22/12/23",
            totaldays: "2",
            reason: "Going to temple",
            approval: "Accepted"
        },
        {
            typeofleave: "Casual",
            startdate: "21/12/23",
            enddate: "22/12/23",
            totaldays: "2",
            reason: "Going to temple",
            approval: "Accepted"
        },
        {
            typeofleave: "Casual",
            startdate: "21/12/23",
            enddate: "22/12/23",
            totaldays: "2",
            reason: "Going to temple",
            approval: "Accepted"
        },
        {
            typeofleave: "Casual",
            startdate: "21/12/23",
            enddate: "22/12/23",
            totaldays: "2",
            reason: "Going to temple",
            approval: "Accepted"
        },
        {
            typeofleave: "Casual",
            startdate: "21/12/23",
            enddate: "22/12/23",
            totaldays: "2",
            reason: "Going to temple",
            approval: "Accepted"
        },
        {
            typeofleave: "Casual",
            startdate: "21/12/23",
            enddate: "22/12/23",
            totaldays: "2",
            reason: "Going to temple",
            approval: "Accepted"
        },
        {
            typeofleave: "Casual",
            startdate: "21/12/23",
            enddate: "22/12/23",
            totaldays: "2",
            reason: "Going to temple",
            approval: "Accepted"
        },
        {
            typeofleave: "Casual",
            startdate: "21/12/23",
            enddate: "22/12/23",
            totaldays: "2",
            reason: "Going to temple",
            approval: "Accepted"
        },
    ];

    //meta title
    // document.title = "Data Tables | Skote - React Admin & Dashboard Template";

    return (
        <div className="page-content pt-0">
            <div className="container-fluid">
                {/* <Breadcrumbs title="Tables" breadcrumbItem="Data Tables" /> */}
                {/* <Table columns={columns} data={data} /> */}
                <h5>Your leave history</h5>
                <TableContainer
                    columns={columns}
                    data={data}
                    isGlobalFilter={true}
                    isAddOptions={false}
                    customPageSize={10}
                    isPagination={true}
                    tableClass="align-middle table-nowrap table-check table"
                    theadClass="table-light"
                    paginationDiv="col-12"
                    pagination="justify-content-center pagination pagination-rounded"
                />
            </div>
        </div>
    );
}
DatatableTables.propTypes = {
    preGlobalFilteredRows: PropTypes.any,

};


export default DatatableTables;