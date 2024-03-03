import React, { useEffect, useState } from 'react'
import { db } from 'firebase-config'
import { getDoc, getDocs,doc,collection, query, where, onSnapshot } from 'firebase/firestore'
import { useParams } from 'react-router-dom'
import TeamRequestsTable from '../TeamRequestsTable'
import {Row,Col} from 'reactstrap'
const ViewTeamTimesheet = () => {
    const param = useParams()
    console.log(param.id)
    const [data,setData] = useState([])
    const [timesheet,setTimesheet] = useState([])
    useEffect(()=>{
        const getData=async()=>{
            const docRef = doc(db,'users',param.id)
            const docSnap = await getDoc(docRef).catch((err)=>console.log(err))
            if(docSnap.exists()){
                setData(docSnap.data())
                const filteredTimesheetQuery = query(collection(db,'timesheet'),where('name','==',docSnap.data().name))
                onSnapshot(filteredTimesheetQuery,(data)=>{
                    setTimesheet(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
                })
            }
        }
        getData()
    },[])
    console.log(timesheet)
  return (
    <div className='page-content'>
    <Row>
      <Col lg="12">
        <TeamRequestsTable data = {timesheet} request= {false} />
      </Col>
    </Row>
  </div>
  )
}

export default ViewTeamTimesheet