import React, { useEffect } from "react"
import { useState } from "react"
import PropTypes from 'prop-types'
import { Link } from "react-router-dom"
import { Row, Col, BreadcrumbItem, Modal } from "reactstrap"
import logo from 'assets/images/logo.png'
import Cookies from "js-cookie"
import jsPDF from "jspdf";
import { db } from "firebase-config"
import { collection, getDocs } from "firebase/firestore"
const Breadcrumb = props => {
  const [year,setYear]=useState(0);
  const [users,setUsers]=useState([])
const [modal_1, setModal_1] = useState("varying");
const [varyingModal, setVaryingModal] = useState(false);

    function tog_varyingModal() {
        setVaryingModal(!varyingModal);
      }
      const [name,setName]=useState('')
    const [id,setId]=useState('')
    const [email,setEmail]=useState('')
    const [team,setTeam]=useState('')
    const [designation,setDesignation]=useState('')
    const teamList=['Delivery','Sales','HR']
    useEffect(()=>{
      const getData=async()=>{
        const collRef=collection(db,'users')
        await getDocs(collRef).then((data)=>{
          setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
        }).catch((err)=>{
          console.log(err)
        })
      }
      getData()
    },[])

const downloadHelloWorldAsPDF = (leaverecords , name) => {   
   
    const pdf = new jsPDF();
    const data = leaverecords
   
    const headers = ['Date of Request','Leave Type','Subject','From','To'];
    pdf.addImage(logo,'JPEG',90,10,30,10)
    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(75,75,75);
    pdf.text('Employee Details', 15, 30);
    
    const personalData=users.filter(user=>user.name===name)  
    const detailsheader=['ID','Name','Team','Designation']
    let detailsdata=[[`${personalData[0].employeeID}`,`${name}`,`${personalData[0].team}`,`${personalData[0].designation}`]]
    pdf.autoTable({
        head:[detailsheader],
        body:detailsdata,
        theme:'plain',
        startY:35,
        columnStyles: {
            0: { columnWidth: 45 },
            1: { columnWidth: 45 },
            2: { columnWidth: 45 },
            3: { columnWidth: 47 },
          },
        theme:'striped'
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
      const today=new Date()
let thisYear=today.getFullYear()
const startYear=2019
const downloadYears=[]
while(startYear!==thisYear){
    downloadYears.push(thisYear)
    thisYear--;
}
const details=props.details

const handleDownloadClick = (year,name) => {
  
  
  
  const leaveDetails=details.filter(detail=>(detail.fromYear===year||detail.toYear===year)&&(detail.status==="approved") && (detail.name===name))
setYear(0)
  console.log("yearrr",year)
  console.log("detailss",details)
  console.log("leaveDetailss",leaveDetails)
  let leaverecords=[]

  for(let i=0;i<leaveDetails.length;i++){
      const detail=leaveDetails[i]
      const dateOfRequest=detail.requestDate
      const leaveType=detail.leaveType
      const subject=detail.subject
      const from=detail.from
      const to=detail.to
      const detailarray=[dateOfRequest,leaveType,subject,from,to]
      leaverecords.push(detailarray)
  }
  console.log("leaverecordsss",leaverecords)
  downloadHelloWorldAsPDF(leaverecords,name);
}
  return (
    <Row>
      <Col className="col-12">
        <div className="page-title-box d-sm-flex align-items-center justify-content-between">
          <h4 className="mb-sm-0 font-size-18">{props.title}</h4>
          <div className="page-title-right">
            <ol className="breadcrumb m-0">
              {
                (Cookies.get('name') === 'Keerthana') ? (
                  <>
                    
                    <BreadcrumbItem>
                      <Link to="/leave/requests">{props.title}</Link>
                    </BreadcrumbItem>
                    <BreadcrumbItem active>
                      <Link to="/allrecords">{props.breadcrumbItem}</Link>
                    </BreadcrumbItem>
                    {
                      window.location.pathname.includes('allrecords')?(<div>
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
                                  <div className="mb-2">
                                  <select className="form-select mb-3"
                                     name="name"
                                onChange={(e)=>setName(e.target.value)}
                                     value={name}
                                  >
                                    <option defaultValue='#'>Select Name</option>
                                       {
                                users.map((user)=>(
                                    <option key={user.id} value={user.name}>{user.name}</option>
                                ))
                                      }         
                                  </select>
                                  <select className="form-select"
                                     name="year"
                                onChange={(e)=>setYear(e.target.value)}
                                     value={year}
                                  >
                                    <option defaultValue='#'>Select Year</option>
                                       {
                                downloadYears.map((year)=>(
                                    <option key={year} value={year}>{year}</option>
                                ))
                                      }         
                                  </select>
                                  
                                  </div>
                                </form>
                              </div>
                              <div className="modal-footer">
                                <button type="button" onClick={()=>{handleDownloadClick(year,name)}} className="btn btn-primary">Download pdf</button>
                              </div>
                            </Modal>
                            <button onClick={() => {
                                  tog_varyingModal();
                                  setModal_1("@fat")
                                }}
                                className='btn'>
                        <i className="bx bx-download font-size-20"></i>     
                        </button> 
                        </div>):(<></>)
                    }
                    
                  </>
                ) : (<>
                  <BreadcrumbItem active>
                    <Link to="#">{props.breadcrumbItem}</Link>
                  </BreadcrumbItem>
                  <BreadcrumbItem>
                    <Link to="#">{props.title}</Link>
                  </BreadcrumbItem>
                </>
                )
              }
            </ol>
          </div>
        </div>
      </Col>
    </Row>
  )
}

// Breadcrumb.propTypes = {
//   breadcrumbItem: PropTypes.string,
//   title: PropTypes.string
// }

export default Breadcrumb
