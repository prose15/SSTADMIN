import React from 'react';
import { Link } from 'react-router-dom';
import { Col, Row } from 'reactstrap';

const Section = () => {
    return (
        <React.Fragment>
            <Row className="mb-4">
                <Col lg={12}>
                    <div className="d-flex align-items-center">
                        {/* <img src={avatar} alt="" className="avatar-sm rounded" /> */}
                        <div className="ms-3 flex-grow-1">
                            <h5 className="mb-2 card-title">Hello,Prosper</h5>
                            <p className="text-muted mb-0">How is your day</p>
                        </div>
                        <div>
                            <Link to="/addleaves" className="btn btn-primary"><i className="bx bx-plus align-middle"></i> Add Leaves</Link>
                        </div>
                    </div>
                </Col>
            </Row>
        </React.Fragment>
    );
}

export default Section;