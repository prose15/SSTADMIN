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
      className={
        "font-size-11 badge-soft-" +
        (cell.value === "approved"
          ? "success"
          : cell.value === "L1 approved" || cell.value === "pending"
          ? "warning"
          : cell.value === "revoke" || cell.value === "escalate"
          ? "info"
          : cell.value === "re-apply"
          ? "secondary"
          : "danger")
      }
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
    
    await deleteDoc(doc(db, "WFH", id)).then(()=>{
        console.log('deleted successfully');
    }).catch((err)=>{
        console.log(err);
    })
    }
   async function revokeEmail(data) {
    const docRef= doc(db,'WFH',data)
    const userRef = doc(db,'admin',JSON.parse(sessionStorage.getItem('uid')))
    const userSnap = await getDoc(userRef)
    const docSnap = await getDoc(docRef)
    if(docSnap.exists() && userSnap.exists()){
      const WFHData=docSnap.data()
      const userData = userSnap.data()
      userData.WFHApproved = userData.WFHApproved-WFHData.approvedDates.length
      await updateDoc(userRef,userData).catch((err)=>{
        console.log(err)
      })
    await updateDoc(doc(db, "WFH", data),{status:'revoke',reportManager:''}).then(()=>{
      console.log('updated successfully');
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
  }).catch((err)=>{
      console.log(err);
  })
}  
    }
   async function composeEmail(data) {
    await updateDoc(doc(db, "WFH", data),{status:'escalate',reportManager:reportingManager}).then(()=>{
      console.log('updated successfully');
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
    const [arr,setArr]=useState([])
    const dates=[]
    useEffect(()=>{
        const getData=async()=>{
            const docRef = doc(db, 'WFH',cell.value)
            const docSnap = await getDoc(docRef);
            if(docSnap.exists()){
               setData(docSnap.data())
               if(docSnap.data().status==='approved'){
                setArr(docSnap.data().approvedDates)
               } 
            }
        }
        getData()
    },[])
    const timeStampToDate=(timestamp)=>{
      const date= new Date(timestamp.seconds*1000)
      return date.getDate()+"-"+(date.getMonth()+1)+"-"+date.getFullYear()
     }
    if(data &&  data.status==='approved'){
      arr.map((date)=>{
      dates.push(timeStampToDate(date))  
      })
    }
 
  
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
                       (data && data.status.includes('approved'))?(
                        <UncontrolledDropdown >
                            <DropdownToggle className="dropdown-item"
                  tag="a"
                  color="white">
                              Approved Dates
                            </DropdownToggle>
                            <DropdownMenu className="dropdown-menu-end">
                              {
                                  dates.map((date)=>(
                                    <div className="dropdown-item"  key={date}>{date}</div>
                                  ))
                              }
                            </DropdownMenu>
                          </UncontrolledDropdown>
                    ):(<></>)
                    }
                    {
                      (data && data.status.includes('denied') && data && new Date(data.from)>=today)?(
                        <>
                         <Button className='btn dropdown-item' onClick={()=>{nav(`/WFH/apply-again/${cell.value}`)}}> 
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