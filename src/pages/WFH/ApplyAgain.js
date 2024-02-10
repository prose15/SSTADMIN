import React,{useState , useEffect} from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  Col,
  Container,
  Row,
  CardBody,
  CardTitle,
  Label,
  Button,
  Form,
  FormGroup,
  Input,
  InputGroup,
  Alert,
} from "reactstrap";
import Select from "react-select";
import AlertModal from "pages/Modal/AlertModal";
import "flatpickr/dist/themes/material_blue.css";
import * as Yup from "yup";
import { Formik, useFormik } from "formik";
import { db,storage} from "firebase-config";
import { collection,addDoc, Timestamp, doc, getDoc, updateDoc } from "firebase/firestore";
import Cookies from 'js-cookie'
import {ref,uploadBytes} from 'firebase/storage'
import { leaveprojects } from "common/data/leaveprojects";
import { useParams } from "react-router-dom";
import { useStateContext } from "Context/ContextProvider";
const ApplyAgain = props => {
    const id=useParams()
    const WFH = "Work From Home"
    const [data,setData]=useState();
    const [addDetails, setNewDetails] = useState([])
    const [fromDate,setFromDate] = useState('')
    const [toDate,setToDate] = useState('')
    const [subject,setSubject] = useState('')
    const[reason,setReason]=useState('')
    const [leaveType,setLeaveType]=useState('')
    const [condition,setCondition] = useState(true)
    const [days,setDays]=useState(0)
    const {available,leave,modal_backdrop,setmodal_backdrop}= useStateContext()
    const [selectedGroup, setselectedGroup] = useState(null);
    const [casualType,SetCasualType]=useState(leaveType)
    const [dataToModal,setDataToModal]=useState(null)
    useEffect(()=>{
        const getData=async()=>{
            const docRef=doc(db,'WFH',id.id)
            const docSnap=await getDoc(docRef)
            if(docSnap.exists()){
                setFromDate(docSnap.data().from)
                setToDate(docSnap.data().to)
                setSubject(docSnap.data().subject)
                setReason(docSnap.data().reason)
                // setLeaveType(docSnap.data().leaveType)

            }
        }
        getData()
        },[])
        const [newData,setNewData]=useState(null)
  useEffect(()=>{
    const getData=async()=>{
      const docSnap= await getDoc(doc(db,'admin',JSON.parse(sessionStorage.getItem('uid'))))
      if(docSnap.exists()){
        setNewData(docSnap.data())
      }
    }
    getData()
  },[])
  const team = Cookies.get('team');
    const name = Cookies.get('name')
    const email=Cookies.get('email');
    // const earnedLeave=Cookies.get('earnedLeave')
    const [file,setFile]=useState(null);
    const [alertMsg,setAlertMsg] = useState('')

    let details=[]
    const today = new Date();
    let reportingManager=''
    const level=Cookies.get('level')
  if(team==='Delivery' || team=== 'HR'){
    details=[...details,'Gobi',]
  if(level==='L1' || level==='L2'){
    reportingManager=details[0];
  }
  }
  else if(team==='Sales'){
    details= [...details,'Krishna kumar']
    if(level=='L1'){
     reportingManager=details[0];
   }
 }
    const nav = useNavigate()
    const date=new Date().getDate()+'-'+(new Date().getMonth()+1)+'-'+new Date().getFullYear()
  const [alert,setAlert]=useState('d-none')
  const [alertErr,setAlertErr]=useState('d-none')
  const yesterday = new Date()
  yesterday.setDate(today.getDate()-1)
  function getDatesBetweenDates(startDate, endDate) {
    const dates = [];
    for (let date = startDate; date <= endDate; date.setDate(date.getDate() + 1)) {
      dates.push(new Date(date));
    }
    return dates;
  }
 
  
 const handleSubmit=()=>{ 
  if( reportingManager=='' || fromDate=='' || toDate=='' || subject=='' || reason==''){
  }  
 else{
    
        const startDate = new Date(fromDate)
        const endDate = new Date(toDate)
          const fromTimeStamp=Timestamp.fromMillis(startDate.getTime())
          const toTimeStamp=Timestamp.fromMillis(endDate.getTime())
            const fromYear=fromDate.split('-')
            const toYear=toDate.split('-')
            const dates = getDatesBetweenDates(startDate,endDate)
            const holidays = dates.filter(date => (date.getDay()==5 || date.getDay()==6) )
            const newDetails={name:name,level:level,email:email,team:team,reason:reason,subject:subject, 
            WFH:WFH, reportManager:reportingManager,fromTimeStamp:fromTimeStamp,toTimeStamp:toTimeStamp,from: fromDate, to: toDate, requestDate: new Date().getFullYear()+"-"+(new Date().getMonth()+1)+"-"+new Date().getDate(),status:'re-apply',L1status:'',L2status:'',L3status:'',noofdays:dates.length-holidays.length,timestamp:Timestamp.now(),
            fromYear:fromYear[0],
            toYear:toYear[0]}
          addDoc(collection(db,'WFH'),newDetails).then(()=>{
              newData.WFH+=newDetails.noofdays
              updateDoc(doc(db,'admin',JSON.parse(sessionStorage.getItem('uid'))),newData).then(()=>{
                console.log('profile updated')
              }).catch((err)=>{
                console.log(err);
              })
              setAlert('d-block')
              localStorage.setItem('type',newDetails.leaveType)
              setTimeout(()=>{nav('/WFH/records')},2000)
          })
      .catch((err) => {
          console.log(err.message);
          })
          
            
 }
  }   
  return (
    <React.Fragment>
      <div className="page-content">
        <Container>
        <Alert color='danger mt-4' id='timeLimit' className={alertErr}>{alertMsg}</Alert>
          <Row>
            <Col>
            { condition && (
            <Alert color='success' id="" className={alert}>{'Form forwarded to L1 Manager'}</Alert>)}
            {
             dataToModal!=null &&  <AlertModal  data={dataToModal} file={file} newData={newData} />
            }
              <Card className='mt-5 w-100  mx-auto'>
                <CardBody >
                  <CardTitle className="mb-4">Submit Your Application!</CardTitle>
                  <Form onSubmit={(e)=>e.preventDefault()}>
                    <Row>
                    <Col md={6}>
                        <div className="mb-3">
                          <Label htmlFor="formrow-email-Input">Work Type</Label>
                          <Input
                            value={WFH}
                          />
                        </div>
                      </Col>
                      <Col md={6}>
                        <div className="mb-3">
                          <Label htmlFor="formrow-email-Input">Reporting Manager</Label>
                          <Input
                            value={reportingManager}
                          />
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={6}>
                        <div className="">
                          <Label htmlFor="formrow-email-Input">Start Date</Label>
                          
                          <Input
                              className={ "form-control"}
                              id="formrow-email-Input"
                              type="date"
                              onChange={(e)=>{
                                setFromDate(e.target.value)
                               }}
                               value={fromDate}
                                 />
                        </div>
                       
                      </Col>
                      <Col md={6}>
                        <div className="">
                          <Label htmlFor="formrow-password-Input">End Date</Label>
                          <Input
                              className={"form-control"}
                              id="formrow-email-Input"
                              name="toDate"
                              type="date"
                              onChange={(e)=>{
                                setToDate(e.target.value)
                               }}
                               value={toDate}
                                 />
                        </div>
                        
                      </Col>
                    </Row>
                    <div className="mt-3">
                        <Label>Subject</Label>
                    <Input
                      type="text"
                      id="subject"
                      className= {"form-control"}
                      name="subject"
                      maxLength="50"
                    placeholder="Please Enter Your Subject..."
                      onChange={(e)=>setSubject(e.target.value)}
                      value={subject}
                    />
                  </div>
                    <div className="mt-3">
                    <Label>Reason</Label>
                    <Input
                      type="textarea"
                      id="reason"
                      className= { "form-control"}
                      name="reason"
                      maxLength="250"
                      rows="3"
                      placeholder="Don't exceed 250 words..."
                      onChange={(e)=>setReason(e.target.value)}
                      value={reason}
                    /> 
                  </div>
                  <div>
                      <button type="submit" className="btn btn-primary w-md mt-5" onClick={()=>handleSubmit()}
                      >Submit</button>
                    </div>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
}

export default ApplyAgain;