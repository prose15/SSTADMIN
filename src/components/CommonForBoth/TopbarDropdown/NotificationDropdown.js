import React, { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import { Dropdown, DropdownToggle, DropdownMenu, Row, Col } from "reactstrap";
import SimpleBar from "simplebar-react";
//i18n
import { withTranslation } from "react-i18next";
import { useStateContext } from "Context/ContextProvider";
import { Timestamp } from "firebase/firestore";
import { LeaveType } from "pages/LeaveTracker/LatestTranactionCol";
import WFH from "pages/WFH";

const NotificationDropdown = props => {
  const [menu, setMenu] = useState(false);
  const {request,WFHDetail,revokeDetail,holidays,myRecords,WFHRecords} = useStateContext();
  const arr1= [...request]
  const arr2= [...WFHDetail]
  const arr3= [...revokeDetail]
  const arr4= myRecords.filter((data)=>data.status==='approved' && new Date(data.fromDate)>=new Date())
  const arr5= WFHRecords.filter((data)=>data.status==='approved' && new Date(data.fromDate)>=new Date())
  const new_arr1 = arr1.reverse().filter((data,index)=>index<1)
  const new_arr2 = arr2.reverse().filter((data,index)=>index<1) 
  const new_arr3 = arr3.reverse().filter((data,index)=>index<1)
  const new_arr4=holidays.filter((data,index)=>index<1)
  const new_arr5=arr4.filter((data,index)=>index<1)
  const new_arr6=arr5.filter((data,index)=>index<1)
  const final_arr = [...new_arr1, ... new_arr2, ...new_arr3,...new_arr4,...new_arr5,...new_arr6]
 
  const findMin=(data)=>{
    const seconds   = data.timestamp?.seconds
    const nanoseconds = data.timestamp?.nanoseconds
    const timestampInMilliseconds = seconds * 1000 + Math.floor(nanoseconds / 1e6);
      const dateObject = new Date(timestampInMilliseconds);
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
  const empty = ()=>{
    let element = document.getElementById("detail");
    element.classList.add("visually-hidden")
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
         {request.length+ WFHDetail.length + revokeDetail.length+new_arr4.length === 0 ?  (
          <i id="bell" className="bx bx-bell" />) :  ( <i id="bell" className="bx bx-bell bx-tada" />) }
          <span id="detail" className="badge bg-danger rounded-pill">{request.length+ WFHDetail.length + revokeDetail.length+new_arr4.length+arr5.length+arr4.length === 0 ? empty :  ( request.length + WFHDetail.length + revokeDetail.length+holidays.length+arr5.length+arr4.length) }</span>
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
          {new_arr4.map((data)=> 
          <div key={data.id} className="text-reset notification-item">
            <Link to= '/leave/requests' onClick={handleClick}>
            <div  className="d-flex">
                <div className="avatar-xs me-3 ">
                <span className="avatar-title bg-primary rounded-circle font-size-16  p-3">
                    <i className="mdi mdi-party-popper "/>
                    </span>  
                </div>
                <div className="flex-grow-1">
                  <h6 className="mt-0 mb-1">
                    {data.subject}
                  </h6>
                  <div className="font-size-12 text-muted">
                    <p className="mb-1">
                    {data.reason}
                    </p>
                    <p className="mb-0">
                      <i className="mdi mdi-clock-outline" />
                       {(findMin(data)===0)?('Just now'):((findMin(data)<60)?
                        findMin(data)+" mins ago":(Math.floor(findMin(data)/60>24)?(Math.floor(findMin(data)/60/24)+"days ago"):(Math.floor(findMin(data)/60)+" hrs ago")))
                       }
                    
                    </p>
                  </div>
                </div>
            </div>
            </Link>
          </div>)}
          {final_arr.map((data)=> 
          <div key={data.id} className="text-reset notification-item">
           <Link to= {data.WFH === 'Work From Home' ? '/WFH/requests' : '/leave/requests'} onClick={handleClick}>
            <div  className="d-flex">
                <div className="avatar-xs me-3">
                {data.WFH==='Work From Home' ? 
                <span className="avatar-title bg-primary rounded-circle font-size-17">           
                    <i className="mdi mdi-laptop-windows"/>
                    </span>
                    :
                    data.status === 'revoke' ?  
                     <span className="avatar-title bg-primary rounded-circle font-size-20"> 
                    <i className="bx bx-transfer-alt"/>
                    </span> :
                    <span className="avatar-title bg-primary rounded-circle font-size-17"> 
                    <i className="bx bx-calendar"/>
                    </span>             
                    }       
                </div>
                <div className="flex-grow-1">
                  <h6 className="mt-0 mb-1">
                    {data.leaveType || data.WFH}
                  </h6>
                  <div className="font-size-12 text-muted">
                    <p className="mb-1">                 
                     {
                      data.status === "revoke" ? 
                      (`${data.name} has revoked`) : (`${data.name} sent you a request`) }
                    </p>
                    <p className="mb-0">
                      <i className="mdi mdi-clock-outline" />
                      {(findMin(data)===0)?('Just now'):((findMin(data)<60)?
                        findMin(data)+" mins ago":(Math.floor(findMin(data)/60>24)?(Math.round(findMin(data)/60/24)+" days ago"):(Math.floor(findMin(data)/60)+" hrs ago")))
                       }
                    </p>
                  </div>
                </div>
            </div>
            </Link>
          </div>)}
         
          </SimpleBar>
         <div className="p-2 border-top d-grid">
        <Link to="/approvals"
        onClick={handleClick}
       className="btn btn-sm btn-link font-size-14 text-center">
       <i className="mdi mdi-arrow-right-circle me-1" 
        ></i> <span
       key="t-view-more">{props.t("View All..")}</span>
       </Link>
       </div>
        </DropdownMenu>
      </Dropdown>
    </React.Fragment>
  );
};

export default withTranslation()(NotificationDropdown);