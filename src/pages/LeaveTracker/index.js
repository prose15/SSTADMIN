import React from 'react';
import { Container, Row,Col, Card, CardBody, CardTitle  } from 'reactstrap';
import CandidateSection from './CandidateSection';
import Apaexlinecolumn from "../AllCharts/apex/apaexlinecolumn"
import Section from './Section';
import Leavecards from './Leavecards';
import FormLayouts from 'pages/Forms/FormLayouts';


const LeaveTracker = () => {

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