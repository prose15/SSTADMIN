import PropTypes from "prop-types";
import React, { useState } from "react";
import { Row, Col, Alert, Card, CardBody, Container, FormFeedback, Input, Label, Form } from "reactstrap";

//redux
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import withRouter from "components/Common/withRouter";

// Formik Validation
import * as Yup from "yup";
import { useFormik } from "formik";

import {confirmPasswordReset} from 'firebase/auth'

// import images
import logo from "../../assets/images/logosm.png";
import { auth } from "firebase-config";


const ResetPassword = props => {
function useQuery(){
    const location= useLocation()
    return new URLSearchParams(location.search)
}
const nav = useNavigate()
const [show, setShow] = useState(false);
const [show2,setShow2]= useState(false)
const [err,setErr]=useState('')
const query=useQuery()
const  initialValues= {
  password: '',
  confirmpassword:'',
}
const schema = Yup.object({
  password: Yup.string().required("Please Enter Your Password"),
  confirmpassword: Yup.string().required("Please Confirm Your Password"),
})
  const { values, handleBlur, handleChange, handleSubmit, errors, touched } = useFormik({
   initialValues: initialValues,
   validationSchema: schema,
    onSubmit: (values) => {
      if(values.password===values.confirmpassword){
        confirmPasswordReset(auth,query.get('oobCode'),values.password).then(()=>{
          setSuccessMsg(true)
          setTimeout(()=>nav('/'),5000)
        }).catch((err)=>{
            console.log(err.code);
        })
      }else{
         setErr("Password doesn't match")
      } 
    }
  });


  // const selectForgotPasswordState = (state) => state.ForgetPassword;
  //   const ForgotPasswordProperties = createSelector(
  //     selectForgotPasswordState,
  //       (forgetPassword) => ({
  //         forgetError: forgetPassword.forgetError,
  //         forgetSuccessMsg: forgetPassword.forgetSuccessMsg,
  //       })
  //   );

  //   const {
  //     forgetError,
  //     forgetSuccessMsg
  // } = useSelector(ForgotPasswordProperties);   
  
 
    
  const [successMsg,setSuccessMsg]=useState(false) 
  

  return (
    <React.Fragment>
      <div className="home-btn d-none d-sm-block">
        <Link to="/dashboard" className="text-dark">
          <i className="bx bx-home h2" />
        </Link>
      </div>
      <div className="account-pages my-5 pt-sm-5">
        <Container>
          <Row className="justify-content-center">
            <Col md={8} lg={6} xl={5}>
              <Card className="overflow-hidden">
                <div className="bg-primary-subtle">
                  <Row>
                    <Col xs={7}>
                      <div className="text-primary p-4">
                        <h5 className="text-primary">Change Password!</h5>
                        <p>Get your new password here</p>
                      </div>
                    </Col>
                    {/* <Col className="col-5 align-self-end">
                      <img src={profile} alt="" className="img-fluid" />
                    </Col> */}
                  </Row>
                </div>
                <CardBody className="pt-0">
                  <div>
                    <Link to="/">
                      <div className="avatar-md profile-user-wid mb-4">
                        <span className="avatar-title rounded-circle bg-light">
                          <img
                            src={logo}
                            alt=""
                            className=""
                            height="34"
                          />
                        </span>
                      </div>
                    </Link>
                  </div>
                  <div className="p-2">
                    {/* {forgetError && forgetError ? (
                      <Alert color="danger" style={{ marginTop: "13px" }}>
                        {forgetError}
                      </Alert>
                    ) : null} */}
                    {successMsg ? (
                      <Alert color="success" style={{ marginTop: "13px" }}>
                        {"Your password has changed. Please login again!"}
                      </Alert>
                    ) : null}
                    <Form
                      className="form-horizontal"
                      onSubmit={(e) => {
                        e.preventDefault();
                        handleSubmit();
                        return false;
                      }}
                    >
                      <div className="mb-3">
                        <Label className="form-label">New Password</Label>
                        <div className="input-group auth-pass-inputgroup ">
                        <Input
                          name="password"
                          className="form-control"
                          placeholder="Enter new password"
                          type={show ? "text" : "password"}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.password}
                          // invalid={
                          //   validation.touched.password && validation.errors.password ? true : false
                          // }
                        />
                        <button onClick={() => setShow(!show)} className="btn btn-light" type="button" id="password-addon">
                            <i className="mdi mdi-eye-outline"></i></button>
                            </div>
                        {/* {touched.password && errors.password ? (
                          <FormFeedback type="invalid">{errors.password}</FormFeedback>
                        ) : null} */}
                      </div>
                      <div className="mb-3">
                        <Label className="form-label">Confirm Password</Label>
                        <div className="input-group auth-pass-inputgroup ">
                        <Input
                          name="confirmpassword"
                          className="form-control"
                          placeholder="Enter new password"
                          type={show2 ? "text" : "password"}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.confirmpassword}
                          // invalid={
                          //   validation.touched.confirmpassword && validation.errors.confirmpassword ? true : false
                          // }
                        />
                        <button onClick={() => setShow2(!show2)} className="btn btn-light" type="button" id="password-addon">
                            <i className="mdi mdi-eye-outline"></i></button>
                            </div>
                        {/* {validation.touched.confirmpassword && validation.errors.confirmpassword ? (
                          <FormFeedback type="invalid">{validation.errors.confirmpassword}</FormFeedback>
                        ) : null} */}
                      </div>
                      <Row className="mb-3">
                      <p className="text-danger text-center">{err}</p>
                        <Col className="text-end">
                          <button
                            className="btn btn-primary w-md "
                            type="submit"
                          >
                            Confirm
                          </button>
                        </Col>
                        
                      </Row>
                    </Form>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};
ResetPassword.propTypes = {
  history: PropTypes.object,
};

export default withRouter(ResetPassword);