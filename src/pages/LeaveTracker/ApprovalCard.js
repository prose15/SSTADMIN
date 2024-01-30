import React from 'react'
import {
    Badge,
    Card,
    CardBody,
    Col,
    UncontrolledTooltip,
  } from "reactstrap";
const ApprovalCard = (props) => {
    const data = props.data
  return (
    <React.Fragment>
            {
                data.map((ele)=>(
                    <Col xl="3" sm="6" key={ele.id}>
                  <Card >
                  <CardBody>
                    <div className="d-flex">
                      <div className="avatar-md me-4">
                        <span className="avatar-title rounded-circle bg-primary-subtle text-primary font-size-24">
                          <i className="bx bxs-calendar" ></i>
                        </span>
                      </div>
   
                      <div className="flex-grow-1 overflow-hidden">
                        <h5 className="text-truncate font-size-15">
                            {ele.leaveType}
                        </h5>
                        <p className="text-muted">{ele.subject}</p>
                        <p className="text-muted mt-0">Days : {ele.noofdays}</p>
                      </div>
                    </div>
                  </CardBody>
                  <div className="px-4 py-3 border-top">
                    <ul className="list-inline mb-0">
                      <li className="list-inline-item me-3">
                      {(ele.status.includes('approved'))?(<Badge className={"bg-success"}>
                          {ele.status}
                        </Badge>):(<Badge className={"bg-danger"}>
                          {ele.status}
                        </Badge>)}
                        
                      </li>{" "}
                      <li className="list-inline-item me-3" id="dueDate">
                        <i className="bx bx-calendar me-1" /> {ele.from}
                        <UncontrolledTooltip placement="top" target="dueDate">
                          Due Date
                        </UncontrolledTooltip>
                      </li>{ele.to}
                    </ul>
                  </div>
                </Card>
                </Col>
                ))
            }
        
      

    </React.Fragment>

  )
}

export default ApprovalCard