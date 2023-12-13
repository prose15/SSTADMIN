import React,{useState} from "react"
import PropTypes from "prop-types"
import {
  Card,
  Col,
  Container,
  Row,
  CardBody,
  CardTitle,
  Label,
  Form,
  Input,
  InputGroup,
} from "reactstrap"

import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Table,
} from "reactstrap"
import img7 from "assets/images/product/img-7.png"
import img4 from "assets/images/product/img-4.png"

const MytimesheetModal = props => {
  const [projectName,setProjectName]=useState('');
  const [serviceName,setServiceName]=useState('');
  const [costCenter,setCostCenter]=useState('');
  const [workItem,setWorkItem]=useState('');
  const [timesheetDate,setTimesheetDate]=useState('');
  const [startTime,setStartTime]=useState('');
  const [endTime,setEndTime]=useState('');
  const [billableStatus,setBillableStatus]=useState(false);
  const [description,setDescription]=useState('');
  const { isOpen, toggle } = props
  return (
    <Modal
      isOpen={isOpen}
      role="dialog"
      autoFocus={true}
      centered={true}
      className="exampleModal"
      tabIndex="-1"
      toggle={toggle}
    >
      <div className="modal-content">
        <ModalHeader toggle={toggle}>Sunday</ModalHeader>
        <ModalBody>
        <Form>
                  <Row>
                      <Col md={6}>
                        <div className="mb-3">
                          <Label htmlFor="formrow-email-Input">Service</Label>
                          <select className="form-control" value={serviceName} onChange={(e)=>setProjectName(e.target.value)}>
                        <option>Select</option>
                        <option>Large select</option>
                        <option>Small select</option>
                      </select>
                        </div>
                      </Col>
                      <Col md={6}>
                        <div className="mb-3">
                          <Label htmlFor="formrow-password-Input">Project</Label>
                          <select className="form-control" value={projectName} onChange={(e)=>setProjectName(e.target.value)}>
                        <option>Select</option>
                        <option>Large select</option>
                        <option>Small select</option>
                      </select>
                        </div>
                      </Col>
                    </Row>

                    <Row>
                      <Col md={6}>
                        <div className="mb-3">
                          <Label htmlFor="formrow-email-Input">Cost Center</Label>
                          <select className="form-control" value={costCenter} onChange={(e)=>setCostCenter(e.target.value)}>
                        <option>Select</option>
                        <option>Large select</option>
                        <option>Small select</option>
                      </select>
                        </div>
                      </Col>
                      <Col md={6}>
                        <div className="mb-3">
                          <Label htmlFor="formrow-password-Input">Work Item</Label>
                          <select className="form-control" value={workItem} onChange={(e)=>setWorkItem(e.target.value)}>
                        <option>Select</option>
                        <option>Large select</option>
                        <option>Small select</option>
                      </select>
                        </div>
                      </Col>
                    </Row>

                    <Row>
                      <Col lg={4}>
                      <label
                      htmlFor="example-date-input"
                      className="col-md-2 col-form-label"
                    >
                      Date
                    </label>
                    <div className="col-md-10">
                      <input
                        className="form-control"
                        type="date"
                        defaultValue="2019-08-19"
                        id="example-date-input"
                        value={timesheetDate}
                        onChange={(e)=>setTimesheetDate(e.target.value)}
                      />
                    </div>
                      </Col>
                      <Col lg={4}>
                      <label
                      htmlFor="example-time-input"
                      className="col-md col-form-label"
                    >
                     Start Time
                    </label>
                    <div className="col-md-10">
                      <input
                        className="form-control"
                        type="time"
                        defaultValue="13:45:00"
                        id="example-time-input"
                        value={startTime} onChange={(e)=>setStartTime(e.target.value)}
                      />
                    </div>
                      </Col>

                      <Col lg={4}>
                      <label
                      htmlFor="example-time-input"
                      className="col-md col-form-label"
                    >
                      End Time
                    </label>
                    <div className="col-md-10">
                      <input
                        className="form-control"
                        type="time"
                        defaultValue="13:45:00"
                        id="example-time-input"
                        value={endTime}
                        onChange={(e)=>setEndTime(e.target.value)}
                      />
                    </div>
                      </Col>
                    </Row>
                    <div className="mb-3">
                    </div>
                    <div className="mb-3">
                      <Label htmlFor="formrow-firstname-Input">Description</Label>
                      <Input
                        type="text"
                        className="form-control"
                        id="formrow-firstname-Input"
                        placeholder="Enter Your Description"
                        value={description}
                        onChange={(e)=>setDescription(e.target.value)}
                      />
                    </div>
                    <div
                          className="form-check form-switch form-switch-md mb-3"

                        >
                          <input
                            type="checkbox"
                            className="form-check-input"
                            id="customSwitchsizemd"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="customSwitchsizemd"
                          >
                            Billable Status
                          </label>
                        </div>
                  </Form>
        </ModalBody>
        <ModalFooter>
          <Button type="button" color="secondary" onClick={toggle}>
            Close
          </Button>
        </ModalFooter>
      </div>
    </Modal>
  )
}

MytimesheetModal.propTypes = {
  toggle: PropTypes.func,
  isOpen: PropTypes.bool,
}

export default MytimesheetModal
