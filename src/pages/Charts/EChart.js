import React from "react"
import { Row, Col, Card, CardBody, CardTitle, Container } from "reactstrap"

import Doughnut from "../AllCharts/echart/doughnutchart"


const EChart = () => {
  
  return (
    <React.Fragment>
      <div className="page-content pt-0 ps-0 pe-0">
        <Container fluid={true}>
          <Row>
            <Col lg="12">
              <Card>
                <CardBody>
                  <CardTitle>Your monthly performance</CardTitle>
                  <div id="doughnut-chart" className="e-chart">
                    <Doughnut dataColors='["--bs-primary","--bs-info", "--bs-success"]'/>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default EChart