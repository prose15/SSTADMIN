import React,{useState,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardBody, Col } from 'reactstrap';
import { db } from 'firebase-config';
import Cookies from "js-cookie";
import { collection, addDoc, where, query,onSnapshot, Timestamp } from 'firebase/firestore'
import SimpleBar from "simplebar-react";
import EditModal from './Components/EditModal';
import "./Components/EditModal.css"
import { useStateContext } from 'Context/ContextProvider';
const Weeklytimesheet = () => {
  const [details, setDetails] = useState([])
  const {startdate,enddate,setWorkedHours,workedHours}=useStateContext();
  const email=Cookies.get('email');
  const name=Cookies.get('name')
  useEffect(() => {
    const getData = async () => {
      const filteredUsersQuery =query(collection(db,'Timesheet'),where('email','==',email));
      onSnapshot(filteredUsersQuery,(data)=>{
        setDetails(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
      })
    }
    getData()
  }, [])
  let newDetails=[]
  const nav=useNavigate()
  details.map((detail) => {
      if (new Date(detail.timesheetDate) >= startdate && new Date(detail.timesheetDate) <= enddate) {
        newDetails = [...newDetails, detail]
      }
  })
  for (let i = 0; i < newDetails.length; i++) {
    for (let j = 0; j < newDetails.length - 1; j++) {
      let str1 = newDetails[j].timesheetDate
      let str2 =newDetails[j + 1].timesheetDate
      let arr1 = str1.split('-')
      let arr2 = str2.split('-')
      if (arr1[1] > arr2[1]) {
        let temp = newDetails[j]
        newDetails[j] = newDetails[j + 1]
        newDetails[j + 1] = temp
      }
      else if (arr1[1] == arr2[1]) {
        if (arr1[0] > arr2[0]) {
          let temp = newDetails[j]
          newDetails[j] = newDetails[j + 1]
          newDetails[j + 1] = temp
        }
      }
    }
  }
  let finalDetails = []
  let j = 0
  for (let i = newDetails.length - 1; i >= 0; i--) {
    finalDetails[j++] = newDetails[i]
  }

  let sun = []
  let mon = []
  let tue = []
  let wed = []
  let thu = []
  let startTime = [];
  let endTime = [];
  for (var i = 0; i < finalDetails.length; i++) {
    let date1 = new Date(finalDetails[i].timesheetDate)
    if (date1.getDay() == 0) {
      sun.push(finalDetails[i]);
      startTime = [...startTime, finalDetails[i].startTime]
      endTime = [...endTime, finalDetails[i].endTime]
    }
    else if (date1.getDay() == 1) {
      mon.push(finalDetails[i]);
      Cookies.set('mon', mon)
      startTime = [...startTime, finalDetails[i].startTime]
      endTime = [...endTime, finalDetails[i].endTime]
    }
    else if (date1.getDay() == 2) {
      tue.push(finalDetails[i]);
      Cookies.set('tue', tue)
      startTime = [...startTime, finalDetails[i].startTime]
      endTime = [...endTime, finalDetails[i].endTime]
    }
    else if (date1.getDay() == 3) {
      wed.push(finalDetails[i]);
      Cookies.set('wed', wed)
      startTime = [...startTime, finalDetails[i].startTime]
      endTime = [...endTime, finalDetails[i].endTime]
    }
    else if (date1.getDay() == 4) {
      thu.push(finalDetails[i]);
      Cookies.set('thu', thu)
      startTime = [...startTime, finalDetails[i].startTime]
      endTime = [...endTime, finalDetails[i].endTime]
    }
  }
  
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

setWorkedHours(totHours(startTime, endTime))
  const workedHrs = (stime, etime) => {
    let start = stime.split(":")
    let end = etime.split(':')
    let hrs = end[0] - start[0]
    let min = Math.abs(end[1] - start[1])
    if(min==60){
        hrs+=1;
        min=0;
        return hrs+"."+min
    }
    return hrs + "." + min
  }
  let timeSheet={sun:sun,mon:mon,tue,tue,wed:wed,thu:thu};
  const getMonthName=(index)=>{
    const month=['Jan','Feb',"Mar",'Apr',"May","Jun","Jul","Aug","Sep","Oct",'Nov',"Dec"];
    return month[index];
    }
   const sheetName=startdate.getDate()+" "+(getMonthName(startdate.getMonth()))+' '+startdate.getFullYear()+" - "+enddate.getDate()+" "+getMonthName(enddate.getMonth())+" "+enddate.getFullYear()
  const handleSend=()=>{
    const data={name:name,email:email,sheetName:sheetName,team:Cookies.get('team'),data:timeSheet,workedHrs:workedHours,status:"pending",date: new Date().getDate() + "-" + (new Date().getMonth() + 1) + "-" + new Date().getFullYear(),team:Cookies.get('team'),L1status:"",L2status:"",L3status:"",L4status:"",display:false,timestamp:Timestamp.now()}
    addDoc(collection(db,'timesheet'),data).then(()=>{
      console.log('added timesheet');
      setTimeout(()=>{nav('/timesheet/dashboard')},1000)
  }) 
.catch((err) => {
  console.log(err.message);
})
  }
  return (
     <React.Fragment>
    <Col >
        <Card>
            <CardBody>
                
                <SimpleBar>
                {
                      sun.length>0?(
                        <>
                        <h4 className="card-title mb-4">Sunday</h4>
                        <ul className="verti-timeline list-unstyled ms-3">
                         {(sun || []).map((event, index) => (
                            <li key={index} className="event-list ">
                              
                                <div className="event-timeline-dot">
                                    <i className="bx bx-right-arrow-circle font-size-18"></i>
                                </div>
                                <ul className="d-flex flex-row list-unstyled row ms-3 sun">
                                  
                                       <Col>
                                       <li>{event.serviceName}</li>
                                       </Col>
                                       <Col>
                                       <li>{event.projectName}</li>
                                       </Col>
                                       <Col>
                                       <li>{event.costCenter}</li>
                                       </Col>
                                       <Col>
                                       <li>{event.workItem}</li>
                                       </Col>
                                       <Col className='d-flex flex-inline'>
                                       <li>{workedHrs(event.startTime, event.endTime)}</li>
                                       <li className='editSheet'>{<EditModal id={event.id} />}</li>
                                       </Col>  
                                </ul>
                            </li>
                        ))}
                    </ul>
                    </>
                      ):(<></>)
                    }
                          {
                      mon.length>0?(
                        <>
                        <h4 className="card-title mt-4 mb-4">Monday</h4>
                        <ul className="verti-timeline list-unstyled ms-3">
                         {(mon || []).map((event, index) => (
                            <li key={index} className="event-list ">
                              
                                <div className="event-timeline-dot">
                                    <i className="bx bx-right-arrow-circle font-size-18"></i>
                                </div>
                                <ul className="d-flex flex-row list-unstyled row ms-3 sun">
                                  
                                       <Col>
                                       <li>{event.serviceName}</li>
                                       </Col>
                                       <Col>
                                       <li>{event.projectName}</li>
                                       </Col>
                                       <Col>
                                       <li>{event.costCenter}</li>
                                       </Col>
                                       <Col>
                                       <li>{event.workItem}</li>
                                       </Col>
                                       <Col className='d-flex flex-inline'>
                                       <li>{workedHrs(event.startTime, event.endTime)}</li>
                                       <li className='editSheet'>{<EditModal id={event.id} />}</li>
                                       </Col>   
                                </ul>
                            </li>
                        ))}
                    </ul>
                    </>
                      ):(<></>)
                    }
                    {
                      tue.length>0?(
                        <>
                        <h4 className="card-title mt-4 mb-4">Tuesday</h4>
                        <ul className="verti-timeline list-unstyled ms-3">
                         {(tue || []).map((event, index) => (
                            <li key={index} className="event-list ">
                              
                                <div className="event-timeline-dot">
                                    <i className="bx bx-right-arrow-circle font-size-18"></i>
                                </div>
                                <ul className="d-flex flex-row list-unstyled row ms-3 sun">
                                  
                                       <Col>
                                       <li>{event.serviceName}</li>
                                       </Col>
                                       <Col>
                                       <li>{event.projectName}</li>
                                       </Col>
                                       <Col>
                                       <li>{event.costCenter}</li>
                                       </Col>
                                       <Col>
                                       <li>{event.workItem}</li>
                                       </Col>
                                       <Col className='d-flex flex-inline'>
                                       <li>{workedHrs(event.startTime, event.endTime)}</li>
                                       <li className='editSheet'>{<EditModal id={event.id} />}</li>
                                       </Col>  
                                </ul>
                            </li>
                        ))}
                    </ul>
                    </>
                      ):(<></>)
                    }
                      {
                      wed.length>0?(
                        <>
                        <h4 className="card-title mt-4 mb-4">Wednesday</h4>
                        <ul className="verti-timeline list-unstyled ms-3">
                         {(wed || []).map((event, index) => (
                            <li key={index} className="event-list ">
                              
                                <div className="event-timeline-dot">
                                    <i className="bx bx-right-arrow-circle font-size-18"></i>
                                </div>
                                <ul className="d-flex flex-row list-unstyled row ms-3 sun">
                                  
                                       <Col>
                                       <li>{event.serviceName}</li>
                                       </Col>
                                       <Col>
                                       <li>{event.projectName}</li>
                                       </Col>
                                       <Col>
                                       <li>{event.costCenter}</li>
                                       </Col>
                                       <Col>
                                       <li>{event.workItem}</li>
                                       </Col>
                                       <Col className='d-flex flex-inline'>
                                       <li>{workedHrs(event.startTime, event.endTime)}</li>
                                       <li className='editSheet'>{<EditModal id={event.id} />}</li>
                                       </Col>  
                                </ul>
                            </li>
                        ))}
                    </ul>
                    </>
                      ):(<></>)
                    }
                      {
                      thu.length>0?(
                        <>
                        <h4 className="card-title mt-4 mb-4">Thursday</h4>
                        <ul className="verti-timeline list-unstyled ms-3">
                         {(thu || []).map((event, index) => (
                            <li key={index} className="event-list ">
                              
                                <div className="event-timeline-dot">
                                    <i className="bx bx-right-arrow-circle font-size-18"></i>
                                </div>
                                <ul className="d-flex flex-row list-unstyled row ms-3 sun">
                                  
                                       <Col>
                                       <li>{event.serviceName}</li>
                                       </Col>
                                       <Col>
                                       <li>{event.projectName}</li>
                                       </Col>
                                       <Col>
                                       <li>{event.costCenter}</li>
                                       </Col>
                                       <Col>
                                       <li>{event.workItem}</li>
                                       </Col>
                                       <Col className='d-flex flex-inline'>
                                       <li>{workedHrs(event.startTime, event.endTime)}</li>
                                       <li className='editSheet'>{<EditModal id={event.id} />}</li>
                                       </Col>  
                                </ul>
                            </li>
                        ))}
                    </ul>
                    </>
                      ):(<></>)
                    }
                    <button type="submit" className="btn btn-primary w-md mt-5 float-right" onClick={()=>handleSend()}>
                        Send
                        <i className='mdi mdi-send ms-1'></i>
                      </button>
                </SimpleBar>
                
                     
            </CardBody>
        </Card>
    </Col>
</React.Fragment >
);
}

export default Weeklytimesheet