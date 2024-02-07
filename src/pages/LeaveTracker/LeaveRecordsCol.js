import React, { useEffect, useState } from 'react'
import { Badge,DropdownMenu,DropdownToggle,UncontrolledDropdown,Button } from 'reactstrap';
import { Link,useNavigate } from 'react-router-dom';
import Tooltip from '@mui/material/Tooltip';
import { db } from "firebase-config"
import { getDoc,doc, deleteDoc ,updateDoc } from "firebase/firestore"
import Cookies from 'js-cookie';
const Status = (cell) => {

    return (
        <Badge
          className={"font-size-11 badge-soft-" + 
          (( cell.value==='approved')?('success'):(cell.value==='L1 approved' || cell.value==='pending'?('warning'):((cell.value==='revoke'|| cell.value==='escalate')?('info'):(cell.value==='re-apply')?('secondary'):('danger'))))}          
        >
          {cell.value}
        </Badge>
    )
};
const ReverseDate=(cell)=>{
  const date=cell.value.split('-').reverse().join('-')
  return (
    <>
    {date}
    </>
  )
}
let details=[]
const team=Cookies.get('team')
let reportingManager=''
  if(team==='Delivery'){
      details=[...details,"Yuvashini",'Keerthana','Gobi',]
      reportingManager=details[details.length-1]
  }
  else if(team==='Sales'){
     details= [...details,"Balaji",'Keerthana','Krishna kumar']
     reportingManager=details[details.length-1]
  }
  else if(team==='HR'){
      details= [...details,'Keerthana','Gobi']
      reportingManager=details[details.length-1]
  }

const deleteData=async(id)=>{   
    await deleteDoc(doc(db, "leave submssion", id)).then(()=>{
    }).catch((err)=>{
        console.log(err);
    })
    }
   async function revokeEmail(data) {
    const docRef = doc(db, "leave submssion",data );
    const docUser = doc(db,"admin", JSON.parse(sessionStorage.getItem('uid')))
    const RevokeData = await getDoc(docRef)
    const RevokeUserData = await getDoc(docUser)
    const leaveData = RevokeData.data()
    const userProfile= RevokeUserData.data()
   if(RevokeData.exists() && RevokeUserData){
    if(!leaveData.subLeave){
      await updateDoc(doc(db,'leave submssion',data),{status:'revoke'}).catch((err)=>console.log(err))
     }
     else{
      if(leaveData.subLeave==='both'){
        userProfile.earnedAvailable = userProfile.earnedAvailable- leaveData.
        earnedBooked
        userProfile.lopAvailable = userProfile.lopAvailable-leaveData.
        lopBooked
      }
      else{
       userProfile[subLeave+'Available']-=leaveData.subLeave+'Booked'
      }
    }
    await updateDoc(doc(db,'admin',JSON.parse(sessionStorage.getItem('uid')),userProfile)).catch((err)=>console.log(err))
    await updateDoc(doc(db,'leave submssion',data),{status:'revoke'}).catch((err)=>console.log(err))
        let recipient
       if(Cookies.get('team').includes('Delivery')||Cookies.get('team').includes('HR')){
            recipient='ngobi@isupportz.com';
       }
       else if(Cookies.get('team').includes('Sales')){
        recipient='krishnakumar@isupportz.com';
       }
        const subject = 'Revoke mail';
        const body = 'Body of the email';
    
        // Construct the mailto URL
        const mailtoUrl = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        window.location.href = mailtoUrl;
   }else{
    console.log("No data found");
   }

 
      
    }
   
   async function composeEmail(data) {
    await updateDoc(doc(db, "leave submssion", data),{status:'escalate',reportManager:reportingManager}).then(()=>{

      let recipient
      if(Cookies.get('team').includes('Delivery')||Cookies.get('team').includes('HR')){
           recipient='ngobi@isupportz.com';
      }
      else if(Cookies.get('team').includes('Sales')){
       recipient='krishnakumar@isupportz.com';
      }
       const subject = 'Escalation mail';
       const body = 'Body of the email';
   
       // Construct the mailto URL
       const mailtoUrl = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
       window.location.href = mailtoUrl;
    }
      ).catch((err)=>{
        console.log(err);
      })
      }
const Actions=(cell)=>{
    const [data,setData]=useState(null)
    useEffect(()=>{
        const getData=async()=>{
            const docRef = doc(db, 'leave submssion',cell.value)
            const docSnap = await getDoc(docRef);
            if(docSnap.exists()){
               setData(docSnap.data()) 
            }
        }
        getData()
    },[])
   
  const today=new Date()  
  const nav= useNavigate()
    return(
       
            <UncontrolledDropdown className="ms-auto">
                <DropdownToggle
                  className="text-muted font-size-14"
                  tag="a"
                  color="white"
                >
                  <i className="mdi mdi-dots-horizontal"></i>
                </DropdownToggle>
                <DropdownMenu className="dropdown-menu-end">
                    {
                        (data && data.status.includes('denied'))?(
                        <Tooltip className="dropdown-item" title={data.reasonOfReject} placement='top' arrow>
                        Reason of Reject
                    </Tooltip>
                    ):(<></>)
                    }
                    {
                      (data && data.status.includes('denied') && data && new Date(data.from)>=today)?(
                        <>
                         <Button className='btn dropdown-item' onClick={()=>{nav(`/addleave/${cell.value}`)}}> 
                         Apply Again
                         <i className="ms-2 far fa-hand-pointer font-size-17"/>
                       </Button> 
                       </>
                    ):(<></>)
                    }
                  {
                    (data && data.status.includes('L1 approved')||data && data.status.includes('pending'))?(
                      <Button className='btn dropdown-item' onClick={()=>composeEmail(cell.value)}> 
                        
                    Escalate
                    <i className="ms-4 far fa-envelope font-size-17"/>
                  
                  </Button> 
                    ):(<></>)
                  }

{
                    (data && data.status.includes('approved')&& data && new Date(data.from)>=today)?(
                      <Button className='btn dropdown-item' onClick={()=>revokeEmail(cell.value)}> 
                       <span className='me-2'>Revoke</span> 
                    <i className="ms-4 far fa-envelope font-size-17"/>
                  </Button> 
                    ):(<></>)
                  }
                  {
                    (data && data.status.includes('pending'))?(
                        <Link className="dropdown-item d-flex d-inline" to="#" onClick={()=>deleteData(cell.value)}>
                   <span className='me-3'>Delete</span>
                    <i className=" ms-4 dripicons-trash font-size-17"></i>
                  </Link>
                    ):(<></>)
                  }
                  
                </DropdownMenu>
            </UncontrolledDropdown>
    )
}

export {Status,Actions,ReverseDate}