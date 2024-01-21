import PropTypes from "prop-types";
import React ,{useState,useEffect, useMemo} from "react";
import EChart from "pages/Charts/EChart";
import { Link } from "react-router-dom";
import StackedColumnChart from "./StackedColumnChart";
import ApexCharts from "../Charts/Apexcharts";
import DatatableTables from "../Tables/DatatableTables";
// import './Dashboard.css'
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

//Import Breadcrumb
// import Breadcrumbs from "../../components/Common/Breadcrumb";
import WelcomeComp from "./WelcomeComp";
import MonthlyEarning from "./MonthlyEarning";
import RecentFile from "pages/FileManager/RecentFile";
import ChartjsChart from "pages/Charts/ChartjsChart";

//Firebase
import { db } from 'firebase-config';
import { collection, getDocs, where, query,doc,getDoc,onSnapshot } from 'firebase/firestore'

//i18n
import { withTranslation } from "react-i18next";
import Cookies from 'js-cookie'
import Calender from "components/Common/Calender";
import TeamMates from "./TeamMates";
import { Toast,ToastBody, ToastHeader } from 'reactstrap';

const Dashboard = props => {
  const [toast,setToast]=useState(false)
  const [name,setName]=useState('')
  const [team,setTeam]=useState([])
  const [role,setRole]=useState('')
  const [holiday,setHoliday]=useState([])
  const todayTimeStamp=new Date()
  todayTimeStamp.setHours(23)
  todayTimeStamp.setMinutes(59)
  todayTimeStamp.setSeconds(59)
   useEffect(()=>{

       const handleGet=async()=>{
      const docRef = doc(db, "admin", JSON.parse(sessionStorage.getItem('uid')));
   const docSnap = await getDoc(docRef)
   if(docSnap.exists()){
   setName(()=>docSnap.data().name,)
   setRole(()=>docSnap.data().designation)
   Cookies.set('level',docSnap.data().level,{secure:'true',path:'/'})
   Cookies.set('team',docSnap.data().team,{secure:'true',path:'/'})
   Cookies.set('name',docSnap.data().name,{secure:'true',path:'/'})
   Cookies.set('email',docSnap.data().email,{secure:'true',path:'/'})
   Cookies.set('gender',docSnap.data().gender,{secure:'true',path:'/'})
   Cookies.set('id',docSnap.data().employeeID,{secure:'true',path:'/'})
   Cookies.set('phone',docSnap.data().phone,{secure:'true',path:'/'})
   Cookies.set('role',docSnap.data().designation,{secure:'true',path:'/'})
   const filteredUsersQuery =query(collection(db,'users'),where('team','==',Cookies.get('team')));
        const data=await getDocs(filteredUsersQuery).catch((err)=>{
          console.log(err);
        })
        setTeam(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
        
        
       
   }
   }
    handleGet() 
      
       },[]
     )
     useMemo(()=>{
      const getData=  async()=>{
        const filteredLeaveQuery =query(collection(db,'Holidays'),where('fromTimeStamp','>',todayTimeStamp));
        const data1=await getDocs(filteredLeaveQuery).catch((err)=>{
          console.log(err);
        })
        setHoliday(data1.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
        setToast(true)
      } 
      getData()
     },[])
  const reports = [
    { title: "Leave Taken", iconClass: "bx bxs-calendar-check", description: "12" },
    { title: "Worked Hours", iconClass: "bx bxs-time", description: "128" },
    {
      title: "Tickets  Worked",
      iconClass: "bx bxs-report",
      description: "3",
    },
  ];
  const totHours =  (startTime, endTime) => {
    let hours = 0, totminutes = 0, minutes = 0
    for (let i = 0; i < startTime.length; i++) {
      let arr = startTime[i].split(":");
      let arr2 = endTime[i].split(":");
      hours += parseInt(arr2[0]) - parseInt(arr[0])
      var diff = parseInt(arr[1]) - parseInt(arr2[1])
      if (diff > 0) {
        totminutes -= diff;
      }
      else if (diff < 0) {
        totminutes += (diff *= -1)
      }
      while (totminutes >= 60) {
        totminutes -= 60
        hours += 1
      }
      while (totminutes <= -60) {
        totminutes += 60
        hours -= 1
      }
    }

    if (totminutes < 0) {
      hours--;
      minutes = 60 + totminutes;
    }
    else if (totminutes > 0) {
      minutes = totminutes;
    }
    let strminutes = minutes > 9 ? minutes.toString() : "0" + minutes.toString()

    return (hours)
  }

  // orderBy('timestamp','asc')
  const email=Cookies.get('email')
  const [details,setDetails]=useState([])
  useEffect(()=>{
    const handleGet=async()=>{
      const today=new Date();
      const year=today.getFullYear().toString();
      const month=(today.getMonth()+1).toString();
      console.log("year:",year,"month:",month)

    const filteredUsersQuery =query(collection(db,'Timesheet'),where('month','==',month),where('email','==',email),where('year','==',year));

      onSnapshot(filteredUsersQuery,(data)=>{
        setDetails(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
      })
       
    }
    handleGet()
},[])


const startTime=[]
const endTime=[]
for(let i=0;i<details.length;i++){
  // console.log("startTime",details[i].startTime)
  startTime.push(details[i].startTime)
  endTime.push(details[i].endTime)
}

const workedHours=(totHours(startTime,endTime))?(totHours(startTime,endTime)):0
console.log("workedhours",workedHours)
const findMin=(data)=>{
  const seconds    = data.timestamp?.seconds
  const nanoseconds = data.timestamp?.nanoseconds
  const timestampInMilliseconds = seconds * 1000 + Math.floor(nanoseconds / 1e6);
    const dateObject = new Date(timestampInMilliseconds);
    const today =new Date()
    const timeDiff = today - dateObject
    const minsDiff = Math.floor(timeDiff/(1000 * 60))
    return minsDiff
}
console.log(holiday);
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Row>
            {
              holiday &&  <>
                {
                  holiday.map((data)=>(
                    <div key={data.id} className="position-fixed d-flex justify-content-center top-0 end-0 p-3" style={{ zIndex: "1005" }}>
            <Toast 
              isOpen={toast}
              role="alert"
              >
              <ToastHeader toggle={() => setToast(!toast)}>
                  <strong className="me-auto">{data.subject}</strong>
                  <small style={{ marginLeft: "145px" }} className="text-muted"> {(findMin(data)===0)?('Just now'):((findMin(data)<60)?
                        findMin(data)+" mins ago":(Math.floor(findMin(data)/60>24)?(Math.floor(findMin(data)/60/24+"days ago")):(Math.floor(findMin(data)/60)+" hrs ago")))
                       }</small>
              </ToastHeader>
              <ToastBody>
              {data.reason}
              </ToastBody>
          </Toast>
          </div>
                  ))
                }
              
              </>
            }
         
            <Col xl="4">
              <WelcomeComp name={name} role={role} />
              {/* <Col xl="6"> */}
              <TeamMates team={team} />
              {/* </Col> */}
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
            <Calender/>
            </Row>
            </Col>
            
          </Row>
          {/* <Row>
            <DatatableTables/>
          </Row> */}

          <Row>
          <Col sm="12">
          <RecentFile/>
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
