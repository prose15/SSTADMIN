import React from 'react'
import { useState,useEffect } from 'react';
import {collection,getDocs,query,where,orderBy} from 'firebase/firestore'
// import PropTypes from 'prop-types';
import { db } from "firebase-config";
const [details,setDetails]=useState([])
const name=Cookies.get('name')
const Leavedata=()=>{
    useEffect(()=>{
        const getData=async()=>{
            // const collection=collection(db,'timesheet')
            const filteredUsersQuery =query(collection(db,'leave submssion'),where('name','==',name),orderBy('requestDate','desc'));
            const data=await getDocs(filteredUsersQuery).catch((err)=>{
              console.log(err);
            })
            setDetails(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
        }
        getData()
      },[])
return details
}
export default Leavedata
