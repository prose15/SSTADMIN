import React, { useEffect } from "react";
import PropTypes from "prop-types";
import withRouter from "components/Common/withRouter";
import { logoutUser } from "../../store/actions";

//redux
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

// Firebase
import {auth} from "firebase-config"
import {signOut} from 'firebase/auth'

const Logout = () => {
  const nav = useNavigate();
  signOut(auth).then(()=>{
    localStorage.removeItem('uid');
    nav('/login')
}).catch((err)=> console.log(err.message))
  
  return <></>;
};

export default Logout;