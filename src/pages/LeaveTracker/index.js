import React from 'react';
import { Container, Row,Col, Card, CardBody, CardTitle  } from 'reactstrap';
import CandidateSection from './CandidateSection';
import Apaexlinecolumn from "../AllCharts/apex/apaexlinecolumn"
import Section from './Section';
import Leavecards from './Leavecards';
import FormLayouts from 'pages/Forms/FormLayouts';


const LeaveTracker = () => {
    const chartsData = [
        {
            id: 1,
            title: "Job View",
            price: "14,487",
            perstangeValue: "18.89",
            bagdeColor: "success",
            seriesData: [{
                name: "Job View",
                data: [36, 21, 65, 22, 35, 50, 87, 98],
            }],
            color: '["--bs-success", "--bs-transparent"]'
        },
        {
            id: 2,
            title: "New Application",
            price: "7,402",
            perstangeValue: "24.07",
            bagdeColor: "success",
            seriesData: [{
                name: "New Application",
                data: [36, 48, 10, 74, 35, 50, 70, 73],
            }],
            color: '["--bs-success", "--bs-transparent"]'
        },
        {
            id: 3,
            title: "Total Approved",
            price: "12,487",
            perstangeValue: " 8.41",
            bagdeColor: "success",
            seriesData: [{
                name: "Total Approved",
                data: [60, 14, 5, 60, 30, 43, 65, 84],
            }],
            color: '["--bs-success", "--bs-transparent"]'
        },
        {
            id: 4,
            title: "Total Rejected",
            price: "12,487",
            perstangeValue: " 20.63",
            bagdeColor: "danger",
            istrendingArrow: true,
            seriesData: [{
                name: "Total Rejected",
                data: [32, 22, 7, 55, 20, 45, 36, 20],
            }],
            color: '["--bs-danger", "--bs-transparent"]'
        },
        {
            id: 4,
            title: "Total Rejected",
            price: "12,487",
            perstangeValue: " 20.63",
            bagdeColor: "danger",
            istrendingArrow: true,
            seriesData: [{
                name: "Total Rejected",
                data: [32, 22, 7, 55, 20, 45, 36, 20],
            }],
            color: '["--bs-danger", "--bs-transparent"]'
        },
    ];
    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    <Section />   
                    <Leavecards/>
                    <Row>
                        <Col xl={6}>
                            <Card>
                                <CardBody>
                                <CardTitle className="mb-4">Leave taken as per months</CardTitle>
                                <Apaexlinecolumn dataColors='["--bs-danger","--bs-primary", "--bs-success"]'/>
                                </CardBody>
                            </Card>
                       </Col>
                       <Col xl={6}>
                             <CandidateSection />
                        </Col>
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    );
}

export default LeaveTracker;