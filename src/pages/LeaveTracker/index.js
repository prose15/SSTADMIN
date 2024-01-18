import React, { useMemo } from 'react';
import { Container, Row,Col, Card, CardBody, CardTitle  } from 'reactstrap';
import CandidateSection from './CandidateSection';
import Leaveapaexlinecolumn from "../AllCharts/Apex/leaveapaexlinecolumn"
import Section from 'pages/timesheet/Dashboard-saas/Section';
import Leavecards from './Leavecards';
import FormLayouts from 'pages/Forms/ProfileLayout';
import { useState,useEffect } from 'react';
import {collection,getDocs,query,where,orderBy,onSnapshot,updateDoc,doc} from 'firebase/firestore'
import Cookies from 'js-cookie';
import { db } from "firebase-config";
import { useStateContext } from 'Context/ContextProvider';
const LeaveTracker = () => {
  const {earnedLeave,available,leave}= useStateContext()
  const [upcomingLeaves,setUpcomingLeaves]=useState([])
  const email=Cookies.get('email')
  const todayTimeStamp=new Date()
  todayTimeStamp.setHours(23)
  todayTimeStamp.setMinutes(59)
  todayTimeStamp.setSeconds(59)
  useMemo(()=>{
      const handleGet=async()=>{
          const filteredUsersQuery =query(collection(db,'leave submssion'),where('email','==',email),where('status','==','approved'),where('fromTimeStamp','>',todayTimeStamp),orderBy('timestamp','desc'));
          onSnapshot(filteredUsersQuery,(data)=>{
            setUpcomingLeaves(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
          })
      }
      handleGet()
  },[])
const today=new Date();
if(today.getMonth()===11 ){
  updateDoc(doc(db,'admin',JSON.parse(sessionStorage.getItem('uid'))),{earnedAvailable:earnedLeave}).then(()=>{
   console.log('earned leave updated')
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