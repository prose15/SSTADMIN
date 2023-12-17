import React from 'react';
import { Container, Row,Col, Card, CardBody, CardTitle  } from 'reactstrap';
import CandidateSection from './CandidateSection';
import Leaveapaexlinecolumn from "../AllCharts/Apex/leaveapaexlinecolumn"
import Section from 'pages/timesheet/Dashboard-saas/Section';
import Leavecards from './Leavecards';
import FormLayouts from 'pages/Forms/ProfileLayout';
import { useState,useEffect } from 'react';
import {collection,getDocs,query,where,orderBy} from 'firebase/firestore'
import Cookies from 'js-cookie';
import { db } from "firebase-config";

const LeaveTracker = () => {
    
const [details,setDetails]=useState([])
const name=Cookies.get('name')
useEffect(()=>{
    const getData=async()=>{
        // const collection=collection(db,'timesheet')
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
// console.log(details)
console.log(graphdetails)

// fromtoprogram

// sDateArray=[startDate,startDate2]
// eDateArray=[endDate,endDate2]
const leave=[0,0,0,0,0,0,0,0,0,0,0,0]
for(let i=0;i<graphdetails.length;i++){
  if(graphdetails[i].status==="accept"){
  let sDate=new Date(graphdetails[i].from)
  let eDate=new Date(graphdetails[i].to)
  const today=new Date();
  console.log(sDate,eDate)
  console.log(sDate.getMonth(),eDate.getMonth())
  while(sDate<=eDate){
    if(sDate.getMonth()!=eDate.getMonth() && sDate.getFullYear()==today.getFullYear()){
      leave[sDate.getMonth()]++
    }
    else if(sDate.getFullYear()==today.getFullYear()){
      leave[eDate.getMonth()]++
 
    }
    sDate.setDate(sDate.getDate()+1)
  }
}
}

// console.log(leave);

// fromtoprogram

console.log(details.length);
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
                                <Leaveapaexlinecolumn graphData={leave} dataColors='["--bs-danger","--bs-success"]'/>
                                </CardBody>
                            </Card>
                       </Col>
                       <Col xl={4}>
                             <CandidateSection />
                        </Col>
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    );
}

export default LeaveTracker;