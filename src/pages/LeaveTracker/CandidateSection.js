import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardBody, Col, DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown,Alert } from 'reactstrap';

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

const CandidateSection = ({upcomingLeaves}) => {
    const LeaveContent = "You will notify here about your upcoming leaves!"
    const team=Cookies.get('team')
    const level=Cookies.get('level')
    let details = []
    if (team === 'Delivery' && level=='L1' || team === 'HR' &&  level=='L2') {
            details = [...details, {id:1, name: 'Gobi', designation: 'Chief Operational Officer',img:avatar2 }]   
    }

    else if (team === 'Sales' && level=='L2') {
            details = [...details,{ id:1,name: 'Krishna kumar', designation: 'Chief Excuetive Officer',img:avatar7 }]
        
        // details = [...details,{id:1, name: "Keerthana", designation: 'HR',img:avatar4 },{ id:2,name: 'Krishna kumar', designation: 'Chief Excuetive Officer',img:avatar7 },{ id:3,name: "Balaji", designation: 'Team manager',img:avatar5 }]
    }

    else if (team === 'HR') {

        details = [...details, {id:1, name: 'Gobi', designation: 'Chief Operational Officer',img:avatar4 }, { id:3,name: 'Krishna kumar', designation: 'Chief Excuetive Officer',img:avatar7 }]
    }

    // else if (team === 'Product') {
        
    //     details = [...details, {id:1, name: "Keerthana", designation: 'HR',img:avatar4 },{id:2, name: 'Krishna kumar', designation: 'Chief Excuetive Officer',img:avatar7}]
    // }

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
                        <div className="d-flex flex-column">
                        <h4 className="card-title mb-3">Upcoming Leaves</h4>
                            <div className='container overflow-y-auto' id='upcoming'>
                                
                                <p className="text-muted">{(upcomingLeaves.length===0)?(LeaveContent):(
                                    document.getElementById('upcoming').style.height='110px',
                                    upcomingLeaves.map((data)=>(
                                <div key={data.id} >
                                   <Alert color="success">
                                    <div className='d-flex flex-direction-row'>
                                        <i className="mdi mdi-check-all me-2"></i>                              
                                        {`Your have upcoming ${data.leaveType} from ${data.from} to ${data.to}`}
                                    </div>
                                    </Alert>
                                {/* <p></p> */}
                                </div>
                                    ))
                                
                                )}</p>
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
                            <img src={data.img} alt="" className="avatar-sm rounded-circle me-3" />
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
                                            <img src={data.img} alt="" className="avatar-sm rounded-circle me-3" />
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
                                            <img src={data.img} alt="" className="avatar-sm rounded-circle me-3" />
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
                    </CardBody>
                </Card>
            </Col>
        </React.Fragment>
    );
}

export default CandidateSection;