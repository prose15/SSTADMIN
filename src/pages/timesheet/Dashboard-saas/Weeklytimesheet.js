import React,{useState} from 'react';
import { Link } from 'react-router-dom';
import { Card, CardBody, Col } from 'reactstrap';
import MytimesheetModal from 'pages/timesheet/Dashboard-saas/pages/MytimesheetModal';
// //Import Scrollbar
import SimpleBar from "simplebar-react";
import avatar5 from 'assets/images/users/avatar-5.jpg'
import EditModal from './Components/EditModal';
import "./Components/EditModal.css"
const Weeklytimesheet = () => {
  const [isHover,setIsHover]=useState(false)
  const days=['Sunday','Monday',"Tuesday","Wednesday","Thursday",'Friday']
  const  sun = [
  
   {
      serviceName:'AMS',
      projectName:'BITUMAT',
      costCenter:'SST001',
      workItem:'#171',
      totalHours:'1.0'
    },
    {
      serviceName:'AMS',
      projectName:'ALSUHAMI',
      costCenter:'SST004',
      workItem:'#178',
      totalHours:'1.5'
    },
    {
      serviceName:'BMS',
      projectName:'BITUMAT',
      costCenter:'SST007',
      workItem:'#171',
      totalHours:'1.0'
    }
]
const  mon = [
  
  {
     serviceName:'AMS',
     projectName:'BITUMAT',
     costCenter:'SST001',
     workItem:'#171',
     totalHours:'1.0'
   },
   {
     serviceName:'AMS',
     projectName:'ALSUHAMI',
     costCenter:'SST004',
     workItem:'#178',
     totalHours:'1.5'
   },
   {
     serviceName:'BMS',
     projectName:'BITUMAT',
     costCenter:'SST007',
     workItem:'#171',
     totalHours:'1.0'
   }
]
const totDays=[sun,mon]

  return (
    <React.Fragment>
        {/* <div className="page-content"> */}
            <Card>
                <CardBody>
                    <SimpleBar >
                    {
                      totDays.map((day,index)=>(
                        <>
                        <h4 className="card-title mb-4">{days[index]}</h4>
                        <ul key={index} className="verti-timeline list-unstyled ms-3 mb-5">{
                        day.map((event,index1)=>(
                          <li key={index1} className="event-list ">
                                  
                                    <div className="event-timeline-dot">
                                        <i className="bx bx-right-arrow-circle font-size-18"></i>
                                    </div>
                                    <ul className="d-flex flex-row list-unstyled row ms-3 sun" >
                                      
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
                                           <li >{event.totalHours}</li>
                                           <li className='editSheet'>{
                                                 <EditModal />
                                                 }</li>
                                           </Col> 
                                    </ul>
                                </li>
                        ))
                        }</ul>
                         
                        </>
                      ))
                     
                    }
                     <button type="submit" className="btn btn-primary w-md  float-right">
                        Send
                        <i className='mdi mdi-send ms-1'></i>
                      </button>
                      </SimpleBar>
                </CardBody>
            </Card>
        {/* </div> */}
    </React.Fragment >
);
}

export default Weeklytimesheet