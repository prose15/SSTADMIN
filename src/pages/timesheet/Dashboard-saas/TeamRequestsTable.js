import React, { useEffect, useState, useMemo } from "react";
import PropTypes from "prop-types";
import withRouter from "components/Common/withRouter";
import { db } from "firebase-config";
import {
  Button,
  Card,
  CardBody,
} from "reactstrap";
import { getDocs, collection,doc,getDoc,updateDoc,addDoc,query,where,orderBy,onSnapshot } from 'firebase/firestore'
import EcommerceOrdersModal from "../../Ecommerce/EcommerceOrders/EcommerceOrdersModal";
import {
  EmployeeName,
  TimesheetName,
  WorkedHours,
  DateOfSubmission,
  Actions,
  // Reason,
} from "./TeamRequestsCol";

import TableContainer from "../../../components/Common/TableContainer";
import Cookies from "js-cookie";
import { Status } from "pages/LeaveTracker/LatestTranactionCol";

const TeamRequestsTable = () => {

  const [details, setDetails] = useState([])
  const [admin,setAdmin]=useState([]);
  let countData=[]
  // const collectionRef = collection(db, 'leave submssion')
  const userRef=collection(db,'users');
  const adminRef=collection(db,'admin');
  const [users,setUsers]=useState([])
  const name = Cookies.get('name');
  const team=Cookies.get('team');
  const level=Cookies.get('level');
  const levelStatus=level+"status"
  useEffect(() => {
      const getData = async () => {
         if(name==='Krishna kumar'){
          const filteredUsersQuery =query(collection(db,'timesheet'),where('L4status','==',''),orderBy('timestamp','asc'));
          onSnapshot(filteredUsersQuery,(data)=>{
            setDetails(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
          })
         }
         else{
            const filteredUsersQuery =query(collection(db,'timesheet'),where('team','==',team),where(levelStatus,'==',''),orderBy('timestamp','asc'));
        onSnapshot(filteredUsersQuery,(data)=>{
          setDetails(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
        })
      }
          console.log(details)
      };
      getData();
  }, [])
  const [modal1, setModal1] = useState(false);

  const toggleViewModal = () => setModal1(!modal1);

  let columns = useMemo(
    () => [

      {
        Header: "Employee Name",
        accessor: "name",
        filterable: false,
        disableFilters: true,
        Cell: cellProps => {
          return <EmployeeName {...cellProps} />;
        },
      },

      {
        Header: "Timesheet Name",
        accessor: "sheetName",
        disableFilters: true,
        filterable: false,
        Cell: cellProps => {
          return <TimesheetName {...cellProps} />;
        },
      },

      {
        Header: "Worked Hours",
        accessor: "workedHrs",
        disableFilters: true,
        filterable: false,
        Cell: cellProps => {
          return <WorkedHours {...cellProps} />;
        },
      },

      {
        Header: "Date of Submission",
        accessor: "date",
        disableFilters: true,
        filterable: false,
        Cell: cellProps => {
          return <DateOfSubmission {...cellProps} />;
        },
      },

      {
        Header: "Actions",
        accessor: "id",
        disableFilters: true,
        Cell: cellProps => {
          return <Actions {...cellProps} />;
        },
      },

    ]
    ,
    []
  );
  // if(name==='Krishna kumar'){
  //  columns = [
  //   {
  //     Header: "Employee Name",
  //     accessor: "name",
  //     filterable: false,
  //     disableFilters: true,
  //     Cell: cellProps => {
  //       return <EmployeeName {...cellProps} />;
  //     },
  //   },

  //   {
  //     Header: "Timesheet Name",
  //     accessor: "sheetName",
  //     disableFilters: true,
  //     filterable: false,
  //     Cell: cellProps => {
  //       return <TimesheetName {...cellProps} />;
  //     },
  //   },

  //   {
  //     Header: "Worked Hours",
  //     accessor: "workedHrs",
  //     disableFilters: true,
  //     filterable: false,
  //     Cell: cellProps => {
  //       return <WorkedHours {...cellProps} />;
  //     },
  //   },

  //   {
  //     Header: "Date of Submission",
  //     accessor: "date",
  //     disableFilters: true,
  //     filterable: false,
  //     Cell: cellProps => {
  //       return <DateOfSubmission {...cellProps} />;
  //     },
  //   },
  //   {
  //     Header: "Status",
  //     accessor: "status",
  //     disableFilters: true,
  //     filterable: false,
  //     Cell: cellProps => {
  //       return <Status {...cellProps} />;
  //     },
  //   },
  //   {
  //     Header: "Actions",
  //     accessor: "id",
  //     disableFilters: true,
  //     Cell: cellProps => {
  //       return <Actions {...cellProps} />;
  //     },
  //   },

  // ]
  
  // }

  return (
    <React.Fragment>
      {/* <div className="page-content"> */}
      <EcommerceOrdersModal isOpen={modal1} toggle={toggleViewModal} />
      <Card>
        <CardBody>
          <div className="mb-4 h4 card-title m-3">Latest Team Requests</div>
          <TableContainer
            columns={columns}
            data={details}
            isGlobalFilter={false}
            isAddOptions={false}
            isPagination={true}
            iscustomPageSizeOptions={false}
            customPageSize={10}
            pagination="pagination pagination-rounded justify-content-end mb-2"
          />
        </CardBody>
      </Card>
    </React.Fragment>
  );
};

export default withRouter(TeamRequestsTable);
