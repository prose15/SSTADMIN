import React, { useEffect, useState, useMemo } from "react";
import PropTypes from "prop-types";
import withRouter from "components/Common/withRouter";
import TableContainer from "components/Common/TableContainer";
// import { useEffect, useMemo, useState } from "react";
import {collection,getDocs,query,where,orderBy,onSnapshot} from 'firebase/firestore'
import Cookies from "js-cookie";
import { db } from "firebase-config";
import {
    Button,
    Card,
    CardBody,
    Container,
  } from "reactstrap";
  import {
    OrderId,
    BillingName,
    Date,
    Total,
    Status,
    Action,
  } from "./MytimesheetCol";
import MytimesheetModal from './MytimesheetModal';
import Section from "../Section";
const Mytimesheet = () => {

  const [details,setDetails]=useState([])
  const name=Cookies.get('name')
  const email=Cookies.get('email')
  useEffect(()=>{
      const handleGet=async()=>{
        const filteredUsersQuery =query(collection(db,'timesheet'),where('email','==',email),orderBy('timestamp','asc'));
        onSnapshot(filteredUsersQuery,(data)=>{
          setDetails(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
        })
         
      }
      handleGet()
  },[])
  console.log(details);
    const [modal1, setModal1] = useState(false);

    const toggleViewModal = () => setModal1(!modal1);
  
    const columns = useMemo(
      () => [
        {
          Header: "#",
          filterable: false,
          disableFilters: true,
          Cell: cellProps => {
            return <input type="checkbox" className="form-check-input" />;
          },
        },
        {
          Header: "Time Sheet",
          accessor: "sheetName",
          filterable: false,
          disableFilters: true,
          Cell: cellProps => {
            return <OrderId {...cellProps} />;
          },
        },
        {
          Header: "Total Hours",
          accessor: "workedHrs",
          filterable: false,
          disableFilters: true,
          Cell: cellProps => {
            return <OrderId {...cellProps} />;
          },
        },
      
        {
          Header: "Date",
          accessor: "date",
          disableFilters: true,
          filterable: false,
          Cell: cellProps => {
            return <Date {...cellProps} />;
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
             <Action {...cellProps}/>
            );
          },
        },
      ],
      []
    );
  
    return (
      <React.Fragment>
        <div className="page-content">
          <Section btn={'Create Timesheet'} link={'/timesheet/mytimesheet/createtimesheet'}/>
        <MytimesheetModal isOpen={modal1} toggle={toggleViewModal} />
        <Card>
          <CardBody>
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
        {/* </Container> */}
        </div>
      </React.Fragment>
    );
  };
  
  Mytimesheet.propTypes = {
    orders: PropTypes.array,
    onGetOrders: PropTypes.func,
  };

  export default withRouter(Mytimesheet);
