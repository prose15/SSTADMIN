import React from "react";
import Apaexlinecolumn from "../AllCharts/Apex/apaexlinecolumn"
import { Row, Col, Card, CardBody, CardTitle } from "reactstrap"
const Apexchart = () => {
  return (
    <React.Fragment>
      <div className="page-content pt-0">
        <div className="container-fluid">
          <Row>
            <Col sm={12}>
              <Card>
                <CardBody>
                  <CardTitle className="mb-4"> Ticket performance </CardTitle>
                  <Apaexlinecolumn dataColors='["--bs-danger","--bs-primary", "--bs-success"]'/>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    </React.Fragment>
  )
}

export default Apexchart
