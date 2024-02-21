import React, { useMemo } from 'react';
import { Container, Row,Col, Card, CardBody, CardTitle  } from 'reactstrap';
import CandidateSection from './CandidateSection';
import Leaveapaexlinecolumn from "../AllCharts/Apex/leaveapaexlinecolumn"
import Section from 'pages/timesheet/Dashboard-saas/Section';
import Leavecards from './Leavecards';
import { useState,useEffect } from 'react';
import {collection,getDocs,query,where,orderBy,onSnapshot,updateDoc,doc} from 'firebase/firestore'
import Cookies from 'js-cookie';
import { db } from "firebase-config";
import { useStateContext } from 'Context/ContextProvider';
const LeaveTracker = () => {
  const {earnedLeave,available,leave,detail,}= useStateContext()
  const [users,setUsers]=useState([])
const [admin,setAdmin]=useState([])
useEffect(() => {
    const getData= async() => {
    const data = await getDocs(collection(db,'users')).then((data)=>{
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    }).catch((err)=>{
      console.log(err)
    })
    const adminData = await getDocs(collection(db,'admin')).then((data)=>{
      setAdmin(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    }).catch((err)=>{
      console.log(err)
    })
    }
    getData()
  }, [])
  const email=Cookies.get('email')
  const todayTimeStamp=new Date()
  todayTimeStamp.setHours(23)
  todayTimeStamp.setMinutes(59)
  todayTimeStamp.setSeconds(59)
  console.log(detail)
  const upcomingLeaves=detail.filter((data)=>new Date(data.from)>=todayTimeStamp)
//   users.map((user)=>{
//   updateDoc(doc(db,'users',user.id),{leaveBalance:available,earnedAvailable:1,lopAvailable:0,lop:0,earned:0,casual:0,sick:0,flexi:0,casualAvailable:0}).then(()=>{
// }).catch((err)=>{
//   console.log(err)
// })
//   })
//   admin.map((user)=>{
//     updateDoc(doc(db,'admin',user.id),{leaveBalance:available,earnedAvailable:1,lopAvailable:0,lop:0,earned:0,casual:0,sick:0,flexi:0,casualAvailable:0}).then(()=>{
//   }).catch((err)=>{
//     console.log(err)
//   })
//     })


const today=new Date();
if(today.getMonth()===11 ){
  updateDoc(doc(db,'admin',JSON.parse(sessionStorage.getItem('uid'))),{earnedAvailable:earnedLeave}).then(()=>{
 }).catch((err)=>{
   console.log(err)
 })
 }

    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                     <Section btn={'Add Leave'} link={'/addleave'}/>
                    <Leavecards/>
                    <Row>
                        <Col xl={8}>
                            <Card>
                                <CardBody>
                                <CardTitle className="mb-4">Leave taken as per months</CardTitle>
                                <Leaveapaexlinecolumn taken={leave} available={available} dataColors='["--bs-danger","--bs-success"]'/>
                                </CardBody>
                            </Card>
                       </Col>
                       <Col xl={4}>
                             <CandidateSection upcomingLeaves={upcomingLeaves}/>
                        </Col>
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    );
}

export default LeaveTracker;