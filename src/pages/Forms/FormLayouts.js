import React,{useState} from "react";
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
  FormGroup,
  Input,
  InputGroup,
} from "reactstrap";
//Import Flatepicker
import "flatpickr/dist/themes/material_blue.css";
import Flatpickr from "react-flatpickr";
//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { options } from "toastr";
import { formatDate } from "@fullcalendar/core";
import { date } from "yup";

const FormLayouts = props => {
  const [eventCategory,setEventCategory] = useState('')
  const [reason,setReason]= useState('')
  const reportingManager = "Keerthana";
  const [date,setDate] = useState(new Date())

const handlesubmit = (e) =>{isupportz.com
  e.preventDefault();
  (eventCategory)
} 
  
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          <Breadcrumbs title="Forms" breadcrumbItem="Form Layouts" />
          <Row>
            <Col>
              <Card>
                <CardBody>
                  <CardTitle className="mb-4">Form Grid Layout</CardTitle>

                  <Form>
                    <Row>
                  <Col md={6}>
                        <div className="mb-3">
                        <Label htmlFor="formrow-email-Input">Leave types</Label>
                          <select className="form-select"
                          value={eventCategory}
                          onChange={(e)=>{setEventCategory(e.target.value)}}
                          >
                            <option value="casualleave">Casual leave</option>
                            <option value="sickleave">Sick leave</option>
                            <option value="paternityleave">Paternity leave</option>
                            <option value="earnedleave">Earned leave</option>
                            <option value="leavewithoutpay">Leave without pay</option>
                          </select>
                        </div>
                      </Col>
                      <Col md={6}>
                        <div className="mb-3">
                          <Label htmlFor="formrow-email-Input">Reporting Manager</Label>
                          <Input
                            type="username"
                            className="form-control"
                            value={reportingManager}
                          />
                        </div>
                      </Col>
                      </Row>
                      <Row>
                      <Col md={6}>
                        <div className="mb-3">
                          <Label htmlFor="formrow-email-Input">Start Date</Label>
                          <Input
                            type="date"
                            className="form-control"
                            id="formrow-email-Input"
                            placeholder="Enter Your Email ID"
                          />
                        </div>
                      </Col>
                      <Col md={6}>
                        <div className="mb-3">
                          <Label htmlFor="formrow-password-Input">End Date</Label>
                          <Input
                            type="date"
                            className="form-control"
                            autoComplete="off"
                            id="formrow-password-Input"
                            placeholder="Enter Your Password"
                          />
                        </div>
                      </Col>
                    </Row>

                    <div className="mt-3">
                    <Label>Reason</Label>
                    <Input
                      type="textarea"
                      id="textarea"
                      maxLength="225"
                      rows="3"
                      placeholder="Don't exists 250 words for reason"
                      value={reason}
                      onChange={e =>{
                        setReason(e.target.value)
                      }}
                    />
                  </div>
                  <div>
                      <button type="submit" className="btn btn-primary w-md mt-5" onClick={handlesubmit}>Submit</button>
                    </div>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
}

export default FormLayouts;
