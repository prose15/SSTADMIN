import React from 'react'
import { Card, CardBody, Container, Row, Col, CardTitle } from 'reactstrap'
import { Doughnut } from 'react-chartjs-2'
import { useStateContext } from 'Context/ContextProvider';
import getChartColorsArray from "../../../components/Common/ChartsDynamicColor";
const CostCenterChart = ({dataColors}) => {
  const {ccMembers,ccData} = useStateContext()
    const chartData=ccData
    var doughnutChartColors =  getChartColorsArray(dataColors); 
    const data = {
        labels: ccMembers,
        datasets: [
          {
            data: chartData,
            backgroundColor: doughnutChartColors,
            hoverBackgroundColor: doughnutChartColors,
            hoverBorderColor: "#fff",
          },
        ],
      }
      return (
        <React.Fragment>
          <div className="page-content pt-0 ps-0 pe-0">
            <Container fluid={true}>
              <Row>
                <Col lg="12">
                  <Card>
                    <CardBody>
                      <CardTitle>Cost center Report</CardTitle>
                      <div id="doughnut-chart" className="e-chart">
                        <Doughnut  data={data} width={734} height={500} className="chartjs-chart" />
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

export default CostCenterChart