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
import { DatePicker } from "antd";
import "flatpickr/dist/themes/material_blue.css";
import * as Yup from "yup";
import { Field, Formik, useFormik } from "formik";
import { db,storage} from "firebase-config";
import { collection,addDoc, Timestamp, } from "firebase/firestore";
import Cookies from 'js-cookie'
import {ref,uploadBytes} from 'firebase/storage'
const WFH = props => {
  const team = Cookies.get('team');
    const name = Cookies.get('name')
    const email=Cookies.get('email');
    const level= Cookies.get('level');
  let details=[]
  const today = new Date();
  let reportingManager=''
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
  // else if(team==='Product'){
  //     details= [...details,'Keerthana','Krishna kumar']
  //     reportingManager=details[0]
  // }
    const nav = useNavigate()
    const date=new Date().getDate()+'-'+(new Date().getMonth()+1)+'-'+new Date().getFullYear()
    const [addDetails, setNewDetails] = useState([])
  const [fromDate,setFromDate] = useState('')
  const [toDate,setToDate] = useState()
  const [subject,setSubject] = useState()
  const WFH = "Work From Home"
  const initialValues = {
    WFH:WFH,
    reportingManager:reportingManager,
    fromDate:fromDate,
    toDate:toDate,
    subject:subject,
    reason:"",
  }
  const [alert,setAlert]=useState('d-none')
  const yesterday = new Date()
  yesterday.setDate(today.getDate()-1)
  const schema = Yup.object().shape({
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
  const {values,setFieldValue,handleBlur,handleChange,handleSubmit,errors,touched}= useFormik({
    initialValues:initialValues,
    validationSchema: schema,
    onSubmit:(values) =>{ 
              console.log(values);
              const startDate = new Date(values.fromDate)
              const endDate = new Date(values.toDate)
                const fromTimeStamp=Timestamp.fromMillis(startDate.getTime())
                const toTimeStamp=Timestamp.fromMillis(endDate.getTime())
                  const fromYear=values.fromDate.split('-')
                  const toYear=values.toDate.split('-')
                  const dates = getDatesBetweenDates(startDate,endDate)
                  const holidays = dates.filter(date => (date.getDay()==5 || date.getDay()==6) )
                  const newDetails={name:name,email:email,team:team,reason:values.reason,subject:values.subject, 
                  WFH:values.WFH, reportManager: values.reportingManager,fromTimeStamp:fromTimeStamp,toTimeStamp:toTimeStamp,from: values.fromDate, to: values.toDate, requestDate: new Date().getFullYear()+"-"+(new Date().getMonth()+1)+"-"+new Date().getDate(),status:'pending',L1status:'',L2status:'',L3status:'',noofdays:dates.length-holidays.length,timestamp:Timestamp.now(),
                  fromYear:fromYear[0],
                  toYear:toYear[0]}
                  const newData = [...addDetails, details];
                      setNewDetails(newData)
                addDoc(collection(db,'WFH'),newDetails).then(()=>{
                    console.log("message added successfully");
                    setAlert('d-block')
                    localStorage.setItem('type',newDetails.leaveType)
                    setTimeout(()=>{nav('/WFH/records')},2000)
                })
            .catch((err) => {
                console.log(err.message);
                })
                
                  }})
                    
  return (
    <React.Fragment>
      <div className="page-content">
        <Container>
          <Row>
            <Col>
            <Alert color='success' id="" className={alert}>{'Form forwarded to L1 Manager'}</Alert>
              <Card className='mt-5 w-100  mx-auto'>
                <CardBody >
                  <CardTitle className="mb-4">Submit Your Application!</CardTitle>
                  <Form onSubmit={handleSubmit}>
                    <Row>
                    <Col md={6}>
                        <div className="mb-3">
                          <Label htmlFor="formrow-email-Input">Work Type</Label>
                          <Input
                            onBlur={handleBlur}
                            value={values.WFH}
                          />
                        </div>
                      </Col>
                      <Col md={6}>
                        <div className="mb-3">
                          <Label htmlFor="formrow-email-Input">Reporting Manager</Label>
                          <Input
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
                              format='YYYY-MM-DD'
                                 />
                                 
                            )
                          }
                           {errors.fromDate && <small className="text-danger">
                            {errors.fromDate}</small>}
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
                        <Label>Subject</Label>
                    <Input
                      type="text"
                      id="subject"
                      className= {errors.subject ? "  border-danger form-control" : "form-control"}
                      name="subject"
                      maxLength="50"
                    placeholder="Please Enter Your Subject..."
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.subject}
                    />
                  </div>
                  {errors.subject && <small className="text-danger m-0">{errors.subject}</small>}
                    <div className="mt-3">
                    <Label>Reason</Label>
                    <Input
                      type="textarea"
                      id="reason"
                      className= {errors.reason ? "  border-danger form-control" : "form-control"}
                      name="reason"
                      maxLength="250"
                      rows="3"
                      placeholder="Don't exists 250 words..."
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.reason}
                    /> 
                  </div>
                  {errors.reason && <small className="text-danger m-0">{errors.reason}</small>}
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

export default WFH;