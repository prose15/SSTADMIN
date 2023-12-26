import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import * as moment from "moment";
// import { Badge } from 'reactstrap';
import { Reject } from './Reject';
import { Accept } from './Accept';
import RejectModal from 'components/Common/RejectModal';
// import rejectbool from './LatestTranaction'

const formateDate = (date, format) => {
    const dateFormat = format ? format : "DD MMM Y";
    const date1 = moment(new Date(date)).format(dateFormat);
    return date1;
};
const toLowerCase1 = str => {
    return (
      str === "" || str === undefined ? "" : str.toLowerCase()
    );
  };

const CheckBox = (cell) => {
    return cell.value ? cell.value : '';
};

const EmployeeName = (cell) => {
    return (
        <Link to="#" className="text-body fw-bold">{cell.value ? cell.value : ''}</Link>
    );
};

const LeaveType = (cell) => {
    return cell.value ? cell.value : '';
};

const From = (cell) => {
    return cell.value ? cell.value : '';
};

const To = (cell) => {
    return cell.value ? cell.value : '';
};

const Reason = (cell) => {
    return cell.value?cell.value:'';
};

// export const Rejectbox = (id) => {}

const Actions = (cell) => {
    const [display,setDisplay] = useState(false)
    return (
        <>
       {display?<RejectModal />:<></>} 
        <span>
        <i style={{cursor:"pointer"}} className="font-size-18 text-success fas fa-check me-3" onClick={()=>Accept(cell.value)} />
        <i style={{cursor:"pointer"}} onClick={()=>Reject(cell.value) }
            className="font-size-20 text-danger fas fa-times me-1"/>
        </span>
        </>
    )
};
export {
    CheckBox,
    EmployeeName,
    LeaveType,
    From,
    To,
    Reason,
    Actions
};