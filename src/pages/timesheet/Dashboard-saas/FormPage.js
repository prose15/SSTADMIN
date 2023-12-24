import React,{useState,useEffect} from 'react'
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
    Input,
    InputGroup,
    Alert,
  } from "reactstrap"
  import { db } from 'firebase-config'
import { doc, addDoc, collection, getDoc, Timestamp, getDocs, updateDoc} from "firebase/firestore";
import {useNavigate } from 'react-router'
import Cookies from 'js-cookie';
import { debounce, values } from 'lodash';
const FormPage = () => {
  const addOptions=(type,item)=>{
    
    addDoc(collection(db, type), {service:item}).then(()=>{
      console.log('added');
       })
}
const addCostCenter=()=>{
 document.getElementById('hrsLimit').style.display='block'
}
const addTotHrs=(item,time)=>{
    addDoc(collection(db, 'costCenter'), {service:item,tothrs:time,workedHrs:0}).then(()=>{
        console.log('added');
        document.getElementById('hrsLimit').style.display='none'
         })
}

  const email=Cookies.get('email');
  const team=Cookies.get('team');
  const nav = useNavigate()
  const [projectName,setProjectName]=useState('');
    const [serviceName,setServiceName]=useState('');
    const [costCenter,setCostCenter]=useState('');
    const [workItem,setWorkItem]=useState('');
    const [ID,setID]=useState('');
    const[hrs,setHrs]=useState([])
    const [alert,setAlert]=useState('d-none')
    let dangerAlert='d-none'
const timestamp = Timestamp.now()

 const debouncedClickHandler=(ele)=>{setID(ele.id)};
 const getId=(ele)=>{
  debouncedClickHandler(ele);
  console.log( ele.id)
  console.log(ID)
 }
  return (
    <Container className=' pt-5 mt-5' >
      <Alert color='success' className={alert}>Your work saved successfully!</Alert>
      <Alert color='danger' id='timeLimit' style={{display:'none'}}>Time limit exceed!</Alert>
    <Card className='mt-5 w-100  mx-auto'>
                <CardBody>
                  <CardTitle className="mb-4">Log Your Project!</CardTitle>

                  <Form onSubmit={(e)=>e.preventDefault()}>
                  <Row>
                      <Col md={6}>
                        <div className="mb-3">
                          <Label htmlFor="formrow-email-Input">Service</Label>
                          <div className="d-flex d-inline">
                          <input className="form-control" value={serviceName} onChange={(e)=>setServiceName(e.target.value)} />
                          <i className='bx bx-plus mt-2' onClick={()=>{addOptions('serviceName',serviceName.toUpperCase())}} style={{fontSize:'20px'}}></i>
                      </div>
                        </div>
                      </Col>
                      <Col md={6}>
                        <div className="mb-3">
                          <Label htmlFor="formrow-password-Input">Project</Label>
                          <div className="d-flex d-inline">
                          <input className="form-control" value={projectName} onChange={(e)=>setProjectName(e.target.value)} />
                          <i className='bx bx-plus mt-2'onClick={()=>{addOptions('projectName',projectName.toUpperCase())}}  style={{fontSize:'20px'}}></i>
                      </div>
                        </div>
                      </Col>
                    </Row>

                    <Row>
                      <Col md={6}>
                        <div className="mb-3">
                          <Label htmlFor="formrow-email-Input">Cost Center</Label>
                          <div className="d-flex d-inline">
                          <input className="form-control" value={costCenter} onChange={(e)=>{
                            setCostCenter(e.target.value)
                          } } />
                          <i className='bx bx-plus mt-2' onClick={()=>{addCostCenter()}} style={{fontSize:'20px'}}></i>
                      </div>
                        </div>
                      </Col>
                      <Col md={6}>
                        <div className="mb-3">
                          <Label htmlFor="formrow-password-Input">Work Item</Label>
                          <div className="d-flex d-inline">
                          <input className="form-control" value={workItem} onChange={(e)=>setWorkItem(e.target.value)} />
                          <i className='bx bx-plus mt-2' style={{fontSize:'20px'}}></i>
                      </div>
                        </div>
                      </Col>
                    </Row>
                  <Row>
                  <Col md={6}>
                        <div className="mb-3" id="hrsLimit" style={{display:'none'}}>
                          <Label htmlFor="formrow-email-Input">Time Limit</Label>
                          <div className="d-flex d-inline">
                          <input className="form-control" value={hrs} onChange={(e)=>setHrs(e.target.value)} />
                          <i className='bx bx-plus mt-2' onClick={()=>{addTotHrs(costCenter.toUpperCase(),hrs)}} style={{fontSize:'20px'}}></i>
                      </div>
                        </div>
                      </Col>
                  </Row>
                    {/* <Row>
                      <Col lg={4}>
                      <label
                      htmlFor="example-date-input"
                      className="col-md-2 col-form-label"
                    >
                      Date
                    </label>
                    <div className="col-md-10">
                      <input
                        className="form-control"
                        type="date"
                        defaultValue="2019-08-19"
                        id="example-date-input"
                        value={timesheetDate}
                        onChange={(e)=>setTimesheetDate(e.target.value)}
                      />
                    </div>
                      </Col>
                      <Col lg={4}>
                      <label
                      htmlFor="example-time-input"
                      className="col-md col-form-label"
                    >
                     Start Time
                    </label>
                    <div className="col-md-10">
                      <input
                        className="form-control"
                        type="time"
                        defaultValue="13:45:00"
                        id="example-time-input"
                        value={startTime} onChange={(e)=>setStartTime(e.target.value)}
                      />
                    </div>
                      </Col>

                      <Col lg={4}>
                      <label
                      htmlFor="example-time-input"
                      className="col-md col-form-label"
                    >
                      End Time
                    </label>
                    <div className="col-md-10">
                      <input
                        className="form-control"
                        type="time"
                        defaultValue="13:45:00"
                        id="example-time-input"
                        value={endTime}
                        onChange={(e)=>setEndTime(e.target.value)}
                      />
                    </div>
                      </Col>
                    </Row>
                    <div className="mb-3">
                    </div>
                    <div className="mb-3">
                      <Label htmlFor="formrow-firstname-Input">Description</Label>
                      <Input
                        type="text"
                        className="form-control"
                        id="formrow-firstname-Input"
                        placeholder="Enter Your Description"
                        value={description}
                        onChange={(e)=>setDescription(e.target.value)}
                      />
                    </div>
                    <div
                          className="form-check form-switch form-switch-md mb-3"

                        >
                          <input
                            type="checkbox"
                            className="form-check-input"
                            id="customSwitchsizemd"
                            value={billableStatus}
                            onChange={(e)=>setBillableStatus(e.target.checked)}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="customSwitchsizemd"
                          >
                            Billable Status
                          </label>
                        </div>
                    <div>
                      <button type="submit" className="btn btn-primary w-md" onClick={()=>handleSubmit(ID)}>
                        Save
                      </button>
                    </div> */}
                  </Form>
                </CardBody>
              </Card>
              </Container>
  )
}

export default FormPage