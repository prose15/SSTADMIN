import React, { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import { Dropdown, DropdownToggle, DropdownMenu, Row, Col } from "reactstrap";
import SimpleBar from "simplebar-react";
//i18n
import { withTranslation } from "react-i18next";
import { useStateContext } from "Context/ContextProvider";
import { Timestamp } from "firebase/firestore";

const NotificationDropdown = props => {
  const [menu, setMenu] = useState(false);
  const {detail, setDetail} = useStateContext();
  const new_arr = detail.filter((data,index)=>index<=2)
  console.log(new_arr)
const findMin=(data)=>{
  const seconds    = data.timestamp?.seconds
  const nanoseconds = data.timestamp?.nanoseconds
  console.log(seconds,nanoseconds)
  const timestampInMilliseconds = seconds * 1000 + Math.floor(nanoseconds / 1e6);
    const dateObject = new Date(timestampInMilliseconds);
    console.log(dateObject);
    const today =new Date()
    const timeDiff = today - dateObject
    const minsDiff = Math.floor(timeDiff/(1000 * 60))
    return minsDiff
}
 


  const handleClick = () =>{
    setMenu(!menu)
    let element = document.getElementById("detail");
    element.classList.add("visually-hidden")
    let bell = document.getElementById("bell");
    bell.classList.remove("bx-tada")
  } 

  return (
    <React.Fragment>
      <Dropdown
        isOpen={menu}
        toggle={() => setMenu(!menu)}
        className="dropdown d-inline-block"
        tag="li"
      >
        <DropdownToggle
          className="btn header-item noti-icon position-relative"
          tag="button"
          id="page-header-notifications-dropdown"
        >
          <i id="bell" className="bx bx-bell bx-tada" />
          <span id="detail" className="badge bg-danger rounded-pill">{detail.length}</span>
        </DropdownToggle>
        <DropdownMenu className="dropdown-menu dropdown-menu-lg dropdown-menu-end p-0">
          <div className="p-3">
            <Row className="align-items-center">
              <Col>
                <h6 className="m-0"> {props.t("Notifications")} </h6>
              </Col>
            </Row>
          </div>

          <SimpleBar style={{ height: "230px" }}>
          {new_arr.map((data)=> 
          <div key={data.id} className="text-reset notification-item">
            <div  className="d-flex">
                <div className="avatar-xs me-3">
                  
                  {data.status === "accept" ? (<span className="avatar-title bg-success rounded-circle font-size-13"><i className="fas fa-check"/>
                  </span>) : (<span className="avatar-title bg-danger rounded-circle font-size-13">
                    <i className="fas fa-times bg-danger"/></span>)}
                  
                </div>
                <div className="flex-grow-1">
                  <h6 className="mt-0 mb-1">
                    {data.reason}
                  </h6>
                  <div className="font-size-12 text-muted">
                    <p className="mb-1">
                     {data.status === "accept" ? (<p>Your leave has been approved</p>) : (<p>Your leave has been rejected</p>)}
                    </p>
                    <p className="mb-0">
                      <i className="mdi mdi-clock-outline" />
                        {findMin(data)} mins
                    
                    </p>
                  </div>
                </div>
            </div>
          </div>)}
         
          </SimpleBar>

          <div className="p-2 border-top d-grid"
         >
            <Link to="/leave/approvals"
            onClick={handleClick}
            className="btn btn-sm btn-link font-size-14 text-center">
              <i className="mdi mdi-arrow-right-circle me-1" 
              ></i> <span
              key="t-view-more"
              
              >{props.t("View All..")}</span>
            </Link>
          </div>
        </DropdownMenu>
      </Dropdown>
    </React.Fragment>
  );
};

export default withTranslation()(NotificationDropdown);

// NotificationDropdown.propTypes = {
//   t: PropTypes.any
// };