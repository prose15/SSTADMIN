import React,{useEffect, useState} from 'react'
import FormPage from '../FormPage';
import {
    Input,
    Row,
    Col,
    Label,
    Modal,
  } from "reactstrap";
  import { db } from 'firebase-config';
  import { doc,getDoc,updateDoc } from 'firebase/firestore';
const EditModal = ({id}) => {
  const [projectName,setProjectName]=useState('');
  const [serviceName,setServiceName]=useState('');
  const [costCenter,setCostCenter]=useState('');
  const [workItem,setWorkItem]=useState('');
  const [timesheetDate,setTimesheetDate]=useState('');
  const [startTime,setStartTime]=useState('');
  const [endTime,setEndTime]=useState('');
  const [billableStatus,setBillableStatus]=useState('');
  const [description,setDescription]=useState('');
  const [date,setDate] = useState('')
  const [toggle,setToggle] = useState(false)
  useEffect(()=>{
    const handleGet=async()=>{
      const docRef = doc(db, "Timesheet", id);
      const docSnap = await getDoc(docRef)
      if(docSnap.exists()){
        setProjectName(docSnap.data().projectName)
        setServiceName(docSnap.data().serviceName)
        setWorkItem(docSnap.data().workItem)
        setCostCenter(docSnap.data().costCenter)
        setTimesheetDate(docSnap.data().timesheetDate)
        setStartTime(docSnap.data().startTime)
        setEndTime(docSnap.data().endTime)
        setBillableStatus(docSnap.data().billableStatus)
        setDescription(docSnap.data().description)
        setDate(docSnap.data().timesheetDate)
        billableStatus==='Billable'? setToggle(true):setToggle(false)
      }
    }
    handleGet()
  },[])
  console.log(billableStatus);
 
  console.log(toggle);
  // (billableStatus==='Billable')?(setToggle(true)):(setToggle(false))
  let billable=''
  if(toggle){
    billable="Billable"
  }
  else{
      billable="Non-Billable"
  }
  const handleUpdate=async()=>{
    

    const docRef=doc(db,'Timesheet',id)
    const data={serviceName:serviceName,projectName:projectName,startTime:startTime,endTime:endTime,timesheetDate:date,workItem:workItem,costCenter:costCenter,billableStatus:billableStatus,description:description}
    await updateDoc(docRef,data).then(()=>{
      tog_standard()
      setId('')
    }).catch((err)=>{
      console.log(err);
    })
  }
    const [modal_standard, setmodal_standard] = useState(false);
 
    function tog_standard() {
        setmodal_standard(!modal_standard);
        removeBodyCss();
      }
      function removeBodyCss() {
        document.body.classList.add("no_padding");
      }
  return (
    <React.Fragment>
         <i className='mdi mdi-pencil-outline ms-2'onClick={() => {
            tog_standard();
          }}></i>
        <Modal
          isOpen={modal_standard}
          toggle={() => {
            tog_standard();
          }}
        >
          <div className="modal-header">
            <h5 className="modal-title mt-0" id="myModalLabel">
              Edit Timesheet
            </h5>
            <button
              type="button"
              onClick={() => {
                setmodal_standard(false);
              }}
              className="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          
          <div className="modal-body">
          <Row>
                      <Col md={6}>
          <div className="mb-3">
                          <Label htmlFor="formrow-email-Input">Service</Label>
                          <input className="form-control" type='text' value={serviceName} onChange={(e)=>setServiceName(e.target.value)} />
                        </div>
                      </Col>
                      <Col md={6}>
                        <div className="mb-3">
                          <Label htmlFor="formrow-password-Input">Project</Label>
                          <input className="form-control" type='text' value={projectName} onChange={(e)=>setProjectName(e.target.value)} />
                        </div>
                      </Col>
                    </Row>

                    <Row>
                      <Col md={6}>
                        <div className="mb-3">
                          <Label htmlFor="formrow-email-Input">Cost Center</Label>
                          <input className="form-control" type='text' value={costCenter} onChange={(e)=>setCostCenter(e.target.value)} />
                        </div>
                      </Col>
                      <Col md={6}>
                        <div className="mb-3">
                          <Label htmlFor="formrow-password-Input">Work Item</Label>
                          <input className="form-control" type='text' value={workItem} onChange={(e)=>setWorkItem(e.target.value)} />
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
                    
                    <div className="mb-3 mt-3">
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
                            checked={toggle}
                            onChange={(e)=>setToggle(e.target.checked)}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="customSwitchsizemd"
                          >
                            Billable Status
                          </label>
                        </div>
                   
                 </div>       
     
          <div className="modal-footer">
            <button
              type="button"
              onClick={() => {
                tog_standard();
              }}
              className="btn btn-secondary "
              data-dismiss="modal"
            >
              Close
            </button>
            <button
              type="submit"
              className="btn btn-primary "
              onClick={()=>handleUpdate()}
            >
              Save changes
            </button>
          </div>
        </Modal>
    
  </React.Fragment>
  )
}

export default EditModal