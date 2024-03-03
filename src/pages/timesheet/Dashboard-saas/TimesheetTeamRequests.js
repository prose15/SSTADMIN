import React ,{useState , useEffect} from 'react'
import {Row,Col} from 'reactstrap'
import TeamRequestsTable from './TeamRequestsTable'
import Section from './Section'
import Cookies from 'js-cookie'
import { db } from "firebase-config";
import { getDocs, collection,doc,getDoc,updateDoc,addDoc,query,where,orderBy,onSnapshot } from 'firebase/firestore'
const TimesheetTeamRequests = () => {
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
  console.log(levelStatus)
  useEffect(() => {
      const getData = async () => {
         if(Cookies.get('role')==='Chief Execuetive Officer'){
          const filteredUsersQuery =query(collection(db,'timesheet'),where('L4status','==',''),orderBy('timestamp','asc'));
          onSnapshot(filteredUsersQuery,(data)=>{
            setDetails(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
          })
         }
         else{
            const filteredUsersQuery =query(collection(db,'timesheet'),where('team','==',team),where(levelStatus,'==',''),where('status','==','pending'),orderBy('timestamp','asc'));
        onSnapshot(filteredUsersQuery,(data)=>{
          setDetails(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
        })
      }
      };
      getData();
  }, [])
  console.log(details)
  return (
    <div className='page-content'>
      <Row>
        <Col lg="12">
        <Section  btn={'Add Services'} link={'/timesheet/logtime'}/>
          <TeamRequestsTable data = {details}  request={true} />
        </Col>
      </Row>
    </div>
  )
}

export default TimesheetTeamRequests