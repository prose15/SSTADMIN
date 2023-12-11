// src/components/filter.
import React, { useMemo } from "react";
import PropTypes from 'prop-types';
//import components
import Breadcrumbs from '../../components/Common/Breadcrumb';
import TableContainer from '../../components/Common/TableContainer';

function LeaveRecords() {
    const columns = useMemo(
        () => [
            {
                Header: 'Date of Request',
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
                Header: 'From',
                accessor: 'from'
            },
            {
                Header: 'To',
                accessor: 'to'
            },
        ],
        []
    );

    
    const data = [
        {
            dateofrequest:"28/9/2023",
            leavetype:"sick",
            reason:"fever",
            from:"29/9/2023",
            to:"1/10/2023"
        },
        {
            dateofrequest:"28/9/2023",
            leavetype:"sick",
            reason:"fever",
            from:"29/9/2023",
            to:"1/10/2023"
        },
        {
            dateofrequest:"28/9/2023",
            leavetype:"sick",
            reason:"fever",
            from:"29/9/2023",
            to:"1/10/2023"
        },
        {
            dateofrequest:"28/9/2023",
            leavetype:"sick",
            reason:"fever",
            from:"29/9/2023",
            to:"1/10/2023"
        },
        {
            dateofrequest:"28/9/2023",
            leavetype:"sick",
            reason:"fever",
            from:"29/9/2023",
            to:"1/10/2023"
        },
    ];
    return (
        <div className="page-content">
            <div className="container-fluid">
                <Breadcrumbs title="Tables" breadcrumbItem="Leave Records" />
                <TableContainer
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
                />
            </div>
        </div>
    );
}
export default LeaveRecords;