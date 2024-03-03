import React ,{useState , useEffect} from 'react'
import {Row,Col} from 'reactstrap'
import TeamRequestsTable from '../TeamRequestsTable'
import Cookies from 'js-cookie'
import { db } from "firebase-config";
import { getDocs, collection,doc,getDoc,updateDoc,addDoc,query,where,orderBy,onSnapshot } from 'firebase/firestore'
const ApprovedTimesheet = () => {
    const [approvedTimesheet,setApprovedTimesheet] = useState([])
    const team=Cookies.get('team');
    const level=Cookies.get('level');
    const levelStatus=level+"status"
    console.log(levelStatus)
    useEffect(() => {
        const getData = async () => {
           
              const filteredUsersQuery =query(collection(db,'timesheet'),where('status','==','approved'),orderBy('timestamp','asc'));
          onSnapshot(filteredUsersQuery,(data)=>{
            setApprovedTimesheet(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
          })
        };
        getData();
    }, [])
  return (
    <div className='page-content'>
      <Row>
        <Col lg="12">
          <TeamRequestsTable data = {approvedTimesheet}  request={false} />
        </Col>
      </Row>
    </div>
  )
}

export default ApprovedTimesheet