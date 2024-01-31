import React, { useEffect, useMemo, useState } from "react";
import { collection, getDocs, query, where, orderBy, onSnapshot } from 'firebase/firestore'
import logo from 'assets/images/logo.png'
import { db } from "firebase-config";
import { Col, Row } from "reactstrap";
import TableContainer from '../../components/Common/TableContainer';
import { Status, Actions, ReverseDate } from "./LeaveRecordsCol";
import Cookies from "js-cookie";
import { Modal } from "reactstrap";
import { Button } from "reactstrap";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { useStateContext } from "Context/ContextProvider";

const LeaveRecords = () => {
  const [year, setYear] = useState(0);
  const [modal_1, setModal_1] = useState("varying");
  const [varyingModal, setVaryingModal] = useState(false);

  function tog_varyingModal() {
    setVaryingModal(!varyingModal);
  }

  const { myRecords } = useStateContext()
  const [details, setDetails] = useState([])
  const name = Cookies.get('name')
  const email = Cookies.get('email')

  const downloadHelloWorldAsPDF = (leaverecords) => {

    const pdf = new jsPDF();
    const data = leaverecords
    const name = Cookies.get('name')
    const id = Cookies.get('id')
    const email = Cookies.get('email')
    const team = Cookies.get('team')
    const designation = Cookies.get('role')
    const headers = ['Date of Request', 'Leave Type', 'Subject', 'From', 'To']
    pdf.addImage(logo, 'JPEG', 90, 10, 30, 10)
    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(75, 75, 75);
    pdf.text('Employee Details', 15, 30);
    const detailsheader = ['ID', 'Name', 'Team', 'Designation']
    const detailsdata = [[`${id}`, `${name}`, `${team}`, `${designation}`]]
    pdf.autoTable({
      head: [detailsheader],
      body: detailsdata,
      theme: 'plain',
      startY: 35,
      columnStyles: {
        0: { columnWidth: 45 },
        1: { columnWidth: 45 },
        2: { columnWidth: 45 },
        3: { columnWidth: 47 },
      },
      theme: 'striped'
    })
    pdf.text('Leave Records', 15, 70);
    pdf.autoTable({
      head: [headers],
      body: data,
      theme: 'striped',
      startY: 75
    });
    pdf.save('Leave Records.pdf');
  }

  const today = new Date()
  let thisYear = today.getFullYear()
  const startYear = 2019
  const downloadYears = []
  while (startYear !== thisYear) {
    downloadYears.push(thisYear)
    thisYear--;
  }

  const handleDownloadClick = (year) => {
    const leaveDetails = myRecords.filter(detail => (detail.fromYear === year || detail.toYear === year) && (detail.status === "approved"))
    setYear(0)
    let leaverecords = []

    for (let i = 0; i < leaveDetails.length; i++) {
      const detail = leaveDetails[i]
      const dateOfRequest = detail.requestDate
      const leaveType = detail.leaveType
      const subject = detail.subject
      const from = detail.from
      const to = detail.to
      const detailarray = [dateOfRequest, leaveType, subject, from, to]
      leaverecords.push(detailarray)
    }
    downloadHelloWorldAsPDF(leaverecords);
  }


  const columns = useMemo(
    () => [
      {
        Header: 'Date of Request',
        accessor: 'requestDate',
        disableFilters: true,
        filterable: false,
        Cell: cellProps => {
          return <ReverseDate {...cellProps} />;
        },
      },
      {
        Header: 'Leave Type',
        accessor: 'leaveType'
      },
      {
        Header: 'Subject',
        accessor: 'subject'
      },

      {
        Header: 'From',
        accessor: 'from',
        disableFilters: true,
        filterable: false,
        Cell: cellProps => {
          return <ReverseDate {...cellProps} />;
        },
      },
      {
        Header: 'To',
        accessor: 'to',
        disableFilters: true,
        filterable: false,
        Cell: cellProps => {
          return <ReverseDate {...cellProps} />;
        },
      },
      {
        Header: "Status",
        accessor: "status",
        disableFilters: true,
        filterable: false,
        Cell: cellProps => {
          return <Status {...cellProps} />;
        },
      },
      {
        Header: "Action",
        disableFilters: true,
        accessor: "id",
        Cell: cellProps => {
          return (
            <Actions {...cellProps} />
          );
        },
      },
    ],
    []
  );
  return (

    <div className="page-content">
      <div className="container-fluid">
        <Col className="d-flex justify-content-between">
          <div className="d-flex">
            <i className="bx bx-notepad pb-3 ms-2 fs-2 pe-2"></i>
            <h4 className="font-size-16">Leave Records</h4>
          </div>
          <div>
            <Modal
              isOpen={varyingModal}
              toggle={() => {
                tog_varyingModal()
              }}
            >
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Year</h5>
                <button type="button"
                  onClick={() => {
                    setVaryingModal(false);
                  }} className="btn-close"></button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="mb-3">
                    <select className="form-select"
                      name="year"
                      onChange={(e) => setYear(e.target.value)}
                      value={year}
                    >
                      <option defaultValue='#'>Select Year</option>
                      {
                        downloadYears.map((year) => (
                          <option key={year} value={year}>{year}</option>
                        ))
                      }
                    </select>
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button type="button" onClick={() => { handleDownloadClick(year) }} className="btn btn-primary">Download pdf</button>
              </div>
            </Modal>
            <button onClick={() => {
              tog_varyingModal();
              setModal_1("@fat")
            }}
              className='btn'>
              <i className="bx bx-download font-size-20"></i>
            </button>
          </div>
        </Col>
        <Col >
          <TableContainer
            columns={columns}
            data={myRecords}
            isGlobalFilter={true}
            isAddOptions={false}
            customPageSize={10}
            isPagination={true}
            tableClass="align-middle table-nowrap table-check table"
            theadClass="table-light"
            paginationDiv="col-12"
            pagination="justify-content-center pagination pagination-rounded"
          />
        </Col>
      </div>
    </div>

  );
}
export default LeaveRecords;