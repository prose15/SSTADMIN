import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Alert,
  CardBody,
  Button,
  Label,
  Input,
  FormFeedback,
  Form,
} from "reactstrap";
import NoProfile from "./NoProfile";
// Formik Validation
import * as Yup from "yup";
import { useFormik } from "formik";
import ProfileLayouts from "pages/Forms/ProfileLayout";
import { useStateContext } from "Context/ContextProvider";
//redux
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";
import withRouter from "components/Common/withRouter";
// actions
import { editProfile, resetProfileFlag } from "../../store/actions";
import Cookies from "js-cookie";
import { storage } from "firebase-config";
import {getDownloadURL,ref,uploadBytes} from 'firebase/storage'
const UserProfile = () => {
  const {url} = useStateContext()
  // const [url,setUrl]=useState('')
const [photo,setPhoto]=useState(null)
  async function upload(file,user){
    const fileRef=ref(storage,'users/'+user+'.jpg');
     await uploadBytes(fileRef,file).then(()=>{
      setDisplay('d-none')
      console.log('uploaded');
    }).catch((err)=>{
      console.log(err);
    })
  }
  const dispatch = useDispatch();
  const [email, setemail] = useState();
  const [display,setDisplay]=useState('d-none')
  const [name, setname] = useState();
  const [idx, setidx] = useState(1);
  const selectProfileState = (state) => state.Profile;
    const ProfileProperties = createSelector(
      selectProfileState,
        (profile) => ({
          error: profile.error,
          success: profile.success,
        })
    );

    const {
      error,
      success
  } = useSelector(ProfileProperties);

  useEffect(() => {
    if (localStorage.getItem("authUser")) {
      const obj = JSON.parse(localStorage.getItem("authUser"));
      if (process.env.REACT_APP_DEFAULTAUTH === "firebase") {
        setname(obj.displayName);
        setemail(obj.email);
        setidx(obj.uid);
      } else if (
        process.env.REACT_APP_DEFAULTAUTH === "fake" ||
        process.env.REACT_APP_DEFAULTAUTH === "jwt"
      ) {
        setname(obj.username);
        setemail(obj.email);
        setidx(obj.uid);
      }
      setTimeout(() => {
        dispatch(resetProfileFlag());
      }, 3000);
    }
  }, [dispatch, success]);


const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      username: name || '',
      idx: idx || '',
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Please Enter Your UserName"),
    }),
    onSubmit: (values) => {
      dispatch(editProfile(values));
    }
  });


// console.log(url);
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Row>
            <Col lg="12">
              {error && error ? <Alert color="danger">{error}</Alert> : null}
              {success ? <Alert color="success">{success}</Alert> : null}
              
              <Card>
                <CardBody>
                  <div className="d-flex">

                    <div className="ms-3">
                  
                      {url?(<img className="rounded-circle " src={url}  height={100} width={100}/>):(<NoProfile />)}
                    </div>
                    <Label htmlFor="formFile" for="file" className="form-label" ><i className="bx bx-pencil" onClick={()=>setDisplay('d-block')}></i></Label>
                          <Input className="form-control d-none" type="file" id="formFile" onChange={(e)=>{
                            if(e.target.files[0]){
                              setPhoto(e.target.files[0])
                             
                            }
                          }} />
                         
                    <div className="ms-3 flex-grow-1 align-self-center">
                      <div className="text-muted">
                        <h5 className="text-dark"><b>{name}</b></h5>
                        <p className="mb-1">{Cookies.get('email')}</p>
                        <p className="mb-0">{Cookies.get('team')}</p>
                      </div>
                    </div>
                    <div className={"d-flex align-items-center"}>
                      <div className={display}>
                      <Button className="btn bg-primary"  onClick={()=>upload(photo,JSON.parse(sessionStorage.getItem('uid')))}>Upload</Button>
                      </div>
                    
                    </div>
                    

                  </div>
                </CardBody>
              </Card>

              
            </Col>
          </Row>
          
         
          <Row>

          <Col sm="7">
          <ProfileLayouts/>
          </Col>

          <Col sm="5">
          <h4 className="card-title mb-4">Change User Name</h4>
          <Card>
            <CardBody>
              <Form
                className="form-horizontal"
                onSubmit={(e) => {
                  e.preventDefault();
                  validation.handleSubmit();
                  return false;
                }}
              >
                <div className="form-group">
                  <Label className="form-label">User Name</Label>
                  <Input
                    name="username"
                    // value={name}
                    className="form-control"
                    placeholder="Enter User Name"
                    type="text"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.username || ""}
                    invalid={
                      validation.touched.username && validation.errors.username ? true : false
                    }
                  />
                  {validation.touched.username && validation.errors.username ? (
                    <FormFeedback type="invalid">{validation.errors.username}</FormFeedback>
                  ) : null}
                  <Input na
                  me="idx" value={idx} type="hidden" />
                </div>
                <div className="text-center mt-4">
                  <Button type="submit" color="primary">
                    Update User Name
                  </Button>
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
};

export default withRouter(UserProfile);
