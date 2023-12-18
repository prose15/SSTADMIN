// src/components/filter.
import React, { useMemo } from "react";
import PropTypes from 'prop-types';
//import components
import Breadcrumbs from '../../components/Common/Breadcrumb';
import LeaveProjectsGrid from 'pages/Projects/leaveprojects-grid';
// import TableContainer from '../../components/Common/TableContainer';

function LeaveApprovals() {
    const columns = useMemo(
        () => [
            {
                Header: 'Date of request',
                accessor: 'dateofrequest',
            },
            {
                Header: 'Leave Type',
                accessor: 'leavetype'
            },
            {
                Header: 'Reason',
                accessor: 'reason'
            },
            {
                Header: 'Reason of reject',
                accessor: 'reasonofreject'
            },
            {
                Header: 'State of approval',
                accessor: 'stateofapproval'
            },
        ],
        []
    );

    const data = [   
        {
        dateofrequest:"12/12/2023",
        leavetype:"sick",
        reason:"fever",
        reasonofreject:"-",
        stateofapproval:"approved"
        },
    ];

    return (
        <div className="page-content pt-1">
            <div className="container-fluid pt-0">
                {/* <Breadcrumbs title="Tables" breadcrumbItem="Leave Approvals" /> */}
                <LeaveProjectsGrid/>
                {/* <TableContainer
                    columns={columns}
                    data={data}
                    isGlobalFilter={true}
                    isAddOptions={false}
                    customPageSize={10}
                    isPagination={true}
                    tableClass="align-middle table-nowrap table-check table"
                    theadClass="table-light"
                    paginationDiv="col-12"
                    pagination="justify-content-center pagination pagination-rounded"
                /> */}
            </div>
        </div>
    );
}
export default LeaveApprovals;