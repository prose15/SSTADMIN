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
import { debounce } from 'lodash';
const FormPage = () => {
  const email=Cookies.get('email');
  const team=Cookies.get('team');
  const nav = useNavigate()
  const [projectName,setProjectName]=useState('');
    const [serviceName,setServiceName]=useState('');
    const [costCenter,setCostCenter]=useState('');
    const [workItem,setWorkItem]=useState('');
    const [timesheetDate,setTimesheetDate]=useState('');
    const [startTime,setStartTime]=useState('');
    const [endTime,setEndTime]=useState('');
    const [billableStatus,setBillableStatus]=useState(false);
    const [description,setDescription]=useState('');
    const [ID,setID]=useState('');
    const [service,setService]=useState([])
    const [project,setProject]=useState([])
    const[cost,setCost]=useState([])
    const[work,setWork]=useState([])
    const [alert,setAlert]=useState('d-none')
 useEffect(()=>{
    const getOption=async()=>{
        const servicedata = await getDocs(collection(db,'serviceName'))
        const projectData=await getDocs(collection(db,'projectName'))
        const costData = await getDocs(collection(db,'costCenter')) 
        const workData = await getDocs(collection(db,'workItem'))
        setService(servicedata.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        setProject(projectData.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        setCost(costData.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        setWork(workData.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        
    }
    getOption()
 },[])
const timestamp = Timestamp.now()
 const workedHrs = (stime, etime) => {
  let start = stime.split(".")
  let end=etime.split(".")
  let hours=parseInt(start[0])+parseInt(end[0])
  let minutes=parseInt(start[1])+parseInt(end[1])

  while(minutes>=60){
      hours+=1;
      minutes-=60;
  } 
  let ans=hours.toString()+"."+minutes.toString()
  return (ans)
}

const totHours =  (startTime, endTime) => {
  let hours = 0, totminutes = 0, minutes = 0
  // for (let i = 0; i < startTime.length; i++) {
    let arr = startTime.split(":");
    let arr2 = endTime.split(":");
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
  // }

  if (totminutes < 0) {
    hours--;
    minutes = 60 + totminutes;
  }
  else if (totminutes > 0) {
    minutes = totminutes;
  }
  let strminutes = minutes > 9 ? minutes.toString() : "0" + minutes.toString()
  let time=hours+'.'+strminutes
  return parseFloat(time).toFixed(2)
}
// console.log(ID)
 const handleSubmit =async(id)=>{
  // e.preventDefault()
  const timeRangeCheck=(startTime,endTime)=>{
    let arr=startTime.split(":")
    let arr2=endTime.split(":")
    if(parseInt(arr[0])>parseInt(arr2[0])){
        return true
    }
    else if(arr[0]===arr2[0]){
        if(parseInt(arr[1])>=parseInt(arr2[1])){
        return true
        }
    }
        return false
}

const dateRangeCheck=(date)=>{

    const datee=new Date(date)
    var today = new Date();
    var startDate = new Date()
    datee.setHours(today.getHours())
    datee.setMinutes(today.getMinutes())
    datee.setSeconds(today.getSeconds())
    datee.setMilliseconds(today.getMilliseconds())
    startDate.setHours(0)
    startDate.setMinutes(0)
    startDate.setSeconds(0)
    startDate.setMilliseconds(0);
    startDate.setDate(today.getDate() - today.getDay());
    var endDate = new Date()
    endDate.setHours(23)
    endDate.setMinutes(59)
    endDate.setSeconds(59)
    endDate.setDate(startDate.getDate() + 4)
  //  console.log(startDate,endDate,datee,date)
  //  console.log(datee,startDate,endDate)
    if(datee>=startDate && datee<=endDate){
        return false
    }
    return true
}

if (serviceName == '' || projectName == '' || costCenter == '' || workItem == '' || timesheetDate == '' || startTime == '' || endTime == '' || description == '' || id=='') {
    console.log('form empty')
    console.log(serviceName,projectName,costCenter,workItem,timesheetDate,startTime,endTime,description,id);
}

else{
  console.log(id);
    let bool=dateRangeCheck(timesheetDate)
    if(bool){
      console.log('set date correct');
    }
    else{
    let bool=timeRangeCheck(startTime,endTime)
    if(bool){
        console.log('set time correct');
      }

    else{
let billable=''
if(billableStatus){
  billable="Billable"
}
else{
    billable="Non-Billable"
}

const newDetails={serviceName:serviceName,projectName:projectName,costCenter:costCenter,workItem:workItem,timesheetDate:timesheetDate,startTime:startTime,endTime:endTime,billableStatus:billable,description:description,name:Cookies.get('name'),id:ID,email:email,team:team,requestDate: new Date().getDate() + "-" + (new Date().getMonth() + 1) + "-" + new Date().getFullYear(),timestamp:timestamp}
const ref=doc(db,'costCenter',id);
const data=await getDoc(ref)
let hrs=data.data().workedHrs
const wHrs=totHours(startTime,endTime)
hrs=parseFloat(hrs).toFixed(2)
console.log(typeof(hrs))
console.log(typeof(wHrs))
console.log(hrs)
console.log(wHrs)
 const tothrs=workedHrs(hrs,wHrs);
 console.log(tothrs);
 if(parseFloat(tothrs)<=parseFloat(data.data().tothrs)){
 
  updateDoc(ref,{workedHrs:tothrs}).then(()=>{
      console.log('added');
      addDoc(collection(db,'Timesheet'),newDetails).then(()=>{
        setAlert('d-block')
         setTimeout(()=>nav('/timesheet/dashboard'),1000) 
      }) 
    .catch((err) => {
      console.log(err.message);
    })
  }).catch((err)=>{
      console.log(err.message);
  })

    }else{
      
      console.log('time limit exceed for '+costCenter)
    }
  }
}
}
 }
 const debouncedClickHandler=(ele)=>{setID(ele.id)};
 const getId=(ele)=>{
  debouncedClickHandler(ele);
  console.log( ele.id)
  console.log(ID)
 }
  return (
    <Container className=' pt-5 mt-5' >
      <Alert color='success' className={alert}>Your work saved successfully!</Alert>
    <Card className='mt-5 w-100  mx-auto'>
                <CardBody>
                  <CardTitle className="mb-4">Log Your Work!</CardTitle>

                  <Form onSubmit={(e)=>e.preventDefault()}>
                  <Row>
                      <Col md={6}>
                        <div className="mb-3">
                          <Label htmlFor="formrow-email-Input">Service</Label>
                          <select className="form-control" value={serviceName} onChange={(e)=>setServiceName(e.target.value)}>
                            <option value='#'>Select Service</option>
                          {
                        service.map((ele)=>(
                            <option key={ele.service} value={ele.service}>{ele.service}</option>
                        ))
                    }
                      </select>
                        </div>
                      </Col>
                      <Col md={6}>
                        <div className="mb-3">
                          <Label htmlFor="formrow-password-Input">Project</Label>
                          <select className="form-control" value={projectName} onChange={(e)=>setProjectName(e.target.value)}>
                          <option value='#'>Select Project</option>
                          {
                        project.map((ele)=>(
                            <option key={ele.service} value={ele.service}>{ele.service}</option>
                        ))
                    }
                      </select>
                        </div>
                      </Col>
                    </Row>

                    <Row>
                      <Col md={6}>
                        <div className="mb-3">
                          <Label htmlFor="formrow-email-Input">Cost Center</Label>
                          <select className="form-control" value={costCenter} onChange={(e)=>{
                            const value=e.target.value
                            const id=cost.filter((ele)=>value==ele.service)
                            setCostCenter(value)
                            setID(id[0].id)
                          } }>
                          <option value='#'>Select Cost Center</option>
                          {
                        cost.map((ele,index)=>(
                            <option key={ele.id} value={ele.service} >{ele.service}</option> 
                        ))
                        
                    }
                      </select>
                        </div>
                      </Col>
                      <Col md={6}>
                        <div className="mb-3">
                          <Label htmlFor="formrow-password-Input">Work Item</Label>
                          <select className="form-control" value={workItem} onChange={(e)=>setWorkItem(e.target.value)}>
                          <option value='#'>Select Work Item</option>
                          {
                        work.map((ele)=>(
                            <option key={ele.service} value={ele.service}>{ele.service}</option>
                        ))
                    }
                      </select>
                        </div>
                      </Col>
                    </Row>

                    <Row>
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
                    </div>
                  </Form>
                </CardBody>
              </Card>
              </Container>
  )
}

export default FormPage