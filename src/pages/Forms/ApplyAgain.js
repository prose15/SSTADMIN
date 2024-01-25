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
import { collection,addDoc, Timestamp, doc, getDoc, } from "firebase/firestore";
import Cookies from 'js-cookie'
import {ref,uploadBytes} from 'firebase/storage'
import { leaveprojects } from "common/data/leaveprojects";
import { useParams } from "react-router-dom";
import { DatePicker } from "antd";
import { useStateContext } from "Context/ContextProvider";
const ApplyAgain = props => {
    const id=useParams()
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
            const docRef=doc(db,'leave submssion',id.id)
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
        const [earnedLeave,setEarnedLeave]=useState(0)
  useEffect(()=>{
    const getData=async()=>{
      const docSnap= await getDoc(doc(db,'users',JSON.parse(sessionStorage.getItem('uid'))))
      if(docSnap.exists()){
        setNewData(docSnap.data())
        setEarnedLeave(docSnap.data().earnedAvailable)
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
    let subLeave=''
    let earnedBooked=0;
    let lopBooked=0;
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
    async function upload(file){
      const fileRef=ref(storage,'MedicalProof/'+`${date}/`+email);
       await uploadBytes(fileRef,file).then(()=>{
        console.log('uploaded');
      }).catch((err)=>{
        console.log(err);
      })
    }
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
  const optionGroup = [
    {      
      options: [
        { label: "Planned Leave", value: "Casualleave",id:1 },
        { label: "Emergency Leave", value: "Casualleave",id:2 },
        { label: "Sick Leave", value: "Sickleave",id:3 },
        { label: "Flexi Leave", value: "Flexileave",id:4 },
        Cookies.get('gender')==='Male'?{ label: "Paternityleave", value: "Paternityleave",id:5 }:{ label: "Maternity Leave", value: "Maternityleave",id:5 },
      ]
    }
  ];
  let leaveId;
  console.log(leaveType);
  const[value,setValue] = useState(null)
  const handleSelectGroup=(selectedGroup)=> {
    setselectedGroup(selectedGroup);
    setLeaveType(selectedGroup.value)
    leaveId=selectedGroup.id
    setValue(leaveId)
    leaveId === 1 ? (SetCasualType("Plannedleave")) :leaveId === 2 ? SetCasualType("Emergencyleave"):
    leaveId === 3 ? SetCasualType("Sickleave") : leaveId === 4 ? (SetCasualType("Flexileave")) : leaveId === 5 && Cookies.get('gender')==='Male'? SetCasualType("Paternityleave") :SetCasualType("Maternityleave")
  }
  console.log(leaveId);
  console.log(casualType);
 const handleSubmit=(leaveId)=>{ 
  if(leaveType=='' || reportingManager=='' || fromDate=='' || toDate=='' || subject=='' || reason==''){
    console.log('Please complete the form!')
  }  
  else{ 
    const startDate = new Date(fromDate)
              const endDate = new Date(toDate)
                const fromTimeStamp=Timestamp.fromMillis(startDate.getTime())
                const toTimeStamp=Timestamp.fromMillis(endDate.getTime())
                let dates = [];
                const today = new Date();
                const fdate = new Date(fromDate)
                for (let date = today ; date <= fdate; date.setDate(date.getDate() + 1)) {
                  dates.push(new Date(date));
                }
                const datesWithoutHolidays = dates.filter(date => (date.getDay()!=5 && date.getDay()!=6) )
                function CorrectPath () {
                  const fromYear=fromDate.split('-')
                  const toYear=toDate.split('-')
                  const dates = getDatesBetweenDates(startDate,endDate)
                  const holidays = dates.filter(date => (date.getDay()==5 || date.getDay()==6) )
                  const datesWithoutHolidays = dates.filter(date => (date.getDay()!=5 && date.getDay()!=6) )
                  let daysInSameMonth=[]
                  let totalMonth=[fdate.getMonth()]
                  let sum=0
                  let temp=0;
                  for(let i=0;i<datesWithoutHolidays.length;i++){
                    var count=0;
                    var month=datesWithoutHolidays[temp].getMonth() 
                    for(let j=temp;j<datesWithoutHolidays.length;j++){
                    if(datesWithoutHolidays[j].getMonth()===month){
                      count++;
                    }
                    else{
                        totalMonth.push(datesWithoutHolidays[j].getMonth())
                        temp=j;
                        break;
                    }
                }
                console.log(temp)
                daysInSameMonth.push(count)
                sum+=count
                if(sum===datesWithoutHolidays.length){
                    break
                }    
                  }
                  let noOfDays=0;
                  console.log('daysArr',daysInSameMonth)
                  for(let i=0;i<daysInSameMonth.length;i++){
                    let totalDays=daysInSameMonth[i]
                    const currentMonth=totalMonth[i]
                  const cummulative=available[currentMonth]-leave[currentMonth]
                  if(cummulative>0 ){
                    const remaining=cummulative-totalDays
                    if(Math.abs(remaining) <=earnedLeave && remaining<0){
                      subLeave='earned'
                      earnedBooked=Math.abs(remaining)
                      noOfDays+=totalDays-Math.abs(remaining)
                      setmodal_backdrop(true)
                    }
                    else if(remaining>=0){
                      noOfDays+=totalDays
                    }
                    else{
                      subLeave='lop'
                      lopBooked=Math.abs(remaining)
                      noOfDays+=totalDays-Math.abs(remaining)
                      setmodal_backdrop(true)
                    }
                  }
                  else if(totalDays<=earnedLeave && earnedLeave>0){
                    subLeave='earned'
                    earnedBooked=totalDays
                    setmodal_backdrop(true)
                  }
                  else{
                    subLeave='lop'
                    lopBooked=totalDays
                    setmodal_backdrop(true)
                  }
                  console.log(cummulative,subLeave,noOfDays,earnedBooked,totalDays,lopBooked)
                  }
                
                  const newDetails={name:name,email:email,team:team,reason:reason,subject:subject, leaveType:leaveType, subLeave:subLeave,earnedBooked:earnedBooked,lopBooked:lopBooked,reportManager: reportingManager,fromTimeStamp:fromTimeStamp,toTimeStamp:toTimeStamp,from: fromDate, to: toDate, requestDate: new Date().getFullYear()+"-"+(new Date().getMonth()+1)+"-"+new Date().getDate(),status:'re-apply',casualAvailable:12,earnedAvailable:earnedLeave,lopAvailable:0,paternityAvailable:0,sickAvailable:12,displayStatus:'',msgCount:'',noofdays:noOfDays,totalDays:datesWithoutHolidays.length,timestamp:Timestamp.now(),
                  fromYear:fromYear[0],
                  toYear:toYear[0],casualType}
                  setDataToModal(newDetails)
                  console.log(newDetails);
                  if(subLeave.includes('lop') ){
                    setmodal_backdrop(true)
                  }
                  if(!subLeave.includes('lop') && !subLeave.includes('earned')){
                addDoc(collection(db,'leave submssion'),newDetails).then(()=>{
                  if(file){
                    upload(file)
                    console.log("message added successfully");
                    setAlert('d-block')
                  }
                    console.log("message added successfully");
                    setAlert('d-block')
                    let str1=''
                  let leavetype = newDetails.leaveType
                  let strArr=leavetype.split('')
                  for(let i=0;i<strArr.length-5;i++){
                      str1+=strArr[i]
                  }
                  str1=str1.toLocaleLowerCase()
                  console.log(str1)
                  console.log(newData[str1])
                            newData[str1]+=noOfDays;
                            if(subLeave!==''){
                            if(lopBooked>0){
                              newData[subLeave]+=lopBooked
                            }else{
                              newData[subLeave]+=earnedBooked
                            }
                          }
                         updateDoc(doc(db,'users',JSON.parse(sessionStorage.getItem('uid'))),newData).then(()=>{
                          console.log('profile updated')
                         }).catch((err)=>{
                          console.log(err)
                         })
                       
                    setTimeout(()=>{nav('/leavetracker')},2000)
                })
            .catch((err) => {
                console.log(err.message);
                })
              }
                }
                 if(leaveType === 'Casualleave' && datesWithoutHolidays.length<5 && leave===1){
                  setAlertMsg("You ought to reserve a maximum of 5 days, ensuring it is fewer than 5 days!")
                document.getElementById('timeLimit')
                setAlertErr('d-block')
                setTimeout(()=>{
                  setAlertErr('d-none')},5000);
                  setCondition(false)
                 }
                 else{
                  if(leaveType.includes('Flexileave') && !isFlexi(fromDate)){
                    setAlertMsg("Sorry it's not a flexi day!")
                  document.getElementById('timeLimit')
                  setAlertErr('d-block')
                  setTimeout(()=>{
                    setAlertErr('d-none')},5000);
                    setCondition(false)
                  }
                  else if(leaveType.includes('Flexileave') && datesWithoutHolidays.length<5){
                    setAlertMsg("You ought to reserve a maximum of 5 days, ensuring it is fewer than 5 days!")
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
  }
  }
            
              const countDays=(fromDate,toDate)=>{
                const dates = getDatesBetweenDates(fromDate,toDate)
                const holidays = dates.filter(date => (date.getDay()==5 || date.getDay()==6) ) 
           return dates.length-holidays.length  
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
                  <Form 
                  onSubmit={(e)=>{
                    e.preventDefault()
                    
                  }
                  }>
                    <Row>
                  <Col md={6}>
                  <div>
                  <Label htmlFor="formrow-email-Input">Leave type</Label>
                            <Select options={optionGroup}
                            className="select2-selection"
                            onChange={handleSelectGroup}
                              value={selectedGroup}
                            />
                  </div>                  
                      </Col>
                      <Col md={6}>
                        <div className="mb-3">
                          <Label htmlFor="formrow-email-Input">Reporting Manager</Label>
                          <Input
                            name="keerthana"
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
                      {
                        leaveType==='Sickleave'?(
                        <>
                        <Label htmlFor="formrow-email-Input">Choose Illness</Label>
                         <select
        className="form-select"
          name="subject"
          onChange={(e)=>setSubject(e.target.value)}
          value={subject}
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
                      className= {"form-control"}
                      name="subject"
                      maxLength="20"
                    placeholder="Please Enter Your Subject..."
                    onChange={(e)=>{
                      setSubject(e.target.value)
                     }}
                      value={subject}
                    />
                        </>)
                      }
                    
                  </div>
                    <div className="mt-3">
                      {
                        subject==='others' && leaveType==='Sickleave'?(
                        <>
                         <Label>Explain Your Illness</Label>
                    <Input
                      type="textarea"
                      id="reason"
                      className= {"form-control"}
                      name="reason"
                      maxLength="225"
                      rows="3"
                      placeholder="Don't exists 250 words..."
                      onChange={(e)=>setReason(e.target.value)}
                      value={reason}
                    />
                        </>
                        ):(
                        <>
                         <Label>Reason</Label>
                    <Input
                      type="textarea"
                      id="reason"
                      className= {"form-control"}
                      name="reason"
                      maxLength="225"
                      rows="3"
                      placeholder="Don't exists 250 words..."
                      onChange={(e)=>{
                        setReason(e.target.value)
                       }}
                      value={reason}
                    />
                    </>
                        )
                      }
                   
                  </div>
                  {
                    (leaveType==='Sickleave' &&   countDays(new Date(fromDate),new Date(toDate))>2)?(<div className="mt-3">
                    <Label htmlFor="formFile" className="form-label">Add File</Label>
                    <Input className="form-control" type="file" id="formFile" onChange={(e)=>{
                            if(e.target.files[0]){
                              setFile(e.target.files[0])
                             
                            }
                          }}/>
                  </div>):(<></>)
                  }
                  
                  <div>
                      <button type="submit" className="btn btn-primary w-md mt-5" onClick={()=>handleSubmit(leaveId)}
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