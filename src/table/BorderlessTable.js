import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardBody, Col } from 'reactstrap';

// //Import Scrollbar
import SimpleBar from "simplebar-react";
import avatar5 from 'assets/images/users/avatar-5.jpg'
const BorderlessTable = () => {
 
  let id=0;
  const  sun = [
  
   {
      id:id+=1,
      serviceName:'AMS',
      projectName:'BITUMAT',
      costCenter:'SST001',
      workItem:'#171',
      totalHours:'1.0'
    },
    {
      id:id+=1,
      serviceName:'AMS',
      projectName:'ALSUHAMI',
      costCenter:'SST004',
      workItem:'#178',
      totalHours:'1.5'
    },
    {
      id:id+=1,
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


  return (
    <React.Fragment>
        <Col lg={8}>
            <Card>
                <CardBody>
                    
                    <SimpleBar style={{maxHeight:'327px'}}>
                    <h4 className="card-title mb-4">Sunday</h4>
                        <ul className="verti-timeline list-unstyled ms-3 mb-5">
                            {(sun || []).map((event, index) => (
                                <li key={index} className="event-list ">
                                  
                                    <div className="event-timeline-dot">
                                        <i className="bx bx-right-arrow-circle font-size-18"></i>
                                    </div>
                                    <ul  className="d-flex flex-row list-unstyled row ms-3" >
                                      
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
                                           <Col>
                                           <li>{event.totalHours}</li>
                                           </Col> 
                                    </ul>
                                </li>
                            ))}
                            </ul>
                            <h4 className="card-title mb-4">Monday</h4>
                            <ul className="verti-timeline list-unstyled ms-3">
                             {(mon || []).map((event, index) => (
                                <li key={index} className="event-list ">
                                  
                                    <div className="event-timeline-dot">
                                        <i className="bx bx-right-arrow-circle font-size-18"></i>
                                    </div>
                                    <ul className="d-flex flex-row list-unstyled row ms-3">
                                      
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
                                           <Col>
                                           <li>{event.totalHours}</li>
                                           </Col> 
                                    </ul>
                                </li>
                            ))}
                        </ul>
                        {/* <div className="text-center mt-4"><Link to="#" className="btn btn-primary waves-effect waves-light btn-sm">View More <i className="mdi mdi-arrow-right ms-1"></i></Link></div> */}
                    </SimpleBar>
                </CardBody>
            </Card>
        </Col>
    </React.Fragment >
);
}

export default BorderlessTable