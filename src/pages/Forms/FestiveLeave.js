import React, { useState, useEffect } from 'react'
import { Card,CardTitle,CardBody,Form,Label,Container,Input,Row,Col } from 'reactstrap'
import { DatePicker } from 'antd'
import { db } from 'firebase-config'
import {getDocs, collection, addDoc, updateDoc,doc, Timestamp } from 'firebase/firestore'
const FestiveLeave = () => {
    const [fromDate,setFromDate]=useState('')
    const [subject,setSubject]=useState('')
    const [reason,setReason]=useState('')
    const [users,setUsers]=useState([])
    const [admin,setAdmin]=useState([])
    const [filteredAdmins,setFilteredAdmin]=useState([])
    useEffect(() => {
      const getData= async() => {
      const data = await getDocs(collection(db,'users')).then((data)=>{
        setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
      }).catch((err)=>{
        console.log(err)
      })
      const adminData = await getDocs(collection(db,'admin')).then((data)=>{
        setAdmin(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
      }).catch((err)=>{
        console.log(err)
      })
      setFilteredAdmin(admin.filter((data)=>data.level==='L1' || data.level==='L2'))
      }
      getData()
    }, [])
    const leaveType='Flexileave'
    const flexidays =['2024-01-01','2024-01-15','2024-01-26','2024-04-09','2024-04-11','2024-04-14','2024-05-01','2024-06-17','2024-07-07','2024-07-17','2024-08-15','2024-09-15','2024-09-16','2024-10-02','2024-10-31','2024-12-25',] 
    const disabledDate = current => {
        return !flexidays.includes(current.format('YYYY-MM-DD'));
      }; 
    const handleSubmit=()=>{
        const startDate=new Date(fromDate)
        const fromTimeStamp=Timestamp.fromMillis(startDate.getTime())
const data={leaveType,fromDate,subject,reason,fromTimeStamp,timestamp:Timestamp.now()}
addDoc(collection(db,'Holidays'),data).then(()=>{
    users.map((user)=>{
        updateDoc(doc(db,'users',user.id),{flexiAvailable:user.flexiAvailable-1}).then(()=>{
            console.log('updated')
        })
    })
    filteredAdmins.map((user)=>{
        updateDoc(doc(db,'admin',user.id),{flexiAvailable:user.flexiAvailable-1}).then(()=>{
            console.log('admin updated')
        })
    })
}).catch((err)=>{

    console.log(err)
})
console.log(data)
    }
  return (
    <React.Fragment>
    <div className="page-content">
      <Container>
        <Row>
          <Col>
            <Card className='mt-5 w-100  mx-auto'>
              <CardBody >
                <CardTitle className="mb-4">Declare a Festive Leave!</CardTitle>
                <Form onSubmit={(e)=>e.preventDefault()}>
                  <Row>
               
                    <Col md={6}>
                      <div className="mb-3">
                        <Label htmlFor="formrow-email-Input">Leave Type</Label>
                        <Input
                          name="keerthana"
                          value={leaveType}
                        />
                      </div>
                    </Col>
                    <Col md={6}>
                      <div className="">
                        <Label htmlFor="formrow-email-Input">Date</Label>    
                            <DatePicker
                            className={ "form-control"}
                            id="formrow-email-Input"
                            name="fromDate"
                            placeholder="Enter From Date"
                            onChange={(date,string)=>setFromDate(string)}
                            // value={fromDate}
                              disabledDate={disabledDate}
                              format='YYYY-MM-DD'
                               />
                     </div>
                     
                    </Col>
                  </Row>
                  
                  <div className="mt-3">
                      <>
                      <Label>Subject</Label>
                  <Input
                    type="text"
                    id="subject"
                    className= {"form-control"}
                    name="subject"
                    maxLength="50"
                  placeholder="Please Enter Your Subject..."
                    onChange={(e)=>setSubject(e.target.value)}
                    value={subject}
                  />
                      </>
                  
                </div>
                  <div className="mt-3">
                    <>
                       <Label>Reason</Label>
                  <Input
                    type="textarea"
                    id="reason"
                    className= {"form-control"}
                    name="reason"
                    maxLength="225"
                    rows="3"
                    placeholder="Don't exists 250 words..."
                    onChange={(e)=>setReason(e.target.value)}
                    value={reason}
                  />
                  </>
                </div>
              <div>
                    <button type="submit" onClick={()=>handleSubmit()} className="btn btn-primary w-md mt-5" 
                    >Submit</button>
                  </div>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  </React.Fragment>
  )
}

export default FestiveLeave