import PropTypes from "prop-types";
import React from "react";

import { Link } from "react-router-dom";
import StackedColumnChart from "./StackedColumnChart";
import ApexCharts from "../Charts/Apexcharts";
import DatatableTables from "../Tables/DatatableTables";
import {
  Container,
  Row,
  Col,
  Button,
  Card,
  CardBody,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Table,
} from "reactstrap";

//Import Breadcrumb
// import Breadcrumbs from "../../components/Common/Breadcrumb";
import WelcomeComp from "./WelcomeComp";
import MonthlyEarning from "./MonthlyEarning";
import RecentFile from "pages/FileManager/RecentFile";
import ChartjsChart from "pages/Charts/ChartjsChart";


//i18n
import { withTranslation } from "react-i18next";
import { Rectangle } from "react-leaflet";

const Dashboard = props => {
  
  const reports = [
    { title: "Total hours", iconClass: "bx bxs-time", description: "40" },
    { title: "Remaining hours", iconClass: "bx bxs-timer", description: "10" },
    {
      title: "Timesheets submitted",
      iconClass: "bx bxs-calendar-check",
      description: "1",
    },
  ];
  //meta title
  document.title = "Dashboard | Skote - React Admin & Dashboard Template";


  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumb */}
          {/* <Breadcrumbs
            title={props.t("Dashboards")}
            breadcrumbItem={props.t("Dashboard")}
          /> */}

<Row>
            <Col xl="4">
              <WelcomeComp />
              <MonthlyEarning />
            </Col>
            
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
              <Row>
            <ApexCharts/>
            </Row>
            </Col>
            
          </Row>
          {/* <Row>
            <DatatableTables/>
          </Row> */}

          <Row>
          <Col sm="6">
          <RecentFile/>
          </Col>
          <Col sm="6">
          <ChartjsChart/>
          </Col>
          </Row>

        </Container>
      </div>
    </React.Fragment>
  );
};

Dashboard.propTypes = {
  t: PropTypes.any,
  chartsData: PropTypes.any,
  onGetChartsData: PropTypes.func,
};

export default withTranslation()(Dashboard);
