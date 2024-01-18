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
import "flatpickr/dist/themes/material_blue.css";
import { DatePicker } from "antd";
import * as Yup from "yup";
import { Formik, useFormik } from "formik";
import { db,storage} from "firebase-config";
import { collection,addDoc, Timestamp,
 } from "firebase/firestore";
import Cookies from 'js-cookie'
import {ref,uploadBytes} from 'firebase/storage'
import { current } from "@reduxjs/toolkit";
const LeaveForm = props => {
  let details=[]
  let reportingManager=''
  let customErrorMessage = 'invalid option';
  const team = Cookies.get('team');
  const nav = useNavigate()
  const name = Cookies.get('name')
  const email=Cookies.get('email');
  const earnedLeave=Cookies.get('earnedLeave')
  const today = new Date();
  const level=Cookies.get('level')
  const date=new Date().getDate()+'-'+(new Date().getMonth()+1)+'-'+new Date().getFullYear()
  const yesterday = new Date()
  yesterday.setDate(today.getDate()-1)
  const [file,setFile]=useState(null);
  const [alertMsg,setAlertMsg] = useState('')
  const [addDetails, setNewDetails] = useState([])
  const [fromDate,setFromDate] = useState('')
  const [toDate,setToDate] = useState('')
  const [subject,setSubject] = useState('')
  const [condition,setCondition] = useState(true)
  const [alert,setAlert]=useState('d-none')
  const [alertErr,setAlertErr]=useState('d-none')
  const flexidays =['2024-01-01','2024-01-15','2024-01-26','2024-04-09','2024-04-11','2024-04-14','2024-05-01','2024-06-17','2024-07-07','2024-07-17','2024-08-15','2024-09-15','2024-09-16','2024-10-02','2024-10-31','2024-12-25',] 
  const isFlexi=(date)=>{
    let flag=0;
    for(let i=0;i<flexidays.length;i++){
      if(flexidays[i]===date){
        flag=1;
        break;
      }
    }
    if(flag===1){
      return true
    }
    else{
      return false
    }
  }

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
 
  async function upload(file){
    const fileRef=ref(storage,`'MedicalProof/'+${date}`/+email);
     await uploadBytes(fileRef,file).then(()=>{
      console.log('uploaded');
    }).catch((err)=>{
      console.log(err);
    })
  }
  const initialValues = {
    leaveType:"",
    reportingManager:reportingManager,
    fromDate:fromDate,
    toDate:toDate,
    subject:subject,
    reason:"",
  }
const schema = Yup.object().shape({
    leaveType: Yup.string()
    .required('Please select an option'),
    subject: Yup.string().min(3).required("Please Enter Your Subject"),
    reason: Yup.string().min(3).required("Please Enter Your reason"),
    fromDate: Yup.date().min((yesterday),"set a valid date")
    .required('This field is required'),
    toDate: Yup.date().required('This field is required').min(Yup.ref('fromDate'),"end date can't be before start date"),
});
function getDatesBetweenDates(startDate, endDate) {
  const dates = [];
  for (let date = startDate; date <= endDate; date.setDate(date.getDate() + 1)) {
    dates.push(new Date(date));
  }
  return dates;
}
const {values,handleBlur,handleChange,handleSubmit,errors,touched}= useFormik({
  initialValues:initialValues,
  validationSchema: schema,
  onSubmit:(values) =>{    
    console.log(values);
            const startDate = new Date(values.fromDate)
            const endDate = new Date(values.toDate)
              console.log("startDate",startDate,"endDate",endDate)
              const fromTimeStamp=Timestamp.fromMillis(startDate.getTime())
              const toTimeStamp=Timestamp.fromMillis(endDate.getTime())
              console.log(fromTimeStamp,"and",toTimeStamp)
              let dates = [];
              const today = new Date();
              const fdate = new Date(values.fromDate)
              for (let date = today ; date <= fdate; date.setDate(date.getDate() + 1)) {
                dates.push(new Date(date));
                console.log(dates);
              }
              const datesWithoutHolidays = dates.filter(date => (date.getDay()!=5 && date.getDay()!=6) )
              console.log(datesWithoutHolidays);
              function CorrectPath () {
                const fromYear=values.fromDate.split('-')
                const toYear=values.toDate.split('-')
                const dates = getDatesBetweenDates(startDate,endDate)
                const holidays = dates.filter(date => (date.getDay()==5 || date.getDay()==6) )
                const newDetails={name:name,email:email,team:team,reason:values.reason,subject:values.subject, leaveType:values.leaveType, reportManager: values.reportingManager,fromTimeStamp:fromTimeStamp,toTimeStamp:toTimeStamp,from: values.fromDate, to: values.toDate, requestDate: new Date().getFullYear()+"-"+(new Date().getMonth()+1)+"-"+new Date().getDate(),status:'pending',L1status:'',L2status:'',L3status:'',casualAvailable:12,earnedAvailable:earnedLeave,lopAvailable:0,paternityAvailable:0,sickAvailable:12,displayStatus:'',msgCount:'',noofdays:dates.length-holidays.length,timestamp:Timestamp.now(),
                fromYear:fromYear[0],
                toYear:toYear[0]}
                const newData = [...addDetails, details];
                    setNewDetails(newData)
      
              addDoc(collection(db,'leave submssion'),newDetails).then(()=>{
                if(file){
                  upload(file)
                  console.log("message added successfully");
                  setAlert('d-block')
                  localStorage.setItem('type',newDetails.leaveType)
                  setTimeout(()=>{nav('/leavetracker')},2000)
                }
                
                  console.log("message added successfully");
                  setAlert('d-block')
                  localStorage.setItem('type',newDetails.leaveType)
                  setTimeout(()=>{nav('/leavetracker')},2000)
                
              })
                
          .catch((err) => {
              console.log(err.message);
              })
              }
             
               if(values.leaveType === 'Casualleave' && datesWithoutHolidays.length<5){
                setAlertMsg("You ought to reserve a maximum of 5 days, ensuring it is fewer than 5 days!")
              document.getElementById('timeLimit')
              setAlertErr('d-block')
              setTimeout(()=>{
                setAlertErr('d-none')},5000);
                setCondition(false)
               }
               else{
                if(values.leaveType.includes('Flexileave') && !isFlexi(values.fromDate)){
                  setAlertMsg("Sorry it's not a flexi day!")
                document.getElementById('timeLimit')
                setAlertErr('d-block')
                setTimeout(()=>{
                  setAlertErr('d-none')},5000);
                  setCondition(false)
                }
                else if(values.leaveType.includes('Flexileave') && datesWithoutHolidays.length<7){
                  setAlertMsg("You ought to reserve a maximum of 7 days, ensuring it is fewer than 7 days!")
                document.getElementById('timeLimit')
                setAlertErr('d-block')
                setTimeout(()=>{
                  setAlertErr('d-none')},5000);
                  setCondition(false)
                }
                 
                else{
                  CorrectPath()
                }
              
              }
                
                }})
  const countDays=(fromDate,toDate)=>{
    const dates = getDatesBetweenDates(fromDate,toDate)
    const holidays = dates.filter(date => (date.getDay()==5 || date.getDay()==6) ) 
    return dates.length-holidays.length  
                } 
                const disabledDate = current => {
                  // Disable dates that are not in the enabledDates array
                  return !flexidays.includes(current.format('YYYY-MM-DD'));
                };  
                
                const WeekEnds = current => {
                  const dayOfWeek = current.day();
                  return dayOfWeek === 5 || dayOfWeek === 6;
                };
  return (
    <React.Fragment>
      <div className="page-content">
        <Container>
        <Alert color='danger mt-4' id='timeLimit' className={alertErr}>{alertMsg}</Alert>
          <Row>
            <Col>
            { condition && (
            <Alert color='success' id="" className={alert}>{'Form forwarded to L1 Manager'}</Alert>)}
              <Card className='mt-5 w-100  mx-auto'>
                <CardBody >
                  <CardTitle className="mb-4">Submit Your Application!</CardTitle>
                  <Form onSubmit={handleSubmit}>
                    <Row>
                  <Col md={6}>
                  <div>
        <Label htmlFor="formrow-email-Input">Leave type</Label>
        <select
        className="form-select"
          id="leaveType"
          name="leaveType"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.leaveType}
        >
          <option value="" label="Select leave type" />
          <option value="Casualleave" label="Casual Leave" />
          <option value="Sickleave">Sick leave</option>
          {
          (Cookies.get('gender')==='Male')?(<option value="Paternityleave">Paternity leave</option>):(<option value="Maternityleave">Maternity</option>)
          }
          <option value='WFH'>Work from Home</option>
          <option value='Flexileave'>Flexi Leave</option>
          <option value='Earnedleave'>Earned Leave</option>
        </select>
        {touched.leaveType && errors.leaveType && (
          <div style={{ color: 'red' }}>{errors.leaveType}</div>
        )}
      </div>                  
                      </Col>
                      <Col md={6}>
                        <div className="mb-3">
                          <Label htmlFor="formrow-email-Input">Reporting Manager</Label>
                          <Input
                            name="keerthana"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.reportingManager}
                          />
                        </div>
                      </Col>
                    </Row>
                    <Row>
                    <Col md={6}>
                        <div className="">
                          <Label htmlFor="formrow-email-Input">Start Date</Label>
                          {
                            values.leaveType==='Flexileave'?(
                              
                              <DatePicker
                              className={errors.fromDate ? "  border-danger form-control" : "form-control"}
                              id="formrow-email-Input"
                              name="fromDate"
                              placeholder="Enter From Date"
                              onChange={(date,string)=>values.fromDate=string}
                              onBlur={handleBlur}
                                disabledDate={disabledDate}
                                format='YYYY-MM-DD'
                                 />
                                 
                            ):(
                              <DatePicker
                              className={errors.fromDate ? "  border-danger form-control" : "form-control"}
                              id="formrow-email-Input"
                             
                              placeholder="Enter From Date"
                              onChange={(date,string)=>values.fromDate=string}
                              onBlur={handleBlur}
                              disabledDate={WeekEnds}
                              format='YYYY-MM-DD'
                                 />
                                 
                            )
                          }
                           {errors.fromDate && <small className="text-danger">
                            {errors.fromDate}</small>}
                            {/* {errors.customErrorMessage && <small className="text-danger">
                            {errors.customErrorMessage}</small>} */}
                        </div>
                       
                      </Col>
                      <Col md={6}>
                        <div className="">
                          <Label htmlFor="formrow-password-Input">End Date</Label>
                          {
                            values.leaveType==='Flexileave'?(
                              <DatePicker
                              className={errors.toDate ? "  border-danger form-control" : "form-control"}
                              id="formrow-email-Input"
                              name="toDate"
                              placeholder="Enter From Date"
                              onChange={(date,string)=>{
                                values.toDate=string
                                
                               }}
                               onBlur={handleBlur}
                                disabledDate={disabledDate}
                                format='YYYY-MM-DD'
                                 />
                            ):(
                              <DatePicker
                              className={errors.toDate ? "  border-danger form-control" : "form-control"}
                              id="formrow-email-Input"
                              name="toDate"
                              placeholder="Enter From Date"
                              onChange={(date,string)=>{
                                values.toDate=string
                                
                               }}
                               onBlur={handleBlur}
                                format='YYYY-MM-DD'
                                 />
                            )
                          }
                           {errors.toDate && <small className="text-danger">
                            {errors.toDate}</small>}
                        </div>
                        
                      </Col>
                    </Row>
                    <div className="mt-3">
                    {
                        values.leaveType==='Sickleave'?(
                        <>
                        <Label htmlFor="formrow-email-Input">Choose Illness</Label>
                         <select
        className="form-select"
          name="subject"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.subject}
        >
          <option value="">Choose Your Illness</option>
          <option value="Fever">Fever</option>
          <option value="Stomachache">Stomach Ache</option>
          <option value="Mitigation">Mitigation</option>
          <option value="others">Others</option>
        </select>
                        </>
                        ):(
                        <>
                        <Label>Subject</Label>
                    <Input
                      type="text"
                      id="subject"
                      className= {errors.subject ? "  border-danger form-control" : "form-control"}
                      name="subject"
                      maxLength="20"
                    placeholder="Please Enter Your Subject..."
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.subject}
                    />
                        </>)
                      }
                    
                  </div>
                  {errors.subject && <small className="text-danger m-0">{errors.subject}</small>}
                    <div className="mt-3">
                      {
                        values.subject==='others' && values.leaveType==='Sickleave'?(
                        <>
                         <Label>Explain Your Illness</Label>
                    <Input
                      type="textarea"
                      id="reason"
                      className= {errors.reason ? "  border-danger form-control" : "form-control"}
                      name="reason"
                      maxLength="225"
                      rows="3"
                      placeholder="Don't exists 250 words..."
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.reason}
                    />
                        </>
                        ):(
                        <>
                         <Label>Reason</Label>
                    <Input
                      type="textarea"
                      id="reason"
                      className= {errors.reason ? "  border-danger form-control" : "form-control"}
                      name="reason"
                      maxLength="225"
                      rows="3"
                      placeholder="Don't exists 250 words..."
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.reason}
                    />
                    </>
                        )
                      }
                   
                  </div>
                  
                  {errors.reason && <small className="text-danger m-0">{errors.reason}</small>}
                  {
                    (values.leaveType==='Sickleave' &&   countDays(new Date(values.fromDate),new Date(values.toDate))>2)?(
                      <>
                    <div 
                    className="mt-3"
                    name = "file">
                    <Label htmlFor="formFile" className="form-label">Add File</Label>
                    <Input className="form-control" type="file" id="formFile" onChange={(e)=>{
                            if(e.target.files[0]){
                              setFile(e.target.files[0])
                             
                            }
                          }}/>
                 
                  </div>
                           {errors.file && <small className="text-danger m-0">{errors.file}</small>}
                           </>
                  ):(<></>)
                  }
                  {
                    (values.leaveType==='Sickleave' &&   countDays(new Date(values.fromDate),new Date(values.toDate))>2)?(
                      <>
                    <div 
                    className="mt-3"
                    name = "file">
                    <Label htmlFor="formFile" className="form-label">Add File</Label>
                    <Input className="form-control" type="file" id="formFile" onChange={(e)=>{
                            if(e.target.files[0]){
                              setFile(e.target.files[0])
                             
                            }
                          }}/>
                 
                  </div>
                           </>
                  ):(<></>)
                  }
                  
                  
                  <div>
                      <button type="submit" className="btn btn-primary w-md mt-5" 
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

export default LeaveForm;