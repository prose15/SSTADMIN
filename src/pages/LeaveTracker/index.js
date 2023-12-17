import React from 'react';
import { Container, Row,Col, Card, CardBody, CardTitle  } from 'reactstrap';
import CandidateSection from './CandidateSection';
import Apaexlinecolumn from 'pages/AllCharts/Apex/apaexlinecolumn';
import Section from 'pages/timesheet/Dashboard-saas/Section';
import Leavecards from './Leavecards';
import FormLayouts from 'pages/Forms/ProfileLayout';
import { useState,useEffect } from 'react';
import {collection,getDocs,query,where,orderBy} from 'firebase/firestore'
import Cookies from 'js-cookie';
import { db } from "firebase-config";
import Leaveapaexlinecolumn from './Leaveapaexlinecolumn';
import getChartColorsArray from 'components/Common/ChartsDynamicColor';


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
    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                     <Section btn={'Add Leave'} link={'/addleave'}/>
                     <Leavecards/>
                     <Leaveapaexlinecolumn dataColors='["--bs-primary","--bs-danger", "--bs-success"]'/>
                    <Row>
                        <Col xl={8}>
                            <Card>
                                <CardBody>
                                <CardTitle className="mb-4">Leave taken as per months</CardTitle>
                                <Apaexlinecolumn dataColors='["--bs-danger","--bs-primary", "--bs-success"]'/>
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