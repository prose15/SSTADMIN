import React,{useState , useEffect} from "react";
import { useNavigate } from "react-router-dom";
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
  Alert,
} from "reactstrap";
//Import Flatepicker
import "flatpickr/dist/themes/material_blue.css";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import * as yup from 'yup'
import { db } from "firebase-config";
import { collection,addDoc, Timestamp, } from "firebase/firestore";
import Cookies from 'js-cookie'

const LeaveForm = props => {
  const team = Cookies.get('team');
    const name = Cookies.get('name')
    const email=Cookies.get('email');
    let reportingManager=''
    const nav = useNavigate()
    const [addDetails, setNewDetails] = useState( [])
  const [eventCategory,setEventCategory] = useState('')
  const [reason,setReason]= useState('')
  const [fromDate,setFromDate] = useState(new Date().getDate()+"-"+new Date().getMonth()+"-"+new Date().getFullYear())
  const [toDate,setToDate] = useState(new Date().getDate()+"-"+new Date().getMonth()+"-"+new Date().getFullYear())
  const [alert,setAlert]=useState('d-none')
  let details=[]
  if(team==='Delivery'){
      details=[...details,'Keerthana',"Yuvashini",'Gobi','Krishna kumar']
      reportingManager=details[0]
  }

  else if(team==='Sales'){
     details= [...details,'Keerthana',"Balaji",'Krishna kumar']
     reportingManager=details[0]
  }

  else if(team==='HR'){
      details= [...details,'Keerthana','Gobi','Krishna kumar']
      reportingManager=details[0]
  }

  else if(team==='Product'){
      details= [...details,'Keerthana','Krishna kumar']
      reportingManager=details[0]
  }

  const schema = yup.object().shape({
    // Define your fields
    leaveType: yup.string().required("Leave type is required"),
    fromDate: yup.string().required("Start Date is required"),
    toDate: yup.string().required("End Date is required"),
    // ... other fields
  });
 
    const [formValues, setFormValues] = useState({
      leaveType: "",
      fromDate: "",
      toDate: "",
    });
  
  const [errors, setErrors] = useState({});
  useEffect(() => {
    const validateForm = async () => {
      try {
        await schema.validate(formValues);
        setErrors({}); // No errors
      } catch (err) {
        setErrors(err.inner.reduce((acc, error) => {
          acc[error.path] = error.message;
          return acc;
        }, {}));
      }
    };
    validateForm();
  }, [formValues]);
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };
const handlesubmit = async(e) =>{
  e.preventDefault();
          const startDate = new Date(fromDate)
          const endDate = new Date(toDate)
          if(startDate>endDate){
        console.log('please set date ');
          }
          else{
          
          function getDatesBetweenDates(startDate, endDate) {
            const dates = [];
            for (let date = startDate; date <= endDate; date.setDate(date.getDate() + 1)) {
              dates.push(new Date(date));
            }
            return dates;
          }

          const dates = getDatesBetweenDates(startDate,endDate)
const holidays = dates.filter(date => (date.getDay()==5 || date.getDay()==6) )
const newDetails={name:name,email:email,team:team,reason: reason, leaveType: eventCategory, reportManager: reportingManager, from: fromDate, to: toDate, requestDate: new Date().getDate() + "/" + (new Date().getMonth() + 1) + "/" + new Date().getFullYear(),status:'pending',L1status:'',L2status:'',L3status:'',casualAvailable:12,earnedAvailable:12,lopAvailable:0,paternityAvailable:0,sickAvailable:12,displayStatus:'',msgCount:'',noofdays:dates.length-holidays.length,timestamp:Timestamp.now()}
const newData = [...addDetails, details];
    setNewDetails(newData)

        addDoc(collection(db,'leave submssion'),newDetails).then(()=>{
            console.log("message added successfully");
            setAlert('d-block')
            localStorage.setItem('type',newDetails.leaveType)
            setTimeout(()=>{nav('/leavetracker')},1000)
        })
          
    .catch((err) => {
        console.log(err.message);
        })
          }
} 
  
  
  return (
    <React.Fragment>
      <div className="page-content">
        <Container>
          {/* <Breadcrumbs title="Forms" breadcrumbItem="Leave Application" /> */}
          <Row>
            <Col>
            <Alert color='success' className={alert}>{'Form forwarded to L1 Manager'}</Alert>
              <Card className='mt-5 w-100  mx-auto'>
                <CardBody >
                  <CardTitle className="mb-4">Submit Your Application!</CardTitle>

                  <Form >
                    <Row>
                  <Col md={6}>
                  
                        <div className="mb-3">
                        <Label htmlFor="formrow-email-Input">Leave type</Label>
                          <select className="form-select"
                          value={eventCategory}
                          onChange={(e)=>setEventCategory(e.target.value)}
                          >
                            <option defaultValue='#'>Select Leave Type</option>
                            <option value='Casual leave'>Casual leave</option>
                            <option value="Sick leave">Sick leave</option>
                            <option value="Paternity leave">Paternity leave</option>
                            <option value="Earned leave">Earned leave</option>
                            <option value="Leave without pay">Leave without pay</option>
                            
                          </select>
                          {errors.leaveType && <p>{errors.leaveType}</p>}
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
                            value={fromDate}
                          onChange={(e)=>setFromDate(e.target.value)}
                          />
                          {errors.fromDate && <p>{errors.fromDate}</p>}
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
                            // placeholder="Enter Your Password"
                            value={toDate}
                          onChange={(e)=>setToDate(e.target.value)}
                          />
                          {errors.fromDate && <p>{errors.fromDate}</p>}
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
                      placeholder="Don't exists 250 words..."
                      value={reason}
                      onChange={e =>{
                        setReason(e.target.value)
                      }} 
                    />
                  </div>
                  <div>
                      <button type="submit" className="btn btn-primary w-md mt-5" onClick={(e)=>handlesubmit(e)}>Submit</button>
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

export default LeaveForm;