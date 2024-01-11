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
// import { useState,useEffect } from 'react';

const LeaveTracker = () => {

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
const [details,setDetails]=useState([])
const name=Cookies.get('name')

useEffect(()=>{
    const getData=async()=>{
        const filteredUsersQuery =query(collection(db,'leave submssion'),where('name','==',name));
        const data=await getDocs(filteredUsersQuery).catch((err)=>{
          console.log(err);
        })
        setDetails(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
        
    }
    getData()
  },[])

const today=new Date();

const graphdetails=details.filter((detail)=>new Date(detail.from).getFullYear()==today.getFullYear()||new Date(detail.to).getFullYear()==today.getFullYear())

// console.log(graphdetails)


const leave=[0,0,0,0,0,0,0,0,0,0,0,0]
const nextyearleave=[0,0,0,0,0,0,0,0,0,0,0,0]
let checkyear=new Date()
let checkyear2=new Date()
checkyear2.setDate(checkyear.getDate()-1)
// if(checkyear.getFullYear()!=checkyear2.getFullYear()){
//   leave=nextyearleave
//   nextyearleave=[0,0,0,0,0,0,0,0,0,0,0,0]
// }

for(let i=0;i<graphdetails.length;i++){
  if(graphdetails[i].status==="approved"){
  let sDate=new Date(graphdetails[i].from)
  let eDate=new Date(graphdetails[i].to)
  const today=new Date();
  console.log(sDate,eDate)
  console.log(sDate.getMonth(),eDate.getMonth())
  while(sDate<=eDate){
    if(sDate.getDay()==5 || sDate.getDay()==6){
      sDate=sDate
    }
    else if(sDate.getMonth()!=eDate.getMonth() && sDate.getFullYear()==today.getFullYear()){
      leave[sDate.getMonth()]++
    }
    else if(sDate.getFullYear()==today.getFullYear()){
      leave[eDate.getMonth()]++
    }
    else if(sDate.getFullYear()!=today.getFullYear()){
      nextyearleave[sDate.getMonth()]++
    }

    sDate.setDate(sDate.getDate()+1)
  }
}
}

var available=[1.5,0,0,0,0,0,0,0,0,0,0,0]
let earnedLeave=0

for(let i=0;i<available.length;i++){
const remaining=available[i]-leave[i]
if(remaining>0){
if(i==11){
  earnedLeave+=remaining/2
}
else{
available[i+1]+=remaining
}
}
if(i!==11){
available[i+1]+=1.5
}
}
console.log(earnedLeave);
 updateDoc(doc(db,'users',JSON.parse(sessionStorage.getItem('uid'))),{earnedAvailable:earnedLeave}).then(()=>{
  console.log('earned leave updated')
  Cookies.set('earnedLeave',earnedLeave)
}).catch((err)=>{
  console.log(err)
})

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