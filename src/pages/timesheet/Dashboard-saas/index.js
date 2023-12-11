import React from "react"
import { Container, Row, Col } from "reactstrap"
import CardWelcome from "./card-welcome"
import MiniWidget from "./mini-widget"
//Import Breadcrumb
import Breadcrumbs from "../../../components/Common/Breadcrumb"

//Import Components

import BorderlessTable from "table/BorderlessTable"
import Section from "./Section"
import Reportingmanagers from './Reportingmanagers'
const DashboardSaas = props => {
  const total=40
  const worked=35
  const remain=total-worked
  const reports = [
    {
      icon: "bx bx-alarm",
      title: "Total Hours",
      value: total+" Hours",
      badgeValue: "+ 0.2%",
      color: "success",
      desc: "From previous period",
    },
    {
      icon: "bx bx-dumbbell",
      title: "Worked Hours",
      value: worked+" Hours",
      badgeValue: "+ 0.2%",
      color: "warning",
      desc: "From previous period",
    },
    {
      icon: "bx bx-stopwatch",
      title: "Remaining Hours",
      value: remain+" Hours",
      badgeValue: "0%",
      color: "danger",
      desc: "From previous period",
    },
  ]

  //meta title
  document.title = "SST-Apps"

  return (
    <React.Fragment>
      <div className="page-content">
        {/* <Container> */}
          <Section btn={'Log Time'} link={'/timesheet/logtime'}/>
          {/* Render Breadcrumb */}
          {/* <Breadcrumbs title="Dashboards" breadcrumbItem="Deepak" /> */}

          {/* Card User */}
          {/* <CardUser /> */}
          <Row>
            {/* welcome card */}
            <CardWelcome />

            <Col xl="8">
              <Row>
                <MiniWidget reports={reports} />
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
