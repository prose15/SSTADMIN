import React from 'react';
import { Card, CardBody, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import { jobVacancy } from "../../common/data/dashboard-job";

const JobVacancy = () => {
    return (
        <React.Fragment>
           
            {(jobVacancy || []).map((item, key) => (
                <Col lg={3} key={key}>
                    <Card className="leave-cards">
                        <CardBody className="p-4">
                            <div className="text-center mb-3">
                                <img src={item.img} alt="" className="avatar-sm" />
                                <Link to="/job-details" className="text-body">
                                    <h5 className="mt-4 mb-2 font-size-15">{item.title}</h5>
                                </Link>
                            </div>

                            <div className="d-flex">
                                <p className="mb-0 flex-grow-1 text-muted"><i className="bx bx-map text-body"></i> {item.country}</p>
                                <p className="mb-0 text-muted"><b>{item.vacancy}</b> Vacancy</p>
                            </div>
                        </CardBody>
                    </Card>
                </Col>
            ))}
        </React.Fragment>
    );
}

export default JobVacancy;