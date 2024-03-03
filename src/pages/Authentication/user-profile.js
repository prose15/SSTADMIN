import React, { useState, useEffect, useRef } from "react";
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
import {getDownloadURL,ref,uploadBytes,deleteObject} from 'firebase/storage'
import ImageCropper from "pages/Modal/ImageCropper";
const UserProfile = () => {
  const {url,setProfileModal} = useStateContext()
const [photo,setPhoto]=useState(null)
const [img,setImg]=useState(null)
const [success,setSuccess]=useState(null)
const [alertBox,setAlertBox]=useState('d-none')
const [username,setusername]=useState('')

  async function upload(file,user){
    const fileRef=ref(storage,'users/'+user+'.jpg');
     await uploadBytes(fileRef,file).then(()=>{
      setDisplay('d-none')
      setSuccess('Profile updated successfully! Please refresh to view the update')
      setAlertBox('d-block')
      setTimeout(()=>setAlertBox('d-none'),5000)
    }).catch((err)=>{
      console.log(err);
    })
  }
const deleteProfile=()=>{
const desertRef = ref(storage, `users/${JSON.parse(sessionStorage.getItem('uid'))}.jpg`);
deleteObject(desertRef).then(() => {
  setSuccess('Profile updated successfully! Please refresh to view the update')
  setAlertBox('d-block')
  setTimeout(()=>setAlertBox('d-none'),5000)
}).catch((error) => {
  console.log(error)
});
}
const previewCanvasRef=useRef()
  const dispatch = useDispatch();
  const [display,setDisplay]=useState('d-none')
  const [name, setname] = useState();
  const [idx, setidx] = useState(1);
    
const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      username: '',
      idx:  '',
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Please Enter Your UserName"),
    }),
    onSubmit: (values) => {
      localStorage.setItem('authuser',JSON.stringify(values.username))
      setSuccess('Please click again to view updated username')
      setAlertBox('d-block')
      setTimeout(()=>setAlertBox('d-none'),4000)
    }
  });

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Row>
            <Col lg="12">
              {
                success && (<Alert className={alertBox} color="success">{success}</Alert>)
              }
              <ImageCropper url={img} previewCanvasRef={previewCanvasRef} setPhoto={setPhoto} />
              <Card>
                <CardBody>
                  <div className="d-flex">

                    <div className="ms-3">
                      {url?(<img className="rounded-circle " src={url}  height={100} width={100} />):(<NoProfile name={username} />)}
                    </div>
                    <Label htmlFor="formFile" for="file" className="form-label" ><i className="bx bx-pencil" onClick={()=>{
                      setProfileModal(true)
                      setDisplay('d-block')
                      }}></i></Label>
                          <Input className="form-control d-none" type="file" id="formFile" accept="image/*" onChange={(e)=>{
                            if(e.target.files &&  e.target.files[0]){
                              setPhoto(e.target.files[0])
                              setImg(URL.createObjectURL(e.target.files[0]))
                            }
                          }} />
                         
                    <div className="ms-3 flex-grow-1 align-self-center">
                      <div className="text-muted">
                        <h5 className="text-dark"><b>{Cookies.get('name')}</b></h5>
                        <p className="mb-1">{Cookies.get('team')}</p>
                        <p className="mb-0">{(Cookies.get('level')==='k')?('L4'):(Cookies.get('level'))}</p>
                      </div>
                    </div>
                    <div className={"d-flex align-items-center"}>
                      <div className={display}>
                        {
                          photo && (<Button color="primary" className="me-2" onClick={()=>upload(photo,JSON.parse(sessionStorage.getItem('uid')))}><i className=" dripicons-upload " /></Button>)
                        }
                      
                      </div>
                      <div >
                        {
                          url && ( <Button color="primary" onClick={()=>deleteProfile()} ><i className=" dripicons-trash "  /></Button>)
                        }
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
                  <Input name="idx" value={idx} type="hidden" />
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
