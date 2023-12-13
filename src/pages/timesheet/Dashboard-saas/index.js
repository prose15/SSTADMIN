import React from "react"
import { Container, Row, Col,Card,CardBody } from "reactstrap"
import CardWelcome from "./card-welcome";
import MiniWidget from "./mini-widget"
import Breadcrumbs from "../../../components/Common/Breadcrumb"
import BorderlessTable from "table/BorderlessTable"
import Section from "./Section"
import Reportingmanagers from './Reportingmanagers'
const DashboardSaas = props => {
  const total=40
  const worked=35
  const remain=total-worked
  const reports = [
    { title: "Total hours", iconClass: "bx bx-alarm", description: total },
    { title: "Worked hours", iconClass: "bx bx-dumbbell", description: worked },
    {
      title: "Remaining hours",
      iconClass: "bx bx-stopwatch",
      description: remain,
    },
  ];

  //meta title
  document.title = "SST-Apps"


  return (
    <React.Fragment>
      <div className="page-content">
        {/* <Container> */}
          <Section  btn={'Log Time'} link={'/timesheet/logtime'}/>
          <Row>
            <CardWelcome />

            <Col xl="8">
              <Row>
                {/* Reports Render */}
                {reports.map((report, key) => (
                  <Col md="4" key={"_col_" + key}>
                    <Card className="mini-stats-wid">
                      <CardBody>
                        <div className="d-flex">
                          <div className="flex-grow-1">
                            <p className="text-muted fw-medium">
                              {report.title}
                            </p>
                            <h4 className="mb-0">{report.description}</h4>
                          </div>
                          <div className="avatar-sm rounded-circle bg-primary align-self-center mini-stat-icon">
                            <span className="avatar-title rounded-circle bg-primary">
                              <i
                                className={
                                  "bx " + report.iconClass + " font-size-24"
                                }
                              ></i>
                            </span>
                          </div>
                        </div>
                      </CardBody>
                    </Card>
                  </Col>
                ))}
              </Row>
            </Col>
          </Row>
          <Row>
          <BorderlessTable />
          <Reportingmanagers />
          </Row>
          
          
          
       
          
          
        {/* </Container> */}
      </div>
    </React.Fragment>
  )
}

export default DashboardSaas
