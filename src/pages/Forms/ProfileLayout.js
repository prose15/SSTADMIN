import React from "react";

import {
  Card,
  Col,
  Container,
  Row,
  CardBody,
  CardTitle,
  Label,
  Button,
  Form,
  Input,
  InputGroup,
} from "reactstrap";


import Breadcrumbs from "../../components/Common/Breadcrumb";

const ProfileLayout = props => {

  return (
    <React.Fragment>
      <div className="page-content pt-0 ps-0">
        <Container fluid={true}>
          {/* <Breadcrumbs title="Forms" breadcrumbItem="Profile" /> */}
          <Row>
            <Col sm={12}>
              <Card>
                <CardBody>
                  <CardTitle className="mb-4">Personal Information</CardTitle>
                   <Form>
                 <Row>
                      <Col md={6}>
                        <div className="mb-3">
                          <Label htmlFor="formrow-email-Input" className="font-size-14">Name</Label>
                          <p className="text-muted">Deepak Ranganathan</p>
                        </div>
                      </Col>
                      <Col md={6}>
                      <div className="mb-3">
                          <Label htmlFor="formrow-email-Input" className="font-size-14">Employee ID</Label>
                          <p className="text-muted">SST100</p>
                        </div>
                      </Col>
                    </Row>


                    <Row className="mt-3">
                      <Col md={6}>
                        <div className="mb-3">
                          <Label htmlFor="formrow-email-Input" className="font-size-14">E-mail address</Label>
                          <p className="text-muted">rajadeepak1989@gmail.com</p>
                        </div>
                      </Col>
                      <Col md={6}>
                      <div className="mb-3">
                          <Row className="d-flex justify-content-center">
                          <Col>
                          <Label htmlFor="formrow-email-Input" className="font-size-14">Password</Label>
                          </Col>
                          <Col>
                          <i className="mt-3 fas fa-edit"></i>
                          </Col>
                          </Row>
                          
                          <p className="text-muted">******</p>

                        </div>
                      </Col>
                    </Row>
                   <Row className="mt-3">
                      <Col md={6}>
                        <div className="mb-3">
                          <Label htmlFor="formrow-email-Input" className="font-size-14">Phone</Label>
                          <p className="text-muted">8248754223</p>
                        </div>
                      </Col>
                      <Col md={6}>
                      <div className="mb-3">
                          <Label htmlFor="formrow-email-Input" className="font-size-14">Gender</Label>
                          <p className="text-muted">Male</p>
                        </div>
                      </Col>
                    </Row>
                    <Row className="mt-3">
                      <Col md={6}>
                        <div className="mb-3">
                          <Label htmlFor="formrow-email-Input" className="font-size-14">Team</Label>
                          <p className="text-muted">Product</p>
                        </div>
                      </Col>
                      <Col md={6}>
                      <div className="mb-3">
                          <Label htmlFor="formrow-email-Input" className="font-size-14">Role</Label>
                          <p className="text-muted">Full Stack</p>
                        </div>
                      </Col>
                    </Row>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default ProfileLayout