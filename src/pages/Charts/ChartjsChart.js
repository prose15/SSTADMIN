import React from "react"

import { Row, Col, Card, CardBody, CardTitle, Container } from "reactstrap"

import DountChart from "../AllCharts/chartjs/dountchart"

const ChartjsChart = () => {

  return (
    <React.Fragment>
      <div className="page-content pt-0">
        <Container fluid={true}>
          <Row>
            <Col sm={12}>
              <Card>
                <CardBody>
                  <CardTitle className="mb-5">Your week perfromance</CardTitle>
                  <Row className="justify-content-center mb-4">
                    <Col sm={4}>
                      <div className="text-center">
                        <h5 className="mb-0">40</h5>
                        <p className="text-muted text-truncate">Total</p>
                      </div>
                    </Col>
                    <Col sm={4}>
                      <div className="text-center">
                        <h5 className="mb-0">30</h5>
                        <p className="text-muted text-truncate">Worked</p>
                      </div>
                    </Col>
                    <Col sm={4}>
                      <div className="text-center">
                        <h5 className="mb-0">17</h5>
                        <p className="text-muted text-truncate">Pending</p>
                      </div>
                    </Col>
                  </Row>

                  <DountChart  dataColors='["--bs-primary", "#ebeff2"]'/>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default ChartjsChart
