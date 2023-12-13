import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardBody, Col, DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown } from 'reactstrap';

//import images
import jobs from "assets/images/jobs.png";
import avatar2 from "assets/images/users/avatar-6.jpg";
import avatar1 from "assets/images/users/avatar-1.jpg";
import avatar3 from "assets/images/users/avatar-7.jpg";
import avatar4 from "assets/images/users/avatar-4.jpg";
import Cookies from 'js-cookie';

//swiper


const CandidateSection = () => {
    const team=Cookies.get('team')
    let details = []
    if (team === 'Delivery') {
        details = [...details,{ name: "Yuvashini", designation: 'Team Manager',img:avatar4 }, { name: 'Gobi', designation: 'Chief Operational Officer',img:avatar2 }, { name: 'Krishna kumar', designation: 'Chief Excuetive Officer',img:avatar3 }]

    }
    else if (team === 'Sales') {
        details = [...details,{ name: "Balaji", designation: 'Team manager' }, { name: 'Krishna kumar', designation: 'Chief Excuetive Officer',img:avatar3 }]

    }
    else if (team === 'HR') {
        details = [...details, { name: 'Gobi', designation: 'Chief Operational Officer' }, { name: 'Krishna kumar', designation: 'Chief Excuetive Officer',img:avatar3 }]

    }
    else if (team === 'Product') {
        details = [...details, { name: 'Krishna kumar', designation: 'Chief Excuetive Officer',img:avatar3 }]
    }
    return (
        <React.Fragment>
            <Col lg={4}>

                <Card>
                    <CardBody>
                        <h4 className="card-title mb-3">Reporting Managers</h4>
                        {
                           details.map((data)=>(
                            <div className="bg-light p-3 d-flex mb-3 rounded" key={data}>
                            <img src={data.img} alt="" className="avatar-sm rounded me-3" />
                            <div className="flex-grow-1">
                                <h5 className="font-size-15 mb-2"><a href="candidate-overview" className="text-body" key={data.name}>{data.name}</a></h5>
                                <p className="mb-0 text-muted"><i className="me-2 bx bx-briefcase text-body align-middle"></i>{data.designation}</p>
                            </div>
                        </div>
                           )) 
                        }
                       
                        {/*                                            
                                        </div>
                                        <div className="bg-light p-3 d-flex mb-3 rounded">
                                            <img src={avatar2} alt="" className="avatar-sm rounded me-3" />
                                            <div className="flex-grow-1">
                                                <h5 className="font-size-15 mb-2"><a href="candidate-overview" className="text-body">Charles Brown</a> </h5>
                                                <p className="mb-0 text-muted"><i className="bx bx-map text-body align-middle"></i> Cambodia</p>
                                            </div>
                                            
                                        </div>
                                  
                                   
                                        <div className="bg-light p-3 d-flex mb-3 rounded">
                                            <img src={avatar1} alt="" className="avatar-sm rounded me-3" />
                                            <div className="flex-grow-1">
                                                <h5 className="font-size-15 mb-2"><a href="candidate-overview" className="text-body">Adam Miller</a></h5>
                                                <p className="mb-0 text-muted"><i className="bx bx-map text-body align-middle"></i> Australia</p>
                                            </div>
                                          
                                        </div>
                                        <div className="bg-light p-3 d-flex mb-3 rounded">
                                            <img src={avatar3} alt="" className="avatar-sm rounded me-3" />
                                            <div className="flex-grow-1">
                                                <h5 className="font-size-15 mb-2"><a href="candidate-overview" className="text-body">Keith Gonzales</a></h5>
                                                <p className="mb-0 text-muted"><i className="bx bx-map text-body align-middle"></i> Belgium</p>
                                          
                                            </div>
                                    </div> */}


                    </CardBody>
                </Card>
            </Col>
        </React.Fragment>
    );
}

export default CandidateSection;