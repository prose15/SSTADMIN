import React, { useEffect, useState } from 'react';
import { Card, CardBody} from 'reactstrap';
import './indexcss.css';
import {doc,getDoc, updateDoc} from 'firebase/firestore'
import {db} from 'firebase-config'
import Cookies from 'js-cookie'
import { useStateContext } from 'Context/ContextProvider';
const Leavecards = () => {
const {available,leave}=useStateContext()
const today=new Date()
const [balance,setBalance]=useState(0)
const [name,setName]=useState('')
const [email,setEmail]=useState('')
const [casual,setCasual]=useState(0);
const [lop,setLop]=useState(0);
const [earned,setEarned]=useState(0);
const [paternity,setPaternity]=useState(0);
const [sick,setSick]=useState(0);
const [flexi, setFlexi] = useState(0);
const [casualAvail,setCasualAvail]=useState(0);
const [lopAvailable,setLopAvail]=useState(0);
const [earnedAvailable,setEarnedAvail]=useState(0);
const [paternityAvailable,setPaternityAvail]=useState(0);
const [sickAvailable,setSickAvail]=useState(0);
const [flexiAvailable, setFlexiAvail] = useState(0);
const[revoke,setRevoke] = useState(0)
const [leaveBalance,setLeaveBalance] = useState([])
const getBalance=()=>{
    let ans=available[today.getMonth()]-leave[today.getMonth()]
    if(ans<=0){
      ans=0
    }
    return ans
  }
  const ans=getBalance()
let  updatedAvailable=[]
for(var i=0;i<available.length;i++){
    updatedAvailable[i]=available[i]-leave[i]
}
// // useEffect(()=>{
//     const updateData=async()=>{
//         const docRef = doc(db, "admin", JSON.parse(sessionStorage.getItem('uid')));
//       await  updateDoc(docRef,{leaveBalance:updatedAvailable}).catch((err)=>console.log(err))
//     }
//     updateData()
// // },[])
 useEffect(()=>{

     const handleGet=async()=>{
         const docRef = doc(db, "admin", JSON.parse(sessionStorage.getItem('uid')));
         setName(()=>Cookies.get('name'))
       
 const docSnap = await getDoc(docRef)
 if(docSnap.exists()){
 setCasual(docSnap.data().casual)
 setEarned(docSnap.data().earned)
 setPaternity(docSnap.data().paternity)
 setRevoke(docSnap.data().earned)
 setLop(docSnap.data().lop)
 setSick(docSnap.data().sick)
 setFlexi(docSnap.data().flexi)
  setEmail(Cookies.get('email'))
setLeaveBalance(docSnap.data().leaveBalance)
  if(docSnap.data().casualAvailable<=0){
     setCasualAvail(0)
  }
  else{
     if(docSnap.data().casualAvailable==12){
         setCasualAvail(12)
     }
     else{
  setCasualAvail(docSnap.data().casualAvailable )
     }
  }
  if(docSnap.data().earnedAvailable<=0){
     setEarnedAvail(0)
  }else{
         setEarnedAvail(docSnap.data().earnedAvailable)
 
  }
  if(docSnap.data().paternityAvailable==0){
     setPaternityAvail(0)
  }
  else{
  setPaternityAvail(docSnap.data().paternityAvailable)
  }
  if(docSnap.data().lopAvailable==0){
     setLopAvail(0)
  }else{
     setLopAvail(docSnap.data().lopAvailable)
  }
 if(docSnap.data().sickAvailable<=0){
     setSickAvail(0)
 }
 else{
     if(docSnap.data().sickAvailable==12){
         setSickAvail(12)
     }
     else{
         setSickAvail(docSnap.data().sickAvailable)
     }
     
 }
 if(docSnap.data().flexiAvailable<=0){
    setFlexiAvail(0)
}
else{
    setFlexiAvail(docSnap.data().flexiAvailable)
}
}
}
  handleGet()   
     },[]
   )


return (
    <div className="d-flex  cards-box">
   <Card className="leave-cards d-inline me-3">
    <CardBody className="p-4">
        <div className="text-center mb-3 text-primary">
      
            <i className="fas fa-umbrella-beach fa-2x "></i>
                <h5 className="mt-4 mb-2 font-size-15"><b>Total Leave</b></h5>
        </div>

        <div className="d-flex">
            <p className="mb-0 flex-grow-1 text-success me-5">
                Available {leaveBalance[new Date().getMonth()]}</p>
                
            <p className="mb-0 text-danger">Booked  {casual+sick+paternity+earned+lop+flexi}</p>
        </div>
    </CardBody>
</Card>
<Card className="leave-cards d-inline me-3 ps-4 pe-4" >
    <CardBody className="p-4">
        <div className="text-center mb-3 text-primary">
       <i className="fas fa-calendar-check fa-2x"></i>
                <h5 className="mt-4 mb-2 font-size-15"><b>Approved Leave</b></h5>
        </div>
        <div className="d-flex">
            <p className="mb-0 flex-grow-1 text-success me-5">Casual  {casualAvail}</p>
            <p className="mb-0 text-danger">Sick  {sickAvailable}</p>
        </div>
    </CardBody>
</Card>
    <Card className="leave-cards d-inline me-3">
        <CardBody className="p-4">
            <div className="text-center mb-3 text-primary">
                <i className="fas fa-wallet fa-2x">
                    </i>
                    <h5 className="mt-4 mb-2 font-size-15"><b>Earned leave</b></h5>
            </div>

            <div className="d-flex">
                <p className="mb-0 flex-grow-1 text-success me-5">Available {earnedAvailable}</p>
                <p className="mb-0 text-danger">Booked  {earned}</p>
            </div>
        </CardBody>
    </Card>
    <Card className="leave-cards d-inline me-3">
        <CardBody className="p-4">
            <div className="text-center mb-3 text-primary">
             <i className="mdi mdi-party-popper fa-2x">
                </i>
                    <h5 className="mt-4 mb-2 font-size-15"><b>Flexi Leave</b></h5>
            </div>

            <div className="d-flex">
                <p className="mb-0 flex-grow-1 text-success me-5">Available  {flexiAvailable}</p>
                <p className="mb-0 text-danger">Booked  {flexi}</p>
            </div>
        </CardBody>
    </Card>
    <Card className="leave-cards d-inline me-3 ps-5 pe-5"  >
        <CardBody className="p-4">
            <div className="text-center mb-3 text-primary">
            <i className='fas fa-exclamation-circle fa-2x'></i>
                    <h5 className="mt-4 mb-2 font-size-15"><b>Loss of pay</b></h5>
            </div>

            <div className=" mx-auto">
                <div className=" text-center   text-danger ">
                    No of days  {lopAvailable}
                    </div>
            </div>
             
        </CardBody>
    </Card>
    </div>
)
}

export default Leavecards