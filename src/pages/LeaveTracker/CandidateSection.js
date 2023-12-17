import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardBody, Col, DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown,Row } from 'reactstrap';

//import images
import jobs from "../../assets/images/jobs.png";
import avatar2 from "../../assets/images/users/avatar-2.jpg";
import avatar1 from "../../assets/images/users/avatar-1.jpg";
import avatar3 from "../../assets/images/users/avatar-7.jpg";
import avatar4 from "../../assets/images/users/avatar-4.jpg";

//swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import "../../../node_modules/swiper/swiper.scss";
import Cookies from 'js-cookie';

const CandidateSection = () => {
    const LeaveContent = "You will notify here about your upcoming leaves !"
    const team=Cookies.get('team')
    let details = []
    if (team === 'Delivery') {
        details = [...details, {id:1, name: 'Keerthana', designation: 'HR',img:avatar1 },{id:2, name: "Yuvashini", designation: 'Team Manager',img:avatar4 }, {id:3, name: 'Gobi', designation: 'Chief Operational Officer',img:avatar2 }, {id:4, name: 'Krishna kumar', designation: 'Chief Excuetive Officer',img:avatar3 }]

    }
    else if (team === 'Sales') {
        details = [...details,  {id:1, name: 'Keerthana', designation: 'HR',img:avatar1 },{id:2, name: "Balaji", designation: 'Team manager',img:avatar3}, {id:3, name: 'Krishna kumar', designation: 'Chief Excuetive Officer',img:avatar3 }]

    }
    else if (team === 'HR') {
        details = [...details, {id:1, name: 'Keerthana', designation: 'HR',img:avatar1 }, {id:2, name: 'Gobi', designation: 'Chief Operational Officer' } , {id:3, name: 'Krishna kumar', designation: 'Chief Excuetive Officer',img:avatar3 }]

    }
    else if (team === 'Product') {
        details = [...details, { name: 'Krishna kumar', designation: 'Chief Excuetive Officer',img:avatar3 }]
    }
    return (
        <React.Fragment>
            <Row>
            <Col lg={6}>
                <Card>
                    <CardBody>
                        <div className="d-flex">
                            <div>
                                <h4 className="card-title mb-3">Upcoming Leaves</h4>
                                <p className="text-muted">{LeaveContent}</p>
                            </div>
                            <div>
                                <img src={jobs} alt="" height="130" />
                            </div>
                        </div>
                    </CardBody>
                </Card>
            </Col>
            <Col lg={6}>    
                <Card>
                    <CardBody>
                        <h4 className="card-title mb-3">Reporting Manager</h4> 
                             <div className="carousel-inner"> 
                            <Swiper
                            modules={[Navigation, Pagination, Autoplay]}
                            spaceBetween={50}
                            slidesPerView={1}
                            navigation
                            autoplay={{
                                delay: 2500,
                                disableOnInteraction: false,
                            }}>
                                {details.map((data)=>(
                            <SwiperSlide key={data.id}> 
                            {console.log(details.length)}  
                            {details.length >=2 ?
                             <div className="carousel-item active" data-bs-interval="3000">
                                        <div className="bg-light p-3 d-flex mb-3 rounded">
                                            <img src={data.img} alt="" className="avatar-sm rounded me-3" />
                                            <div className="flex-grow-1">
                                                <h5 className="font-size-15 mb-2"><b>{data.name}</b></h5>
                                                <p className="mb-0 text-muted"><i className="bx bx-map text-body align-middle"></i> {data.designation}</p>
                                            </div>
                                     
                                        </div>
                             </div>
                             
                                    :
                             <div className="carousel-item active" data-bs-interval="3000">
                                    <div className="bg-light p-3 d-flex mb-3 rounded">
                                        <img src={data.img} alt="" className="avatar-sm rounded me-3" />
                                        <div className="flex-grow-1">
                                            <h5 className="font-size-15 mb-2"><b>{data.name}</b></h5>
                                            <p className="mb-0 text-muted"><i className="bx bx-map text-body align-middle"></i> {data.designation}</p>
                                        </div>
                                       
                                    </div>
                             </div>}
                            </SwiperSlide>
                            ))}
                            </Swiper> 
                             </div>
                             
                            

                    </CardBody>
                </Card>
            </Col>
            </Row>
        </React.Fragment>
    );
}

export default CandidateSection;