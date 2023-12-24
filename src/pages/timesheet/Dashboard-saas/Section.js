import React from 'react';
import { Link } from 'react-router-dom';
import { Col, Row } from 'reactstrap';
import Cookies from 'js-cookie';

const Section = (props) => {
    const btn = "add project";
    // console.log(props.name);
    console.log(btn)
    return (
        <React.Fragment>
            <Row className="mb-4">
                <Col lg={12}>
                    <div className="d-flex align-items-center">

                        <div className="ms-3 flex-grow-1 ">
                            <h5 className="mb-2 card-title">Hello,{Cookies.get('name')}</h5>
                            <p className="text-muted mb-0">Good to see you back!</p>
                        </div>
                        <div>
                            <Link to={props.link} className="btn btn-primary"><i className="bx bx-plus align-middle"></i>{props.btn}</Link>
                        </div>
                    </div>
                </Col>
            </Row>
        </React.Fragment>
    );
}

export default Section;