import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardBody, Col, DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown } from 'reactstrap';

//import images
import jobs from "../../assets/images/jobs.png";
import avatar2 from "../../assets/images/users/avatar-2.jpg";
import avatar1 from "../../assets/images/users/avatar-1.jpg";
import avatar3 from "../../assets/images/users/avatar-3.jpg";
import avatar5 from "../../assets/images/users/avatar-5.jpg";
import avatar4 from "../../assets/images/users/avatar-4.jpg";
import avatar7 from "../../assets/images/users/avatar-7.jpg";

//swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import "../../../node_modules/swiper/swiper.scss";
import Cookies from 'js-cookie';

const CandidateSection = () => {
    const LeaveContent = "You will notify here about your upcoming leaves!"
    const team=Cookies.get('team')
    let details = []
    if (team === 'Delivery') {
        details = [...details,{ id:1,name: "Keerthana", designation: 'HR',img:avatar4 },{ id:3,name: "Yuvashini", designation: 'Team Manager',img:avatar3 }, {id:2, name: 'Gobi', designation: 'Chief Operational Officer',img:avatar2 }, { id:4,name: 'Krishna kumar', designation: 'Chief Excuetive Officer',img:avatar7 }]

    }

    else if (team === 'Sales') {
        details = [...details,{id:1, name: "Keerthana", designation: 'HR',img:avatar4 },{ id:2,name: 'Krishna kumar', designation: 'Chief Excuetive Officer',img:avatar3 },{ id:3,name: "Balaji", designation: 'Team manager',img:avatar5 }]
    }

    else if (team === 'HR') {
        details = [...details, {id:1, name: 'Gobi', designation: 'Chief Operational Officer',img:avatar4 }, { id:2,name: 'Krishna kumar', designation: 'Chief Excuetive Officer',img:avatar3 }]
    }
    
    else if (team === 'Product') {
        details = [...details, {id:1, name: "Keerthana", designation: 'HR',img:avatar4 },{id:2, name: 'Krishna kumar', designation: 'Chief Excuetive Officer',img:avatar7}]
    }

const swiper1=details.filter((detail)=>(detail.id)%2===1)
const swiper2=details.filter((detail)=>(detail.id)%2===0)
console.log(swiper1)
console.log(swiper2)
// const swiper1length=swiper1.length
console.log(swiper1.length)


    return (
        <React.Fragment>
            <Col lg={12}>
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
                <Card>
                    <CardBody>
                        <h4 className="card-title mb-3">Reporting Manager</h4> 
{
  
                           (swiper1.length===1)?(
                            
                           details.map((data)=>(
                            <div className="bg-light p-3 d-flex mb-3 rounded" key={data}>
                            <img src={data.img} alt="" className="avatar-sm rounded me-3" />
                            <div className="flex-grow-1">
                                <h5 className="font-size-15 mb-2"><a href="candidate-overview" className="text-body" key={data.name}>{data.name}</a></h5>
                                <p className="mb-0 text-muted"><i className="me-2 bx bx-briefcase text-body align-middle"></i>{data.designation}</p>
                            </div>
                        </div>
                           )) 

                        ):(

                        <Swiper
                            modules={[Navigation, Pagination, Autoplay]}
                            spaceBetween={50}
                            slidesPerView={1}
                            navigation
                            autoplay={{
                                delay: 2500,
                                disableOnInteraction: false,
                            }}
                        >
                            <div className='carousel-inner'>
                                <SwiperSlide>
                                    
                                <div className="carousel-item active" data-bs-interval="3000" >
                                   {
                                    swiper1.map((data)=>( 
                                    
                                        <div className="bg-light p-3 d-flex mb-3 rounded" key={data.id}>
                                            <img src={data.img} alt="" className="avatar-sm rounded me-3" />
                                            <div className="flex-grow-1">
                                                <h5 className="font-size-15 mb-2"><b>{data.name}</b></h5>
                                                <p className="mb-0 text-muted"><i className="bx bx-map text-body align-middle"></i>{data.designation}</p>
                                            </div>
                                        </div>
                                        ))}
                                    </div>
                                
                                </SwiperSlide>
                                

                                <SwiperSlide>
                                    
                                        <div className="carousel-item active" data-bs-interval="3000">
                                    {swiper2.map((data)=>( 
                                    
                                        <div className="bg-light p-3 d-flex mb-3 rounded" key={data.id}>
                                            <img src={data.img} alt="" className="avatar-sm rounded me-3" />
                                            <div className="flex-grow-1">
                                                <h5 className="font-size-15 mb-2"><b>{data.name}</b></h5>
                                                <p className="mb-0 text-muted"><i className="bx bx-map text-body align-middle"></i>{data.designation}</p>
                                            </div>
                                        </div>
                                        ))}
                                        </div>
                              
                                </SwiperSlide>

                        </div>
                        </Swiper>)}
                        

                        {/* <Swiper
                            modules={[Navigation, Pagination, Autoplay]}
                            spaceBetween={50}
                            slidesPerView={1}
                            navigation
                            autoplay={{
                                delay: 2500,
                                disableOnInteraction: false,
                            }}
                        >
                            <div className='carousel-inner'>

                            

                                 <SwiperSlide>
                                    <div className="carousel-item active" data-bs-interval="3000">
                                        <div className="bg-light p-3 d-flex mb-3 rounded">
                                            <img src={avatar4} alt="" className="avatar-sm rounded me-3" />
                                            <div className="flex-grow-1">
                                                <h5 className="font-size-15 mb-2"><b>Keerthana</b></h5>
                                                <p className="mb-0 text-muted"><i className="bx bx-map text-body align-middle"></i> HR</p>
                                            </div>
                                            <div>
                                                <UncontrolledDropdown>
                                                    <DropdownToggle className="btn btn-soft-primary" type="button" id="dropdownMenuButton11">
                                                        <i className='bx bx-dots-vertical-rounded'></i>
                                                    </DropdownToggle>
                                                    <DropdownMenu aria-labelledby="dropdownMenuButton11">
                                                        <li><DropdownItem href="candidate-overview">View Details</DropdownItem></li>
                                                    </DropdownMenu>
                                                </UncontrolledDropdown>
                                            </div>
                                        </div>
                                        <div className="bg-light p-3 d-flex">
                                            <img src={avatar2} alt="" className="avatar-sm rounded me-3" />
                                            <div className="flex-grow-1">
                                                <h5 className="font-size-15 mb-2"><b>Gopi</b></h5>
                                                <p className="mb-0 text-muted"><i className="bx bx-map text-body align-middle"></i> COO</p>
                                            </div>
                                            <div>
                                                <UncontrolledDropdown>
                                                    <DropdownToggle className="btn btn-soft-primary" type="button" id="dropdownMenuButton11">
                                                        <i className='bx bx-dots-vertical-rounded'></i>
                                                    </DropdownToggle>
                                                    <DropdownMenu aria-labelledby="dropdownMenuButton11">
                                                        <li><DropdownItem href="candidate-overview">View Details</DropdownItem></li>
                                                    </DropdownMenu>
                                                </UncontrolledDropdown>
                                            </div>
                                        </div>
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <div className="carousel-item active" data-bs-interval="3000">
                                        <div className="bg-light p-3 d-flex mb-3 rounded">
                                            <img src={avatar1} alt="" className="avatar-sm rounded me-3" />
                                            <div className="flex-grow-1">
                                                <h5 className="font-size-15 mb-2"><b>Yuvashini</b></h5>
                                                <p className="mb-0 text-muted"><i className="bx bx-map text-body align-middle"></i> Team Manager</p>
                                            </div>
                                            <div>
                                                <UncontrolledDropdown>
                                                    <DropdownToggle className="btn btn-soft-primary" type="button" id="dropdownMenuButton11">
                                                        <i className='bx bx-dots-vertical-rounded'></i>
                                                    </DropdownToggle>
                                                    <DropdownMenu aria-labelledby="dropdownMenuButton11">
                                                        <li><DropdownItem href="candidate-overview">View Details</DropdownItem></li>
                                                    </DropdownMenu>
                                                </UncontrolledDropdown>
                                            </div>
                                        </div>
                                        <div className="bg-light p-3 d-flex">
                                            <img src={avatar3} alt="" className="avatar-sm rounded me-3" />
                                            <div className="flex-grow-1">
                                                <h5 className="font-size-15 mb-2"><b>Krishna Kumar</b></h5>
                                                <p className="mb-0 text-muted"><i className="bx bx-map text-body align-middle"></i> Ceo</p>
                                            </div>
                                            <div>
                                                <UncontrolledDropdown>
                                                    <DropdownToggle className="btn btn-soft-primary" type="button" id="dropdownMenuButton11">
                                                        <i className='bx bx-dots-vertical-rounded'></i>
                                                    </DropdownToggle>
                                                    <DropdownMenu aria-labelledby="dropdownMenuButton11">
                                                        <li><DropdownItem href="candidate-overview">View Details</DropdownItem></li>
                                                    </DropdownMenu>
                                                </UncontrolledDropdown>
                                            </div>
                                        </div>
                                    </div>
                                </SwiperSlide> 
                            </div>
                        </Swiper> */}
                    </CardBody>
                </Card>
            </Col>
        </React.Fragment>
    );
}

export default CandidateSection;