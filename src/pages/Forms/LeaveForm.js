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
} from "reactstrap";
//Import Flatepicker
import "flatpickr/dist/themes/material_blue.css";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import * as Yup from "yup";
import { useFormik } from "formik";
import { db } from "firebase-config";
import { collection,addDoc, Timestamp, } from "firebase/firestore";
import Cookies from 'js-cookie';







const LeaveForm = props => {
  const team = Cookies.get('team');
    const name = Cookies.get('name')
    const email=Cookies.get('email');
    let reportingManager=''
    const nav = useNavigate()
    const [addDetails, setNewDetails] = useState( [])
  // const [eventCategory,setEventCategory] = useState('')
  // const [reason,setReason]= useState('')
  const [fromDate,setFromDate] = useState('')
  const [toDate,setToDate] = useState('')
  const initialValues = {
    leaveType:"casual leave",
    reportingManager:"Keerthana",
    fromDate:fromDate,
    toDate:toDate,
    reason:"",
  }
  const schema = Yup.object({
    // Define your fields
    reason: Yup.string().min(3).required("Please Enter Your reason"),
    fromDate: Yup.date().min(new Date(),"set a valid date")
    .required('This field is required'),
    toDate: Yup.date().required('This field is required').min(Yup.ref('fromDate'),"end date can't be before start date"),
  });
  // const [addDetails,setNewDetails]=useState([])


  const {values,handleBlur,handleChange,handleSubmit,errors}= useFormik({
    initialValues:initialValues,
    validationSchema: schema,
    onSubmit:(values) =>{
                const startDate = new Date(values.fromDate)
                const endDate = new Date(values.toDate)
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
      const newDetails={name:name,email:email,team:team,reason:values.reason, leaveType:values.leaveType, reportManager: values.reportingManager, from: values.fromDate, to: values.toDate, requestDate: new Date().getFullYear()+"-"+new Date().getMonth()+"-"+new Date().getDate(),status:'pending',L1status:'',L2status:'',L3status:'',casualAvailable:12,earnedAvailable:12,lopAvailable:0,paternityAvailable:0,sickAvailable:12,displayStatus:'',msgCount:'',noofdays:dates.length-holidays.length,timestamp:Timestamp.now()}
      const newData = [...addDetails, details];
          setNewDetails(newData)
      
              addDoc(collection(db,'leave submssion'),newDetails).then(()=>{
                  console.log("message added successfully");
                  localStorage.setItem('type',newDetails.leaveType)
                  setTimeout(()=>{nav('/leavetracker')},2000)
              })
                
          .catch((err) => {
              console.log(err.message);
              })
                }
      
    }  
  });

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

    // const [formValues, setFormValues] = useState({
    //   leaveType: "",
    //   fromDate: "",
    //   toDate: "",
    // });
  
  // const [errors, setErrors] = useState({});
  // useEffect(() => {
  //   const validateForm = async () => {
  //     try {
  //       await schema.validate(formValues);
  //       setErrors({}); // No errors
  //     } catch (err) {
  //       setErrors(err.inner.reduce((acc, error) => {
  //         acc[error.path] = error.message;
  //         return acc;
  //       }, {}));
  //     }
  //   };
  //   validateForm();
  // }, [formValues]);
  // const handleChange = (event) => {
  //   const { name, value } = event.target;
  //   setFormValues({ ...formValues, [name]: value });
  // };

  
  
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          <Breadcrumbs title="Forms" breadcrumbItem="Leave Application" />
          <Row>
            <Col>
              <Card>
                <CardBody>
                  <CardTitle className="mb-4">Submit Your Application!</CardTitle>
                  <Form onSubmit={handleSubmit}>
                    <Row>
                      <Col md={6}>
                        <div className="mb-3">
                        <Label htmlFor="formrow-email-Input">Leave type</Label>
                          <select className="form-select"
                          name="leaveType"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.leaveType}
                          >
                            <option defaultValue='Casual leave'>Casual leave</option>
                            <option value="Sick leave">Sick leave</option>
                            <option value="Paternity leave">Paternity leave</option>
                            <option value="Earned leave">Earned leave</option>
                            <option value="Leave without pay">Leave without pay</option>
                            
                          </select>
                          {/* {errors.leaveType && <p>{errors.leaveType}</p>} */}
                        </div>
                      </Col>
                      <Col md={6}>
                        <div className="mb-3">
                          <Label htmlFor="formrow-email-Input">Reporting Manager</Label>
                          <Input
                            name="keerthana"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.reportingManager}
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
                            className= {errors.fromDate ? "  border-danger form-control" : "form-control"}
                            id="formrow-email-Input"
                            name="fromDate"
                            placeholder="Enter Your Email ID"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.fromDate}
                          />
                           {errors.fromDate && <small className="text-danger">
                            {errors.fromDate}</small>}
                        </div>
                       
                      </Col>
                      <Col md={6}>
                        <div className="mb-3">
                          <Label htmlFor="formrow-password-Input">End Date</Label>
                          <Input
                            type="date"
                            className= {errors.toDate ? "  border-danger form-control" : "form-control"}
                            autoComplete="off"
                            id="formrow-password-Input"
                            name="toDate"
                            // placeholder="Enter Your Password"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.toDate}
                          />
                           {errors.toDate && <small className="text-danger">
                            {errors.toDate}</small>}
                        </div>
                        
                      </Col>
                    </Row>
                    <div className="mt-3">
                    <Label>Reason</Label>
                    <Input
                      type="textarea"
                      id="reason"
                      className= {errors.reason ? "  border-danger form-control" : "form-control"}
                      name="reason"
                      maxLength="225"
                      rows="3"
                      placeholder="Don't exists 250 words..."
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.reason}
                    />
                  </div>
                  {errors.reason && <small className="text-danger m-0">{errors.reason}</small>}
                  <div>
                      <button type="submit" className="btn btn-primary w-md mt-5" 
                      // onClick={(e)=>handlesubmit(e)}
                      >Submit</button>
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