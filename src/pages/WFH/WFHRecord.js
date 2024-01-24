import React, { useEffect, useMemo, useState } from "react";
import {collection,getDoc,getDocs,query,where,orderBy,onSnapshot,doc} from 'firebase/firestore'
import { db } from "firebase-config";
import { Col,Row, Card,CardBody } from "reactstrap";
import TableContainer from '../../components/Common/TableContainer';
import { Status,Actions,ReverseDate } from '../WFH/WFHRecordsCol'
import Cookies from "js-cookie";

function WFHRecords() {
const [details,setDetails]=useState([])
const [WFH,setWFH]=useState(0);
const [WFHApproved,setWFHApproved]=useState(0);
const [admin,setAdmin] = useState([])
const [users,setUsers] = useState([])
const email=Cookies.get('email')
const userRef = collection(db, 'users');
const adminRef = collection(db, 'admin');


useEffect(()=>{
    const handleGet=async()=>{
      const docRef = doc(db, "admin", JSON.parse(sessionStorage.getItem('uid')));
const docSnap = await getDoc(docRef)
const userSnap = await getDocs(userRef);
const adminSnap = await getDocs(adminRef);
setAdmin(adminSnap.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
setUsers(userSnap.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
if(docSnap.exists()){
  if(docSnap.data().WFHApproved<=0){
    setWFHApproved(0)
 }else{
        setWFHApproved(docSnap.data().WFHApproved)

 }
 setWFH(docSnap.data().WFH)
}
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
                   <Actions {...cellProps}  users={users} admin={admin}/>
                  );
                },
              },
        ],
        [users,admin]
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
                    <Col className="cards-box bg-white col-lg-3 col-md-6 col-sm-12 mx-auto">
                    <Card className="leave-cards ">
                    <CardBody className="p-4">
                    <div className="text-center mb-3 text-primary">
                    <i className="fas fa-umbrella-beach fa-2x "></i>
                    <h5 className="mt-4 mb-2 font-size-15"><b>Work Form Home</b></h5>
                    </div>
                    <div className="d-flex">
                    <p className="mb-0 flex-grow-1 text-success me-5">
                    Approved {WFHApproved}</p>    
                    <p className="mb-0 text-danger">Booked {WFH}</p>
                    </div>
                    </CardBody>
                    </Card>
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