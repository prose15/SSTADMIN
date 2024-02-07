import React from 'react'
import { Col, Card, CardBody, } from 'reactstrap'
import SimpleBar from "simplebar-react";
import workedHrs from './workedHrs';
const TimesheetCard = ({sun,mon,tue,wed,thu,fri,sat}) => {
    console.log(fri,sat)
  return (
    <React.Fragment>
        <Col className='page-content'>
            <Card>
                <CardBody>
                    
                    <SimpleBar className='ps-3 ' >
                    {
                          sun && sun.length>0?(
                            <>
                            <h4 className="card-title mb-4">Sunday</h4>
                            <ul className="verti-timeline list-unstyled ms-3">
                             {(sun || []).map((event, index) => (
                                <li key={index} className="event-list ">
                                  
                                    <div className="event-timeline-dot">
                                        <i className="bx bx-right-arrow-circle font-size-18"></i>
                                    </div>
                                    <ul className="d-flex flex-row list-unstyled row ms-3">
                                    <Col className='col-lg-1'>
                                           <li>{event.serviceName}</li>
                                           </Col>
                                           <Col className='col-lg-2'>
                                           <li>{event.projectName}</li>
                                           </Col>
                                           <Col className='col-lg-1'>
                                           <li>{event.costCenter}</li>
                                           </Col>
                                           <Col className='col-lg-1'>
                                           <li>{event.workItem}</li>
                                           </Col>
                                           <Col className='col-lg-1'>
                                           <li>{event.startTime}</li>
                                           </Col>
                                           <Col className='col-lg-1'>
                                           <li>{event.startTime}</li>
                                           </Col>
                                           <Col className='col-lg-1'>
                                           <li>{workedHrs(event.startTime, event.endTime)}</li>
                                           </Col> 
                                           <Col className='col-lg-2'>
                                           <li>{event.billableStatus}</li>
                                           </Col>
                                           <Col className='col-lg-2'>
                                           <li>{event.description}</li>
                                           </Col>
                                           
                                    </ul>
                                </li>
                            ))}
                        </ul>
                        </>
                          ):(<></>)
                        }
                              {
                          mon && mon.length>0?(
                            <>
                            <h4 className="card-title mt-4 mb-4">Monday</h4>
                            <ul className="verti-timeline list-unstyled ms-3">
                             {(mon || []).map((event, index) => (
                                <li key={index} className="event-list ">
                                  
                                    <div className="event-timeline-dot">
                                        <i className="bx bx-right-arrow-circle font-size-18"></i>
                                    </div>
                                    <ul className="d-flex flex-row list-unstyled row ms-3">
                                    <Col className='col-lg-1'>
                                           <li>{event.serviceName}</li>
                                           </Col>
                                           <Col className='col-lg-2'>
                                           <li>{event.projectName}</li>
                                           </Col>
                                           <Col className='col-lg-1'>
                                           <li>{event.costCenter}</li>
                                           </Col>
                                           <Col className='col-lg-1'>
                                           <li>{event.workItem}</li>
                                           </Col>
                                           <Col className='col-lg-1'>
                                           <li>{event.startTime}</li>
                                           </Col>
                                           <Col className='col-lg-1'>
                                           <li>{event.startTime}</li>
                                           </Col>
                                           <Col className='col-lg-1'>
                                           <li>{workedHrs(event.startTime, event.endTime)}</li>
                                           </Col> 
                                           <Col className='col-lg-2'>
                                           <li>{event.billableStatus}</li>
                                           </Col>
                                           <Col className='col-lg-2'>
                                           <li>{event.description}</li>
                                           </Col>
                                           
                                    </ul>
                                </li>
                            ))}
                        </ul>
                        </>
                          ):(<></>)
                        }
                        {
                          tue && tue.length>0?(
                            <>
                            <h4 className="card-title mt-4 mb-4">Tuesday</h4>
                            <ul className="verti-timeline list-unstyled ms-3">
                             {(tue || []).map((event, index) => (
                                <li key={index} className="event-list ">
                                  
                                    <div className="event-timeline-dot">
                                        <i className="bx bx-right-arrow-circle font-size-18"></i>
                                    </div>
                                    <ul className="d-flex flex-row list-unstyled row ms-3">
                                    <Col className='col-lg-1'>
                                           <li>{event.serviceName}</li>
                                           </Col>
                                           <Col className='col-lg-2'>
                                           <li>{event.projectName}</li>
                                           </Col>
                                           <Col className='col-lg-1'>
                                           <li>{event.costCenter}</li>
                                           </Col>
                                           <Col className='col-lg-1'>
                                           <li>{event.workItem}</li>
                                           </Col>
                                           <Col className='col-lg-1'>
                                           <li>{event.startTime}</li>
                                           </Col>
                                           <Col className='col-lg-1'>
                                           <li>{event.startTime}</li>
                                           </Col>
                                           <Col className='col-lg-1'>
                                           <li>{workedHrs(event.startTime, event.endTime)}</li>
                                           </Col> 
                                           <Col className='col-lg-2'>
                                           <li>{event.billableStatus}</li>
                                           </Col>
                                           <Col className='col-lg-2'>
                                           <li>{event.description}</li>
                                           </Col>
                                           
                                    </ul>
                                </li>
                            ))}
                        </ul>
                        </>
                          ):(<></>)
                        }
                        {
                          wed && wed.length>0?(
                            <>
                            <h4 className="card-title mt-4 mb-4">Wednesday</h4>
                            <ul className="verti-timeline list-unstyled ms-3">
                             {(wed || []).map((event, index) => (
                                <li key={index} className="event-list ">
                                  
                                    <div className="event-timeline-dot">
                                        <i className="bx bx-right-arrow-circle font-size-18"></i>
                                    </div>
                                    <ul className="d-flex flex-row list-unstyled row ms-3">
                                    <Col className='col-lg-1'>
                                           <li>{event.serviceName}</li>
                                           </Col>
                                           <Col className='col-lg-2'>
                                           <li>{event.projectName}</li>
                                           </Col>
                                           <Col className='col-lg-1'>
                                           <li>{event.costCenter}</li>
                                           </Col>
                                           <Col className='col-lg-1'>
                                           <li>{event.workItem}</li>
                                           </Col>
                                           <Col className='col-lg-1'>
                                           <li>{event.startTime}</li>
                                           </Col>
                                           <Col className='col-lg-1'>
                                           <li>{event.startTime}</li>
                                           </Col>
                                           <Col className='col-lg-1'>
                                           <li>{workedHrs(event.startTime, event.endTime)}</li>
                                           </Col> 
                                           <Col className='col-lg-2'>
                                           <li>{event.billableStatus}</li>
                                           </Col>
                                           <Col className='col-lg-2'>
                                           <li>{event.description}</li>
                                           </Col>
                                           
                                    </ul>
                                </li>
                            ))}
                        </ul>
                        </>
                          ):(<></>)
                        }
                        {
                          thu && thu.length>0?(
                            <>
                            <h4 className="card-title mt-4 mb-4">Thursday</h4>
                            <ul className="verti-timeline list-unstyled ms-3">
                             {(thu || []).map((event, index) => (
                                <li key={index} className="event-list ">
                                  
                                    <div className="event-timeline-dot">
                                        <i className="bx bx-right-arrow-circle font-size-18"></i>
                                    </div>
                                    <ul className="d-flex flex-row list-unstyled row ms-3">
                                    <Col className='col-lg-1'>
                                           <li>{event.serviceName}</li>
                                           </Col>
                                           <Col className='col-lg-2'>
                                           <li>{event.projectName}</li>
                                           </Col>
                                           <Col className='col-lg-1'>
                                           <li>{event.costCenter}</li>
                                           </Col>
                                           <Col className='col-lg-1'>
                                           <li>{event.workItem}</li>
                                           </Col>
                                           <Col className='col-lg-1'>
                                           <li>{event.startTime}</li>
                                           </Col>
                                           <Col className='col-lg-1'>
                                           <li>{event.startTime}</li>
                                           </Col>
                                           <Col className='col-lg-1'>
                                           <li>{workedHrs(event.startTime, event.endTime)}</li>
                                           </Col> 
                                           <Col className='col-lg-2'>
                                           <li>{event.billableStatus}</li>
                                           </Col>
                                           <Col className='col-lg-2'>
                                           <li>{event.description}</li>
                                           </Col>
                                           
                                    </ul>
                                </li>
                            ))}
                        </ul>
                        </>
                          ):(<></>)
                        }
                          {
                          fri?(
                            <>
                            <h4 className="card-title mt-4 mb-4">Friday</h4>
                            <ul className="verti-timeline list-unstyled ms-3">
                             {fri.map((event, index) => (
                                <li key={index} className="event-list ">
                                  
                                    <div className="event-timeline-dot">
                                        <i className="bx bx-right-arrow-circle font-size-18"></i>
                                    </div>
                                    <ul className="d-flex flex-row list-unstyled row ms-3">
                                    <Col className='col-lg-1'>
                                           <li>{event.serviceName}</li>
                                           </Col>
                                           <Col className='col-lg-2'>
                                           <li>{event.projectName}</li>
                                           </Col>
                                           <Col className='col-lg-1'>
                                           <li>{event.costCenter}</li>
                                           </Col>
                                           <Col className='col-lg-1'>
                                           <li>{event.workItem}</li>
                                           </Col>
                                           <Col className='col-lg-1'>
                                           <li>{event.startTime}</li>
                                           </Col>
                                           <Col className='col-lg-1'>
                                           <li>{event.startTime}</li>
                                           </Col>
                                           <Col className='col-lg-1'>
                                           <li>{workedHrs(event.startTime, event.endTime)}</li>
                                           </Col> 
                                           <Col className='col-lg-2'>
                                           <li>{event.billableStatus}</li>
                                           </Col>
                                           <Col className='col-lg-2'>
                                           <li>{event.description}</li>
                                           </Col>
                                           
                                    </ul>
                                </li>
                            ))}
                        </ul>
                        </>
                          ):(<></>)
                        }
                          {
                          sat?(
                            <>
                            <h4 className="card-title mt-4 mb-4">Saturday</h4>
                            <ul className="verti-timeline list-unstyled ms-3">
                             {sat.map((event, index) => (
                                <li key={index} className="event-list ">
                                  
                                    <div className="event-timeline-dot">
                                        <i className="bx bx-right-arrow-circle font-size-18"></i>
                                    </div>
                                    <ul className="d-flex flex-row list-unstyled row ms-3">
                                    <Col className='col-lg-1'>
                                           <li>{event.serviceName}</li>
                                           </Col>
                                           <Col className='col-lg-2'>
                                           <li>{event.projectName}</li>
                                           </Col>
                                           <Col className='col-lg-1'>
                                           <li>{event.costCenter}</li>
                                           </Col>
                                           <Col className='col-lg-1'>
                                           <li>{event.workItem}</li>
                                           </Col>
                                           <Col className='col-lg-1'>
                                           <li>{event.startTime}</li>
                                           </Col>
                                           <Col className='col-lg-1'>
                                           <li>{event.startTime}</li>
                                           </Col>
                                           <Col className='col-lg-1'>
                                           <li>{workedHrs(event.startTime, event.endTime)}</li>
                                           </Col> 
                                           <Col className='col-lg-2'>
                                           <li>{event.billableStatus}</li>
                                           </Col>
                                           <Col className='col-lg-2'>
                                           <li>{event.description}</li>
                                           </Col>
                                           
                                    </ul>
                                </li>
                            ))}
                        </ul>
                        </>
                          ):(<></>)
                        }
                        
                    </SimpleBar>
                </CardBody>
            </Card>
        </Col>
    </React.Fragment >
  )
}

export default TimesheetCard