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
  const {earnedLeave,available,leave,detail}= useStateContext()
  const email=Cookies.get('email')
  const todayTimeStamp=new Date()
  todayTimeStamp.setHours(23)
  todayTimeStamp.setMinutes(59)
  todayTimeStamp.setSeconds(59)
  const upcomingLeaves=detail.filter((data)=>data.fromTimeStamp>todayTimeStamp)
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