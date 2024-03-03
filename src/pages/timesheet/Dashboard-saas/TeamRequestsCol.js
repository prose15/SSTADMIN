import React from 'react';
import { Link } from 'react-router-dom';
import * as moment from "moment";
// import { Badge } from 'reactstrap';
import { Reject } from './Reject';
import { Accept } from './Accept';
import { UncontrolledDropdown, DropdownMenu, DropdownToggle, Button } from 'reactstrap';

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
    return cell.value ? cell.value : '';
};
const Actions = ({cell, request}) => {
    return (
        <UncontrolledDropdown className="ms-auto">
            <DropdownToggle
                className="text-muted font-size-14"
                tag="a"
                color="white"
            >
                <i className="mdi mdi-dots-horizontal"></i>
            </DropdownToggle>
            <DropdownMenu className="dropdown-menu-end">
                <Link to={`/timesheet/requests/viewtimesheet/${cell.value}`}>
                    <Button className='btn dropdown-item'>
                        <i className="font-size-18 text-primary bx bxs-detail me-2"></i> View Timesheet
                    </Button>
                </Link>
                {
                    request===true && (
                        <>
                            <Button className='btn dropdown-item'>
                                <i style={{ cursor: "pointer" }} className="font-size-18 text-success fas fa-check me-2" onClick={() => Accept(cell.value)} />Accept
                            </Button>
                            <Button className='btn dropdown-item'>
                                <i style={{ cursor: "pointer" }} onClick={() => Reject(cell.value)}
                                    className="font-size-20 text-danger fas fa-times me-2" /> Reject
                            </Button>
                        </>
                    )
                }

            </DropdownMenu>
        </UncontrolledDropdown>

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