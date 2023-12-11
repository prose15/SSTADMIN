import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardBody, Col, DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown } from 'reactstrap';

//import images
import jobs from "../../assets/images/jobs.png";
import avatar2 from "../../assets/images/users/avatar-2.jpg";
import avatar1 from "../../assets/images/users/avatar-1.jpg";
import avatar3 from "../../assets/images/users/avatar-3.jpg";
import avatar4 from "../../assets/images/users/avatar-4.jpg";

//swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import "../../../node_modules/swiper/swiper.scss";

const CandidateSection = () => {
    const LeaveContent = "You will notify here about your upcoming leaves !"
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
                        <h4 className="card-title mb-3">Popular Candidate</h4>
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
                            <div className="carousel-inner">

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
                        </Swiper>
                    </CardBody>
                </Card>
            </Col>
        </React.Fragment>
    );
}

export default CandidateSection;