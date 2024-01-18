import React from 'react'
import {Row,Col} from 'reactstrap'
import WFHLatestTranaction from './WFHLatestTranaction';

const TeamRequests = () => {
  return (
    <div>
      <Row>
        <Col lg="12">
          <WFHLatestTranaction/>
        </Col>
      </Row>
    </div>
  )
}

export default TeamRequests