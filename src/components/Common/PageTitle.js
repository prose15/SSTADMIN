import React from 'react'
import { Col, Row } from 'reactstrap';

const PageTitle = (props) => {
  return (
    <React.Fragment>
    <Row className="mb-4">
        <Col lg={12}>
            <div className="d-flex align-items-center">
                <div className="ms-3 flex-grow-1 ">
                    <h5 className="mb-2 card-title">{props.title}</h5>
                </div>
            </div>
        </Col>
    </Row>
</React.Fragment>
  )
}


export default PageTitle