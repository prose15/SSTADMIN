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
import Cookies from "js-cookie";

const NotificationDropdown = props => {
  const [menu, setMenu] = useState(false);
  const {detail,WFHDetail,holidays,request,revokeDetail,WFHRecords,timesheetRequest} = useStateContext()
  const newDetail=detail.filter(data=>data.displayStatus==='')
  const newWFHRecords=WFHRecords.filter(data=>data.displayStatus==='' && data.status==='approved' || data.status=='denied' && new Date(data.from)>=new Date())
  const data = [...newDetail,...newWFHRecords,...holidays,...request,...revokeDetail,...WFHDetail,...timesheetRequest]
  const reverseArray = data.reduce((acc, curr) => {
   const indexToInsert = acc.findIndex(item => item.timestamp > curr.timestamp);
   if (indexToInsert === -1) {
     acc.push(curr);
   } else {
     acc.splice(indexToInsert, 0, curr);
   }
 
   return acc;
 }, []);
 const sortedArray = reverseArray.reverse();
  const newSortedArray = sortedArray.filter((data,index)=>index<3)
  const reverseDate=(date)=>{
    const newDate= date.split('-')
    return newDate.reverse().join('-')
  }
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
         {sortedArray.length === 0 ?  (
          <i id="bell" className="bx bx-bell" />) :  ( <i id="bell" className="bx bx-bell bx-tada" />) }
          <span id="detail" className="badge bg-danger rounded-pill">{sortedArray.length === 0 ? empty :  ( sortedArray.length) }</span>
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
          {/* {new_arr4.map((data)=> 
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
          </div>)} */}
           {newSortedArray.map((data)=> 
          <div key={data.id} className="text-reset notification-item">
            <div  className="d-flex">
                <div className="avatar-xs me-3 ">
                 {
                  data.name ===Cookies.get('name') && data.leaveType?(data.status==='approved' ?( <span className="avatar-title bg-success rounded-circle font-size-16  p-3"><i className="fa fa-check"/></span>):(data.status==='denied' &&  <span className="avatar-title bg-danger rounded-circle font-size-16  p-3"><i className="fa fa-times"/></span>)):(data.name ===Cookies.get('name') && data.WFH ? (data.status==='approved' ?( <span className="avatar-title bg-success rounded-circle font-size-16  p-3"><i className="fa fa-check"/></span>):(data.status==='denied' &&  <span className="avatar-title bg-danger rounded-circle font-size-16  p-3"> <i className="fa fa-times"/></span>)):(!data.name && data.leaveType?(data.leaveType==='Flexileave'?  <span className="avatar-title bg-primary rounded-circle font-size-16  p-3"><i className="mdi mdi-party-popper"/></span>:data.leaveType==='WFH' &&  <span className="avatar-title bg-primary rounded-circle font-size-16  p-3"><i className="mdi mdi-laptop-windows"/></span>):(data.name!==Cookies.get('name') && data.leaveType|| data.name!==Cookies.get('name') && data.sheetName ?(<span className="avatar-title bg-primary rounded-circle font-size-16  p-3"><i className="bx bx-calendar"/></span>):(data.name!==Cookies.get('name') && data.WFH &&(<span className="avatar-title bg-primary rounded-circle font-size-16  p-3"><i className="mdi mdi-laptop-windows"/></span>)))))
                 }
                     
                </div>
                <div className="flex-grow-1">
                  <h6 className="mt-0 mb-1">
                    {data.subject || data.sheetName}
                  </h6>
                  <div className="font-size-12 text-muted">
                    <p className="mb-1">
                    {data.name===Cookies.get('name')  && data.leaveType?(data.status==='approved' ?(`Your ${data.leaveType} request has been approved`):(data.status==='denied' &&  `Your ${data.leaveType} request has been denied`)):(data.name===Cookies.get('name') && data.WFH ? (data.status==='approved' ?( `Your WFH request has been approved`):(data.status==='denied' && `Your WFH request has been approved`)):(!data.name && data.leaveType?(data.leaveType==='Flexileave'?  `${reverseDate(data.fromDate)} is declared as holiday`:data.leaveType==='WFH' &&  `${reverseDate(data.fromDate)} is declared as WFH`):(data.name!==Cookies.get('name') && data.leaveType?(`${data.name} sent you a leave request`):(data.name!==Cookies.get('name') && data.WFH ?(`${data.name} sent you a WFH request`):(data.name!==Cookies.get('name') && data.sheetName ?(`${data.name} sent you a timesheet`):(<></>))))))}
                    </p>
                    <p className="mb-0">
                      <i className="mdi mdi-clock-outline" />
                       {(findMin(data)===0)?('Just now'):((findMin(data)<60)?
                        findMin(data)+" mins ago":(Math.floor(findMin(data)/60>24)?(Math.floor(findMin(data)/60/24)+" days ago"):(Math.floor(findMin(data)/60)+" hrs ago")))
                       }
                    
                    </p>
                  </div>
                </div>
            </div>
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