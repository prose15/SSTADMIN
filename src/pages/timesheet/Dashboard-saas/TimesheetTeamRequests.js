import React ,{useState , useEffect} from 'react'
import {Row,Col} from 'reactstrap'
import TeamRequestsTable from './TeamRequestsTable'
import Section from './Section'
import Cookies from 'js-cookie'
import { db } from "firebase-config";
import { useStateContext } from 'Context/ContextProvider'
import { getDocs, collection,doc,getDoc,updateDoc,addDoc,query,where,orderBy,onSnapshot } from 'firebase/firestore'
const TimesheetTeamRequests = () => {
  const {timesheetRequest} = useStateContext()
  return (
    <div className='page-content'>
      <Row>
        <Col lg="12">
        <Section  btn={'Add Services'} link={'/timesheet/logtime'}/>
          <TeamRequestsTable data = {timesheetRequest}  request={true} />
        </Col>
      </Row>
    </div>
  )
}

export default TimesheetTeamRequests