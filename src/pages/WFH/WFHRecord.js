import React, { useEffect, useMemo, useState } from "react";
import {collection,getDocs,query,where,orderBy,onSnapshot} from 'firebase/firestore'
import { db } from "firebase-config";
import { Col,Row } from "reactstrap";
import TableContainer from '../../components/Common/TableContainer';
import { Status,Actions,ReverseDate } from '../WFH/WFHRecordsCol'
import Cookies from "js-cookie";

function WFHRecords() {
const [details,setDetails]=useState([])
const email=Cookies.get('email')

useEffect(()=>{
    const handleGet=async()=>{
        const filteredUsersQuery =query(collection(db,'WFH'),where('email','==',email),orderBy('timestamp','asc'));
        onSnapshot(filteredUsersQuery,(data)=>{
          setDetails(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
        })
    }
    handleGet()
},[])
    const columns = useMemo(
        () => [
            {
                Header: 'Date of Request',
                accessor: 'requestDate',
                disableFilters: true,
                filterable: false,
                Cell: cellProps => {
                  return <ReverseDate {...cellProps} />;
                },
            },          
            {
                Header: 'Subject',
                accessor: 'subject'
            },       
            {
                Header: 'From',
                accessor: 'from',
                disableFilters: true,
                filterable: false,
                Cell: cellProps => {
                  return <ReverseDate {...cellProps} />;
                },
            },
            {
                Header: 'To',
                accessor: 'to',
                disableFilters: true,
                filterable: false,
                Cell: cellProps => {
                  return <ReverseDate {...cellProps} />;
                },
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
              {
                Header: "Action",
                disableFilters: true,
                accessor: "id",
                Cell: cellProps => {
                  return (
                   <Actions {...cellProps}/>
                  );
                },
              },
        ],
        []
    );    
    return (
      
            <div className="page-content">
                <div className="container-fluid">
                    <Col className="d-flex justify-content-between"> 
                    <div className="d-flex">
                    <i className="bx bx-notepad pb-3 ms-2 fs-2 pe-2"></i>
                    <h4 className="font-size-16">WFH Records</h4> 
                    </div>
                    </Col>
                    <Col>
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
                    </Col>
                </div>
            </div>
        
    );
}
export default WFHRecords;