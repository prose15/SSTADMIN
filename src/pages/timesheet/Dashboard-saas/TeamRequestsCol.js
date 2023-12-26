import React from 'react';
import { Link } from 'react-router-dom';
import * as moment from "moment";
// import { Badge } from 'reactstrap';
import { Reject } from './Reject';
import { Accept } from './Accept';

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

const TimesheetName = (cell) => {
    return cell.value ? cell.value : '';
};

const WorkedHours = (cell) => {
    return cell.value ? cell.value : '';
};

const DateOfSubmission = (cell) => {
    return cell.value ? cell.value : '';
};

const Reason = (cell) => {
    return cell.value?cell.value:'';
};
const Actions = (cell) => {
    return (
        <span>
        <i style={{cursor:"pointer"}} className="font-size-18 text-success fas fa-check me-3" onClick={()=>Accept(cell.value)} />
        <i style={{cursor:"pointer"}} onClick={()=>Reject(cell.value)}
            className="font-size-20 text-danger fas fa-times me-1"/>
        </span>
    )
};
export {
    CheckBox,
    EmployeeName,
    TimesheetName,
    WorkedHours,
    DateOfSubmission,
    Reason,
    Actions
};