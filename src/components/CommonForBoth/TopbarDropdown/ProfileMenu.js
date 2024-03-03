import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import Cookies from "js-cookie";
import { useStateContext } from 'Context/ContextProvider';
//i18n
import { withTranslation } from "react-i18next";
// Redux
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import withRouter from "components/Common/withRouter";

// Firebase
import {auth} from "firebase-config"
import {signOut} from 'firebase/auth'

const ProfileMenu = props => {
  // Declare a new state variable, which we'll call "menu"
  const [menu, setMenu] = useState(false);
  const {url}=useStateContext();
  const [username, setusername] = useState(Cookies.get('name'));
  const userName=(name)=>{
    const firstLetter=name.split('')
    return firstLetter[0]
}

  useEffect(() => {
    if (localStorage.getItem("authuser")) {
        const obj = JSON.parse(localStorage.getItem("authuser"));
        setusername(obj);
      
    }else{
      setusername(Cookies.get('name'))
    }
  }, [localStorage.getItem("authuser")]);

  const nav=useNavigate()
  const handleSignOut=()=>{
    signOut(auth).then(()=>{
      sessionStorage.removeItem('uid');
      nav('/login')
  }).catch((err)=> console.log(err.message))
  }
const letter = userName(username)
  return (
    <React.Fragment>
      <Dropdown
        isOpen={menu}
        toggle={() => setMenu(!menu)}
        className="d-inline-block"
      >
        <DropdownToggle
          className="btn header-item d-flex  align-items-center"
          id="page-header-user-dropdown "
          tag="button"
        >
          {
            (url)?(<img
              className="rounded-circle header-profile-user"
              src={url}
              alt="Header Avatar"
            />):(
              <span  className='avatar-title  rounded-circle   bg-primary-subtle text-primary p-3 ' style={{width:'20px',height:'20px'}}>
                {letter}
              </span>
              
            )
          }
          
          <span className="d-none d-xl-inline-block ms-2 me-1">{username}</span>
          <i className="mdi mdi-chevron-down d-none d-xl-inline-block" />
        </DropdownToggle>
        <DropdownMenu className="dropdown-menu-end">
          <DropdownItem tag="a" href="/profile">
            {" "}
            <i className="bx bx-user font-size-16 align-middle me-1" />
            {props.t("Profile")}{" "}
          </DropdownItem>
          <div className="dropdown-divider" />
          <div to="/logout" className="dropdown-item" onClick={()=>handleSignOut()}>
            <i className="bx bx-power-off font-size-16 align-middle me-1 text-danger" />
            <span >{props.t("Logout")}</span>
          </div>
        </DropdownMenu>
      </Dropdown>
    </React.Fragment>
  );
};

ProfileMenu.propTypes = {
  success: PropTypes.any,
  t: PropTypes.any
};

const mapStatetoProps = state => {
  const { error, success } = state.Profile;
  return { error, success };
};

export default withRouter(
  connect(mapStatetoProps, {})(withTranslation()(ProfileMenu))
);
