import PropTypes from 'prop-types';
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { Routes, Route } from "react-router-dom";
import { layoutTypes } from "./constants/layout";
// Import Routes all
import { authProtectedRoutes, publicRoutes } from "./routes";
import logosm from 'assets/images/logosm.png'
// Import all middleware
import Authmiddleware from "./routes/route";

// layouts Format
import VerticalLayout from "./components/VerticalLayout/";
import HorizontalLayout from "./components/HorizontalLayout/";
import NonAuthLayout from "./components/NonAuthLayout";
import { Toast,ToastBody, ToastHeader } from 'reactstrap';
// Import scss
import "./assets/scss/theme.scss";

// Import Firebase Configuration file
// import { initFirebaseBackend } from "./helpers/firebase_helper";

import fakeBackend from "./helpers/AuthType/fakeBackend";
import { requestPermission, messaging} from 'firebase-config';
import { onMessage } from 'firebase/messaging';
// Activating fake backend
fakeBackend();
const getLayout = (layoutType) => {
  let Layout = VerticalLayout;
  switch (layoutType) {
    case layoutTypes.VERTICAL:
      Layout = VerticalLayout;
      break;
    case layoutTypes.HORIZONTAL:
      Layout = HorizontalLayout;
      break;
    default:
      break;
  }
  return Layout;
};

const App = () => {
const [toast,setToast]=useState(false)
const [message,setMessage]=useState(null)
useEffect(()=>{
requestPermission()
onMessage(messaging,payload=>{
  setToast(true)
  setMessage(payload)
})
},[])
  const selectLayoutState = (state) => state.Layout;
  const LayoutProperties = createSelector(
    selectLayoutState,
      (layout) => ({
        layoutType: layout.layoutType,
      })
  );

    const {
      layoutType
  } = useSelector(LayoutProperties);

  const Layout = getLayout(layoutType);

  return (
    <React.Fragment>
      {
        message && 
        <div className="position-fixed top-0 end-0 p-3" style={{ zIndex: "1005" }}>
        <Toast
        isOpen={toast}
        role="alert"
    >
      
        <ToastHeader toggle={() => setToast(!toast)}>
            <img src={logosm} alt="" className="me-2" height="18" />
            <strong className="me-auto">{message.notification.title}</strong>
            {/* <small style={{ marginLeft: "165px" }} className="text-muted">11 mins ago</small> */}
        </ToastHeader>
        <ToastBody>
        {message.notification.body}
        </ToastBody>
    </Toast>
    </div>
      }
      
      <Routes>
        {publicRoutes.map((route, idx) => (
          <Route
            path={route.path}
            element={
              <NonAuthLayout>
                {route.component}
              </NonAuthLayout>
            }
            key={idx}
            exact={true}
          />
        ))}

        {authProtectedRoutes.map((route, idx) => (
          <Route
            path={route.path}
            element={
              <Authmiddleware>
                <Layout>{route.component}</Layout>
              </Authmiddleware>}
            key={idx}
            exact={true}
          />
        ))}
      </Routes>
    </React.Fragment>
  );
};

App.propTypes = {
  layout: PropTypes.any
};

export default App;