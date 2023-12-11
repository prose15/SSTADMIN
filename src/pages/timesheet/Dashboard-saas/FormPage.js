import React,{useState} from 'react'
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
  } from "reactstrap"
  
//   import { LocalizationProvider } from '@mui/x-date-pickers'
// import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs"
// import { DatePicker } from '@mui/x-date-pickers/DatePicker'
// import { LocalizationProvider } from '@mui/x-date-pickers';
const FormPage = () => {
  const [projectName,setProjectName]=useState('');
    const [serviceName,setServiceName]=useState('');
    const [costCenter,setCostCenter]=useState('');
    const [workItem,setWorkItem]=useState('');
    const [timesheetDate,setTimesheetDate]=useState('');
    const [startTime,setStartTime]=useState('');
    const [endTime,setEndTime]=useState('');
    const [billableStatus,setBillableStatus]=useState(false);
    const [description,setDescription]=useState('');
  return (
    <Container className=' pt-5 mt-5' >
    <Card className='mt-5 w-75  mx-auto'>
                <CardBody>
                  <CardTitle className="mb-4">Log Your Work!</CardTitle>

                  <Form>
                  <Row>
                      <Col md={6}>
                        <div className="mb-3">
                          <Label htmlFor="formrow-email-Input">Service</Label>
                          <select className="form-control" value={serviceName} onChange={(e)=>setServiceName(e.target.value)}>
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
                    <div>
                      <button type="submit" className="btn btn-primary w-md">
                        Save
                      </button>
                    </div>
                  </Form>
                </CardBody>
              </Card>
              </Container>
  )
}

export default FormPage