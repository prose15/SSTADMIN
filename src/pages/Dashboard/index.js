import PropTypes from "prop-types";
import React ,{useState,useEffect} from "react";
import { Link } from "react-router-dom";
import StackedColumnChart from "./StackedColumnChart";
import ApexCharts from "../Charts/Apexcharts";
import DatatableTables from "../Tables/DatatableTables";
import {
  Container,
  Row,
  Col,
  Button,
  Card,
  CardBody,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Table,
} from "reactstrap";
import WelcomeComp from "./WelcomeComp";
import MonthlyEarning from "./MonthlyEarning";
import RecentFile from "pages/FileManager/RecentFile";
import ChartjsChart from "pages/Charts/ChartjsChart";
//Firebase
import { db } from 'firebase-config';
import { collection, getDocs, where, query,doc,getDoc } from 'firebase/firestore'
//i18n
import { withTranslation } from "react-i18next";
import { Rectangle } from "react-leaflet";
import Cookies from 'js-cookie'

const Dashboard = props => {

  const [name,setName]=useState('')
  const [email,setEmail]=useState('')
  const [role,setRole]=useState('')
   useEffect(()=>{
       const handleGet=async()=>{
      const docRef = doc(db, "admin", JSON.parse(sessionStorage.getItem('uid')));
   const docSnap = await getDoc(docRef)
   if(docSnap.exists()){
   setName(()=>docSnap.data().name,)
   setRole(()=>docSnap.data().designation)
   Cookies.set('team',docSnap.data().team,{secure:'true',path:'/'})
   Cookies.set('name',docSnap.data().name,{secure:'true',path:'/'})
   Cookies.set('email',docSnap.data().email,{secure:'true',path:'/'})
   Cookies.set('gender',docSnap.data().gender,{secure:'true',path:'/'})
   Cookies.set('id',docSnap.data().employeeID,{secure:'true',path:'/'})
   Cookies.set('phone',docSnap.data().phone,{secure:'true',path:'/'})
   Cookies.set('role',docSnap.data().designation,{secure:'true',path:'/'})
   Cookies.set('level',docSnap.data().level,{secure:'true',path:'/'})
   }
   }

    handleGet()   
       },[]
     )
  
  const reports = [
    { title: "Total hours", iconClass: "bx bxs-time", description: "40" },
    { title: "Remaining hours", iconClass: "bx bxs-timer", description: "10" },
    {
      title: "Timesheets submitted",
      iconClass: "bx bxs-calendar-check",
      description: "1",
    },
  ];


  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid><Row>
            <Col xl="4">
              <WelcomeComp name={name} role={role} />
              <MonthlyEarning />
            </Col>
            <Col xl="8">
              <Row>
                {/* Reports Render */}
                {reports.map((report, key) => (
                  <Col md="4" key={"_col_" + key}>
                    <Card className="mini-stats-wid">
                      <CardBody>
                        <div className="d-flex">
                          <div className="flex-grow-1">
                            <p className="text-muted fw-medium">
                              {report.title}
                            </p>
                            <h4 className="mb-0">{report.description}</h4>
                          </div>
                          <div className="avatar-sm rounded-circle bg-primary align-self-center mini-stat-icon">
                            <span className="avatar-title rounded-circle bg-primary">
                              <i
                                className={
                                  "bx " + report.iconClass + " font-size-24"
                                }
                              ></i>
                            </span>
                          </div>
                        </div>
                      </CardBody>
                    </Card>
                  </Col>
                ))}
              </Row>
              <Row>
            <ApexCharts/>
            </Row>
            </Col>
          </Row>
          <Row>
          <Col sm="6">
          <RecentFile/>
          </Col>
          <Col sm="6">
          <ChartjsChart/>
          </Col>
          </Row>

        </Container>
      </div>
    </React.Fragment>
  );
};

Dashboard.propTypes = {
  t: PropTypes.any,
  chartsData: PropTypes.any,
  onGetChartsData: PropTypes.func,
};

export default withTranslation()(Dashboard);
