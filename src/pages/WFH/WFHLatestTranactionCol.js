import React, { useState } from 'react';
import { Button,Badge } from 'reactstrap';
import { Link } from 'react-router-dom';
import * as moment from "moment";
import Cookies from 'js-cookie';
// import { Badge } from 'reactstrap';
import { Reject } from './Reject';
import { Accept } from './Accept';
import { useStateContext } from 'Context/ContextProvider';
import { getDoc, updateDoc,doc } from 'firebase/firestore';
import { db } from 'firebase-config';
const formateDate = (date, format) => {
    const dateFormat = format ? format : "DD MMM Y";
    const date1 = moment(new Date(date)).format(dateFormat);
    return date1;
};
const deleteData=async(id)=>{
    const data = await getDoc(doc(db, "leave submssion", id))
    if(data.exists()){
       let obj= data.data()
        if(Cookies.get('level')==='L2'){
            obj.L2status='dislpay'
            await updateDoc(doc(db, "leave submssion", id),obj).then(()=>{
                console.log('updated successfully');
            }).catch((err)=>{
                console.log(err);
            })
        }
        else  if(Cookies.get('level')==='L3'){
            obj.L3status='display'
            await updateDoc(doc(db, "leave submssion", id),obj).then(()=>{
                console.log('updated successfully');
            }).catch((err)=>{
                console.log(err);
            })
        }
        else  if(Cookies.get('level')==='k'){
            obj.kstatus='display'
            await updateDoc(doc(db, "leave submssion", id),obj).then(()=>{
                console.log('updated successfully');
            }).catch((err)=>{
                console.log(err);
            })
        }
       
    }
    
    } 
const toLowerCase1 = str => {
    return (
      str === "" || str === undefined ? "" : str.toLowerCase()
    );
  };

const CheckBox = (cell) => {
    return cell.value ? cell.value : '';
};

const EmployeeName = (cell) => {
    return (
        <Link to="#" className="text-body fw-bold">{cell.value ? cell.value : ''}</Link>
    );
};

const workType = (cell) => {
    return cell.value ? cell.value : '';
};

const From = (cell) => {
    return cell.value ? cell.value : '';
};

const To = (cell) => {
    return cell.value ? cell.value : '';
};

const Status = (cell) => {
    return (
        <Badge
        className={"font-size-11 badge-soft-" + 
        ((cell.value==='L1 approved' || cell.value==='approved')?('success'):(cell.value==='pending'?('info'):((cell.value==='revoke'|| cell.value==='escalate')?('warning'):(cell.value==='re-apply')?('secondary'):('danger'))))}         
      >
        {cell.value}
      </Badge>
    )
};

const Reason = (cell) => {
    return cell.value?cell.value:'';
};

const Actions = ({cell,users,admin}) => {
const {setSubscribemodal,setId}=useStateContext()
    return (

        <span>
           
                <>
                <i style={{cursor:"pointer"}} className="font-size-18 text-success fas fa-check me-3" onClick={()=>Accept(cell.value)} />
                <i style={{cursor:"pointer"}} onClick={()=>{
            setSubscribemodal(true) 
            setId(cell.value)
        }}
            className="font-size-20 text-danger fas fa-times me-1"/>
                </>
        
        </span>
    )
};
export {
    CheckBox,
    EmployeeName,
    workType,
    From,
    To,
    Reason,
    Status,
    Actions
};