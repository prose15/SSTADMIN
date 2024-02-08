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
import { DatePicker } from "antd";
import * as Yup from "yup";
import { Formik, useFormik } from "formik";
import { db,storage} from "firebase-config";
import { collection,addDoc, Timestamp, getDoc,doc,updateDoc
 } from "firebase/firestore";
import Cookies from 'js-cookie'
import {ref,uploadBytes} from 'firebase/storage'
import { useStateContext } from 'Context/ContextProvider';
const LeaveForm = props => {
  const [earnedLeave,setEarnedLeave]=useState(0)
  const [newData,setNewData]=useState(null)
  useEffect(()=>{
    const getData=async()=>{
      const docSnap= await getDoc(doc(db,'admin',JSON.parse(sessionStorage.getItem('uid'))))
      if(docSnap.exists()){
        setNewData(docSnap.data())
        setEarnedLeave(docSnap.data().earnedAvailable)
      }
    }
    getData()
  },[])
  const {available,leave,modal_backdrop,setmodal_backdrop,myRecords}= useStateContext()
  
  let details=[]
  let reportingManager=''
  const team = Cookies.get('team');
  const nav = useNavigate()
  const name = Cookies.get('name')
  const email=Cookies.get('email');
  const today = new Date();
  const level=Cookies.get('level')
  const [dataToModal,setDataToModal]=useState(null)
  const date=new Date().getDate()+'-'+(new Date().getMonth()+1)+'-'+new Date().getFullYear()
  const yesterday = new Date()
  yesterday.setDate(today.getDate()-1)
  let leaveId=0;
  const [selectedGroup, setselectedGroup] = useState(null);
  const [casualType,SetCasualType]=useState('')
  const [file,setFile]=useState(null);
  const [alertMsg,setAlertMsg] = useState('')
  const [addDetails, setNewDetails] = useState([])
  const [fromDate,setFromDate] = useState('')
  const [toDate,setToDate] = useState('')
  const [subject,setSubject] = useState('')
  const [condition,setCondition] = useState(true)
  let subLeave=''
  let earnedBooked=0;
  let lopBooked=0;
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
    const fileRef=ref(storage,`'MedicalProof/'+${date}/`+email);
     await uploadBytes(fileRef,file).then(()=>{
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
let checkBookedValues=0; 
const {values,handleBlur,handleChange,handleSubmit,errors,touched}= useFormik({
  initialValues:initialValues,
  validationSchema: schema,
  onSubmit:(values) =>{ 
           
    const startDate = new Date(values.fromDate)
    const endDate = new Date(values.toDate)
      const fromTimeStamp=Timestamp.fromMillis(startDate.getTime())
      const toTimeStamp=Timestamp.fromMillis(endDate.getTime())
      let dates = [];
      const today = new Date();
      const fdate = new Date(values.fromDate)
      for (let date = today ; date <= fdate; date.setDate(date.getDate() + 1)) {
        dates.push(new Date(date));
      }
      const datesWithoutHolidays = dates.filter(date => (date.getDay()!=5 && date.getDay()!=6) )
      function CorrectPath () {
        const fromYear=values.fromDate.split('-')
        const toYear=values.toDate.split('-')
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
      daysInSameMonth.push(count)
      sum+=count
      
      if(sum===datesWithoutHolidays.length){
          break
      }    
        }
        let noOfDays=0;
        for(let i=0;i<daysInSameMonth.length;i++){
          let totalDays=daysInSameMonth[i]
          const currentMonth=totalMonth[i]
        const cummulative=available[currentMonth]-leave[currentMonth]
        if(values.leaveType!=='Flexileave'){
        if(cummulative>0 ){
          const remaining=totalDays-cummulative
          if(remaining>0 && earnedLeave>0){
            subLeave='earned'
            const balance=remaining-earnedLeave
            if(balance>0){
              earnedBooked=remaining-balance
              subLeave='both'
              lopBooked=balance
              noOfDays+=totalDays-remaining
            }else{
              earnedBooked=remaining
              noOfDays+=totalDays-remaining
            }
            console.log('cummulative: ',cummulative,'subleave: ',subLeave,'balance from cummulative: ',noOfDays,'earned: ',earnedBooked,'total: ',totalDays,'lop: ',lopBooked)
            setmodal_backdrop(true)
          }
          else if(remaining<=0){
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
      }
      console.log('cummulative: ',cummulative,'subleave: ',subLeave,'balance from cummulative: ',noOfDays,'earned: ',earnedBooked,'total: ',totalDays,'lop: ',lopBooked)
        }
      
        const newDetails={name:name,email:email,team:team,reason:values.reason,subject:values.subject, leaveType:values.leaveType, subLeave:subLeave,earnedBooked:earnedBooked,lopBooked:lopBooked,reportManager: values.reportingManager,fromTimeStamp:fromTimeStamp,toTimeStamp:toTimeStamp,from: values.fromDate, to: values.toDate, requestDate: new Date().getFullYear()+"-"+(new Date().getMonth()+1)+"-"+new Date().getDate(),status:'pending',casualAvailable:12,earnedAvailable:earnedLeave,lopAvailable:0,paternityAvailable:0,sickAvailable:12,displayStatus:'',msgCount:'',noofdays:noOfDays,totalDays:datesWithoutHolidays.length,timestamp:Timestamp.now(),
        fromYear:fromYear[0],
        toYear:toYear[0],casualType}
        setDataToModal(newDetails)
        if(subLeave.includes('lop') ){
          setmodal_backdrop(true)
        }
        if(subLeave===''){
      addDoc(collection(db,'leave submssion'),newDetails).then(()=>{
        if(file){
          upload(file)
          setAlert('d-block')
        }
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
        console.log('totalDays : ',newDetails.totalDays)
        console.log('noofdays : ',newDetails.noofdays)
        if(values.leaveType==='Flexileave'){
          newData[str1]+=newDetails.totalDays;
        }else{
          newData[str1]+=newDetails.noofdays
          if(subLeave==='lop') {
            newData.lop+=lopBooked
          }else if(subLeave==='earned'){
            newData.earned+=earnedBooked
          }
        }    
        console.log(newData)
               updateDoc(doc(db,'admin',JSON.parse(sessionStorage.getItem('uid'))),newData).then(()=>{
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
      if(checkBookedValues===1){
        setAlertMsg("You already booked a holiday!")
        document.getElementById('timeLimit')
        setAlertErr('d-block')
        setTimeout(()=>{
          setAlertErr('d-none')},10000);
          setCondition(false)
       }
        else if(casualType === 'Plannedleave' && datesWithoutHolidays.length<5){
          setAlertMsg("You ought to reserve a maximum of 5 days, ensuring it is fewer than 5 days!")
        document.getElementById('timeLimit')
        setAlertErr('d-block')
        setTimeout(()=>{
          setAlertErr('d-none')},10000);
          setCondition(false)
         }
       else{
        if(values.leaveType.includes('Flexileave') && !isFlexi(values.fromDate)){
          setAlertMsg("Sorry it's not a flexi day!")
        document.getElementById('timeLimit')
        setAlertErr('d-block')
        setTimeout(()=>{
          setAlertErr('d-none')},10000);
          setCondition(false)
        }
        else if(casualType === 'Emergencyleave' && datesWithoutHolidays.length>5){
          setAlertMsg("Emergency leave must be less than 5 days!")
          document.getElementById('timeLimit')
          setAlertErr('d-block')
          setTimeout(()=>{
            setAlertErr('d-none')},10000);
            setCondition(false)
         }
        else if(values.leaveType.includes('Flexileave') && datesWithoutHolidays.length<5){
          setAlertMsg("You ought to reserve a maximum of 5 days, ensuring it is fewer than 5 days!")
        document.getElementById('timeLimit')
        setAlertErr('d-block')
        setTimeout(()=>{
          setAlertErr('d-none')},10000);
          setCondition(false)
        }
        else if(values.leaveType.includes('Sickleave') && !file &&  countDays(new Date(values.fromDate),new Date(values.toDate))>2){
          setAlertMsg("Please attach the medical certificate!")
        document.getElementById('timeLimit')
        setAlertErr('d-block')
        setTimeout(()=>{
          setAlertErr('d-none')},10000);
          setCondition(false)
        } 
        else{
          CorrectPath()
        }    
      }           
        }})
        const records=myRecords.filter(data=>data.status!=='revoke')
  records.map((data)=>{
    if(data.from===values.fromDate || data.to===values.toDate){
      checkBookedValues=1
    }
  })
  
  function countDays(fromDate,toDate){
    const dates = getDatesBetweenDates(fromDate,toDate)
    const holidays = dates.filter(date => (date.getDay()==5 || date.getDay()==6) ) 
    return dates.length-holidays.length  
                } 
                const disabledDate = current => {
                  return !flexidays.includes(current.format('YYYY-MM-DD'));
                };  
                
                const WeekEnds = current => {
                  const dayOfWeek = current.day();
                  return dayOfWeek === 5 || dayOfWeek === 6;
                };
                  
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
                
  const handleSelectGroup=(selectedGroup)=> {
    setselectedGroup(selectedGroup);
    values.leaveType=selectedGroup.value
    leaveId=selectedGroup.id
    leaveId === 1 ? (SetCasualType("Plannedleave")) :leaveId === 2 ? SetCasualType("Emergencyleave"):
    leaveId === 3 ? SetCasualType("Sickleave") : leaveId === 4 ? (SetCasualType("Flexileave")) : leaveId === 5 && Cookies.get('gender')==='Male'? SetCasualType("Paternityleave") :SetCasualType("Maternityleave")
  }
                

  return (
    <React.Fragment>
      <div className="page-content">
        <Container>
          <Row>
            <Col>
            <Alert color="danger"  id='timeLimit' className={alertErr} style={{zIndex:2}}>{alertMsg}</Alert>
          { condition && (
            <Alert color='success' id="" className={`${alert} position-fixed`}>{'Form forwarded to L1 Manager'}</Alert>)}
            {
              dataToModal!=null &&  <AlertModal  data={dataToModal} file={file} newData={newData} />
            }
              <Card className=' w-100  mx-auto'>
                <CardBody >
                  <CardTitle className="mb-4">Submit Your Application!</CardTitle>
                  <Form onSubmit={handleSubmit}>
                    <Row>
                  <Col md={6}>
                  <div>
        <Label htmlFor="formrow-email-Input">Leave type</Label>
        <Select options={optionGroup}
                            className="select2-selection"
                            onChange={handleSelectGroup}
                              value={selectedGroup}
                          />
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
                               disabledDate={WeekEnds}
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
                      maxLength="50"
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
                      placeholder="Don't exceed 250 words..."
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
                    <Label htmlFor="formFile" className="form-label">Add Medical Certificate</Label>
                    <Input className="form-control" type="file" id="formFile" accept="application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document" onChange={(e)=>{
                            if(e.target.files[0]){
                              setFile(e.target.files[0])
                             
                            }
                          }}/>
                 
                  </div>
                           {errors.file && <small className="text-danger m-0">{errors.file}</small>}
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