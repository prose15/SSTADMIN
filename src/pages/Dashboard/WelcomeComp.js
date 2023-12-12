import React from "react"

import { Row, Col, Card, CardBody } from "reactstrap"
import { Link } from "react-router-dom"

import deepak from "../../assets/images/users/deepak.jpg"
import profileImg from "../../assets/images/profile-img.png"

const WelcomeComp = (props) => {
  return (
    <React.Fragment>
      <Card className="overflow-hidden">
        <div className="bg-primary-subtle">
          <Row>
            <Col xs="7">
              <div className="text-primary p-3">
                <h5 className="text-primary">Welcome Back!</h5>
                <p>Dashboard</p>
              </div>
            </Col>
            <Col xs="5" className="align-self-end">
              <img src={profileImg} alt="" className="img-fluid" />
            </Col>
          </Row>
        </div>
        <CardBody className="pt-0">
          <Row>
            <Col sm="4">
              <div className="avatar-md profile-user-wid mb-4">
                <img
                  src={deepak}
                  alt=""
                  className="img-thumbnail rounded-circle"
                />
              </div>
              <h5 className="font-size-14 text-truncate">{props.name}</h5>
              <p className="text-muted mb-0 text-truncate">{props.role}</p>
            </Col>

            <Col sm="8">
              <div className="pt-4">
                <Row>
                  <Col xs="6">
                    <h5 className="font-size-15">30</h5>
                    <p className="text-muted mb-0">Hours worked</p>
                  </Col>
                  <Col xs="6">
                    <h5 className="font-size-15">3</h5>
                    <p className="text-muted mb-0">Days off</p>
                  </Col>
                </Row>
                <div className="mt-4">
                  <Link
                    to=""
                    className="btn btn-primary  btn-sm"
                  >
                    View Profile <i className="mdi mdi-arrow-right ms-1"></i>
                  </Link>
                </div>
              </div>
            </Col>
          </Row>
        </CardBody>
      </Card>
    </React.Fragment>
  )
}
export default WelcomeComp
