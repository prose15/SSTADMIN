import React from 'react'
import {Row,Col} from 'reactstrap'
import TeamRequestsTable from './TeamRequestsTable'

const TimesheetTeamRequests = () => {
  return (
    <div>
      <Row>
        <Col lg="12">
          <TeamRequestsTable/>
        </Col>
      </Row>
    </div>
  )
}

export default TimesheetTeamRequests