import { doc, updateDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { db } from 'firebase-config';
import {Card,CardBody,Col,} from "reactstrap";
//Simple bar
import SimpleBar from "simplebar-react";
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
const ApprovalCard = (props) => {
  const name = Cookies.get('name')
    const data = props.data
    const userData= props.userData
    const newMsgs=data.filter((data)=>data.displayStatus==='')
      const updateDislpay=(data)=>{
       if(data.leaveType){
        updateDoc(doc(db,'leave submssion',data.id),{displayStatus:'true'}).then(()=>{
          console.log('updated')
        }).catch((err)=>{
          console.log(err)
        })
       }else if(data.WFH){
        updateDoc(doc(db,'WFH',data.id),{displayStatus:'true'}).then(()=>{
          console.log('updated')
        }).catch((err)=>{
          console.log(err)
        })
       }
      }
  const filterData = userData.filter(data=>data.name!==name)
    const findMin=(data)=>{
      const seconds = data.timestamp?.seconds
      const nanoseconds = data.timestamp?.nanoseconds
      const timestampInMilliseconds = seconds * 1000 + Math.floor(nanoseconds / 1e6);
        const dateObject = new Date(timestampInMilliseconds);
        const today =new Date()
        const timeDiff = today - dateObject
        const minsDiff = Math.floor(timeDiff/(1000 * 60))
        return minsDiff
    }
    const reverseDate=(date)=>{
      const newDate= date.split('-')
      return newDate.reverse().join('-')
    }
  return (
    <React.Fragment>
    <Col xl="12">
      <Card>
        <CardBody>
          <h4 className="card-title mb-4">My Notification</h4>
          <SimpleBar style={{ maxHeight: "500px", cursor: "pointer "}}>
            <ul className="list-group ">
              {data.map((data) => (
                <li className="list-group-item border-0" key={data.id} onClick={()=>updateDislpay(data)}>
                  <div className="d-flex">
                    <div className="flex-shrink-0 me-3">
                      <div className="avatar-xs">
                        <span className="avatar-title rounded-circle bg-light">
                        {
                      data.leaveType==='Flexileave'?( <span className="avatar-title bg-primary rounded-circle font-size-20  p-3">
                      <i className="mdi mdi-party-popper"/>
                      </span> ):(data.leaveType!=='WFH'?(<span className="avatar-title bg-primary rounded-circle font-size-20  p-3">
                      <i className="bx bx-calendar "/>
                      </span>):((data.WFH==='Work From Home') ? 
                    (<span className="avatar-title bg-primary rounded-circle font-size-17">           
                    <i className="mdi mdi-laptop-windows"/>
                    </span>):(data.leaveType==='WFH' && <span className="avatar-title bg-primary rounded-circle font-size-17">           
                    <i className="mdi mdi-laptop-windows"/>
                    </span>)))
                    }
                        </span>
                      </div>
                    </div>
                    <div className="flex-grow-1">
                      <h5 className="font-size-14">{data.leaveType || data.WFH}</h5>
                      <p className="text-muted">{data.reason}</p>

                      <div className="float-end">
                        <p className="text-muted mb-0">
                          <i className="mdi mdi-clock-outline" />  {(findMin(data)===0)?('Just now'):((findMin(data)<60)?
                          findMin(data)+" mins ago":(Math.floor(findMin(data)/60>24)?(Math.floor(findMin(data)/60/24)+" days ago"):(Math.floor(findMin(data)/60)+" hrs ago")))}
                        </p>
                      </div>
                      <p className="text-muted mb-0">{
                      !data.status?((data.leaveType==='WFH')?(<p>{reverseDate(data.fromDate)} is declared as Work From Home</p>):(<p>{reverseDate(data.fromDate)} is declared as holiday</p>)) :<p> status : {data.status}</p>}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </SimpleBar>
          
        </CardBody>
      </Card>
      <Card>
        <CardBody>
          <h4 className="card-title mb-4">Team Notification</h4>
          <SimpleBar style={{ maxHeight: "500px" }}>
            <ul className="list-group">
              {filterData.map((data) => (
                
                <li className="list-group-item border-0" key={data.id} >
                  <div className="d-flex">
                    <div className="flex-shrink-0 me-3">
                      <div className="avatar-xs">
                        <span className="avatar-title rounded-circle bg-light">
                        {
                      data.leaveType==='Flexileave'?( <span className="avatar-title bg-primary rounded-circle font-size-20  p-3">
                      <i className="mdi mdi-party-popper"/>
                      </span> ):(data.leaveType?(<span className="avatar-title bg-primary rounded-circle font-size-20  p-3">
                      <i className="bx bx-calendar "/>
                      </span>):((data.WFH==='Work From Home') ? 
                    (<span className="avatar-title bg-primary rounded-circle font-size-17">           
                    <i className="mdi mdi-laptop-windows"/>
                    </span>):(data.sheetName ?(<span className="avatar-title bg-primary rounded-circle font-size-20  p-3">
                      <i className="bx bxs-calendar"/>
                      </span>):(<></>))))
                    }
                        </span>
                      </div>
                    </div>
                    <div className="flex-grow-1">
                      <h5 className="font-size-14">{data.name===name?('You'):(data.name)}</h5>
                      <p className="text-muted">{data.leaveType 
                      || data.WFH }</p>

                      <div className="float-end">
                        <p className="text-muted mb-0">
                          <i className="mdi mdi-clock-outline" />  {(findMin(data)===0)?('Just now'):((findMin(data)<60)?
                          findMin(data)+" mins ago":(Math.floor(findMin(data)/60>24)?(Math.floor(findMin(data)/60/24)+" days ago"):(Math.floor(findMin(data)/60)+" hrs ago")))}
                        </p>
                      </div>
                      <p className="text-muted mb-0">{
                        data.status === 'revoke' ? (<p>status : {data.status} </p>) : (data.sheetName ? <p>sent you a timesheet</p>:(<p>sent you a request</p>)) 
                      }</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </SimpleBar>
          
        </CardBody>
      </Card>
    </Col>
  </React.Fragment>
  )
}
export default ApprovalCard
