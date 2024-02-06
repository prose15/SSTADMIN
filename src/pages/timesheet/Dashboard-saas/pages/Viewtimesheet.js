import { db } from 'firebase-config'
import { doc, getDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import dataArray from './dataArray'
import TimesheetCard from './TimesheetCard'
const Viewtimesheet = () => {
    const obj = useParams()
    const [data,setData]=useState({})
    useEffect(()=>{
        const getData=async()=>{
           const docRef = doc(db,'timesheet',obj.id)
           const data =  await getDoc(docRef)
           if(data.exists()){
            const arr = data.data().data
            setData(arr)
           }
        }
        getData()
    },[])

    const {sun,mon,tue,wed,thu,fri,sat} = dataArray(data)
    const days={
        sun,mon,tue,wed,thu,fri,sat
    }

  return (
 <TimesheetCard {...days} />
  )
}

export default Viewtimesheet