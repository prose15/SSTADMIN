import React from 'react'
import {Row,Col} from 'reactstrap'
import LatestTranaction from "./LatestTranaction";

const TeamRequests = () => {
  return (
    <div>
      <Row>
        <Col lg="12">
          <LatestTranaction/>
        </Col>
      </Row>
    </div>
  )
}

export default TeamRequests