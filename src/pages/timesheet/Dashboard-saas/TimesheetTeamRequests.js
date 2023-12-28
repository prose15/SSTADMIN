import React from 'react'
import {Row,Col} from 'reactstrap'
import TeamRequestsTable from './TeamRequestsTable'
import Section from './Section'
const TimesheetTeamRequests = () => {
  return (
    <div className='page-content'>
      <Row>
        <Col lg="12">
        <Section  btn={'Log Time'} link={'/timesheet/logtime'}/>
          <TeamRequestsTable/>
        </Col>
      </Row>
    </div>
  )
}

export default TimesheetTeamRequests