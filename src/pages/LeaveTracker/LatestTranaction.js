import React, { useEffect, useState, useMemo } from "react";
import PropTypes from "prop-types";
import withRouter from "components/Common/withRouter";
import { isEmpty } from "lodash";
import { db } from "firebase-config";
import RejectModal from "components/Common/RejectModal";
import {
  Button,
  Card,
  CardBody,
} from "reactstrap";
import { getDocs, collection, doc, getDoc, updateDoc, addDoc, query, where, orderBy, onSnapshot } from 'firebase/firestore'
import EcommerceOrdersModal from "../Ecommerce/EcommerceOrders/EcommerceOrdersModal";
import { latestTransaction } from "../../common/data/dashboard";
import {
  EmployeeName,
  LeaveType,
  From,
  To,
  Actions,
  Reason,
  Status
} from "./LatestTranactionCol";

import TableContainer from "../../components/Common/TableContainer";
import Cookies from "js-cookie";

const LatestTranaction = props => {

  const [details, setDetails] = useState([])
  const [admin, setAdmin] = useState([]);
  // const collectionRef = collection(db, 'leave submssion')
  const userRef = collection(db, 'users');
  const adminRef = collection(db, 'admin');
  const [users, setUsers] = useState([])
  const name = Cookies.get('name');
  let level = Cookies.get('level') + 'status'
  console.log(level)
  useEffect(() => {
    const getData = async () => {
        const docRef = doc(db, "admin", JSON.parse(sessionStorage.getItem('uid')));
        const docSnap = await getDoc(docRef);
        const userSnap = await getDocs(userRef);
        const adminSnap = await getDocs(adminRef);
        setAdmin(adminSnap.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
        setUsers(userSnap.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
        // if(Cookies.get('level')==='L3'){
        //   const filteredUsersQuery = query(collection(db, 'leave submssion'), where('team','==',Cookies.get('team')),where('status','!=','approved'));
        //   onSnapshot(filteredUsersQuery, (data) => {
        //     setDetails(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
        //   })
        // }
        // else{
          if (docSnap.exists()) {
            const filteredUsersQuery = query(collection(db, 'leave submssion'), where('reportManager', '==', name), orderBy('timestamp','asc'));
            onSnapshot(filteredUsersQuery, (data) => {
              setDetails(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
            })
          }
       
    };
    getData();
  }, [])
  const [modal1, setModal1] = useState(false);

  const toggleViewModal = () => setModal1(!modal1);
  const columns = useMemo(
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
        Header: "Leave Type",
        accessor: "leaveType",
        disableFilters: true,
        filterable: false,
        Cell: cellProps => {
          return <LeaveType {...cellProps} />;
        },
      },

      {
        Header: "From",
        accessor: "from",
        disableFilters: true,
        filterable: false,
        Cell: cellProps => {
          return <From {...cellProps} />;
        },
      },

      {
        Header: "To",
        accessor: "to",
        disableFilters: true,
        filterable: false,
        Cell: cellProps => {
          return <To {...cellProps} />;
        },
      },

      {
        Header: "Reason",
        accessor: "reason",
        disableFilters: true,
        filterable: false,
        Cell: cellProps => {
          return <Reason {...cellProps} />;
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
        Header: "Actions",
        accessor: "id",
        disableFilters: true,
        Cell: cellProps => {
          return <Actions {...cellProps} users={users} admin={admin} />;
        },
      }

     



    ],
    [users, admin]
  );
  // if(Cookies.get('level') != 'L1')  {
  //  columns.push(
  //   {
  //     Header: "Actions",
  //     accessor: "id",
  //     disableFilters: true,
  //     Cell: cellProps => {
  //       return <Actions {...cellProps} users={users} admin={admin} />;
  //     },
  //   })
    
  // }else{
  //   columns.push(
     
  //   )
  // }



  return (
    <React.Fragment>
      <div className="page-content">
        <RejectModal />
        <Card>
          <CardBody>
            <div className="mb-4 h4 card-title">Latest Requests</div>
            <TableContainer
              columns={columns}
              data={details}
              isGlobalFilter={false}
              isAddOptions={false}
              isPagination={true}
              iscustomPageSizeOptions={false}
              customPageSize={6}
              pagination="pagination pagination-rounded justify-content-end mb-2"
            />
          </CardBody>
        </Card>
      </div>
    </React.Fragment>
  );
};

LatestTranaction.propTypes = {
  orders: PropTypes.array,
  onGetOrders: PropTypes.func,
};


export default withRouter(LatestTranaction);
