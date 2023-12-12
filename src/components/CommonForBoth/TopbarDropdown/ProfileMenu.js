import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import Cookies from "js-cookie";
//i18n
import { withTranslation } from "react-i18next";
// Redux
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import withRouter from "components/Common/withRouter";

// users
import user1 from "../../../assets/images/users/deepak.jpg";

// Firebase
import {auth} from "firebase-config"
import {signOut} from 'firebase/auth'

const ProfileMenu = props => {
  // Declare a new state variable, which we'll call "menu"
  const [menu, setMenu] = useState(false);

  const [username, setusername] = useState(Cookies.get('name'));

  useEffect(() => {
    if (localStorage.getItem("authUser")) {
      if (process.env.REACT_APP_DEFAULTAUTH === "firebase") {
        const obj = JSON.parse(localStorage.getItem("authUser"));
        setusername(obj.displayName);
      }  {
        const obj = JSON.parse(localStorage.getItem("authUser"));
        setusername(obj.username);
      }
    }
  }, [props.success]);

  const nav=useNavigate()
  const handleSignOut=()=>{
    signOut(auth).then(()=>{
      sessionStorage.removeItem('uid');
      nav('/login')
  }).catch((err)=> console.log(err.message))
  }
  

  return (
    <React.Fragment>
      <Dropdown
        isOpen={menu}
        toggle={() => setMenu(!menu)}
        className="d-inline-block"
      >
        <DropdownToggle
          className="btn header-item "
          id="page-header-user-dropdown"
          tag="button"
        >
          <img
            className="rounded-circle header-profile-user"
            src={user1}
            alt="Header Avatar"
          />
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
