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
const query=useQuery()
  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      password: '',
    },
    validationSchema: Yup.object({
      password: Yup.string().required("Please Enter Your Password"),
    }),
    onSubmit: (values) => {
      confirmPasswordReset(auth,query.get('oobCode'),values.password).then(()=>{
        console.log('password reset done')
        setSuccessMsg(true)
        setTimeout(()=>nav('/'),5000)
      }).catch((err)=>{
          console.log(err.code);
      })
    }
  });


  const selectForgotPasswordState = (state) => state.ForgetPassword;
    const ForgotPasswordProperties = createSelector(
      selectForgotPasswordState,
        (forgetPassword) => ({
          forgetError: forgetPassword.forgetError,
          forgetSuccessMsg: forgetPassword.forgetSuccessMsg,
        })
    );

    const {
      forgetError,
      forgetSuccessMsg
  } = useSelector(ForgotPasswordProperties);   
  
 
    
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
                    {forgetError && forgetError ? (
                      <Alert color="danger" style={{ marginTop: "13px" }}>
                        {forgetError}
                      </Alert>
                    ) : null}
                    {successMsg ? (
                      <Alert color="success" style={{ marginTop: "13px" }}>
                        {"Your password has changed. Please login again!"}
                      </Alert>
                    ) : null}
                    <Form
                      className="form-horizontal"
                      onSubmit={(e) => {
                        e.preventDefault();
                        validation.handleSubmit();
                        return false;
                      }}
                    >
                      <div className="mb-3">
                        <Label className="form-label">Password</Label>
                        <Input
                          name="password"
                          className="form-control"
                          placeholder="Enter new password"
                          type="password"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.password || ""}
                          invalid={
                            validation.touched.password && validation.errors.password ? true : false
                          }
                        />
                        {validation.touched.password && validation.errors.password ? (
                          <FormFeedback type="invalid">{validation.errors.password}</FormFeedback>
                        ) : null}
                      </div>
                      <Row className="mb-3">
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