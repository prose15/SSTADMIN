import React, { useEffect, useState } from 'react';
import { Card, CardBody} from 'reactstrap';
import './indexcss.css';
import {doc,getDoc,getDocs,collection, updateDoc} from 'firebase/firestore'
import {db,auth} from 'firebase-config'
import Cookies from 'js-cookie'
const Leavecards = () => {
//     let dispatch=useDispatch();
//     useEffect(()=>{
// dispatch(getContactStart());
//     },[])
//     const {contacts:data}=useSelector(state=>state.data)
//     console.log(data,state);
const [spinner,setSpinner]=useState(true)
const [name,setName]=useState('')
const [email,setEmail]=useState('')
const [casual,setCasual]=useState(0);
const [lop,setLop]=useState(0);
const [earned,setEarned]=useState(0);
const [paternity,setPaternity]=useState(0);
const [sick,setSick]=useState(0);
const [casualAvail,setCasualAvail]=useState(0);
const [lopAvailable,setLopAvail]=useState(0);
const [earnedAvailable,setEarnedAvail]=useState(0);
const [paternityAvailable,setPaternityAvail]=useState(0);
const [sickAvailable,setSickAvail]=useState(0);
let user
 useEffect(()=>{

     const handleGet=async()=>{
         const docRef = doc(db, "admin", JSON.parse(sessionStorage.getItem('uid')));
         setName(()=>Cookies.get('name'))
       
 const docSnap = await getDoc(docRef)
 if(docSnap.exists()){
 var data=Cookies.get('name')
 setCasual(docSnap.data().casual)
 setEarned(docSnap.data().earned)
 setPaternity(docSnap.data().paternity)
 setLop(docSnap.data().lop)
 setSick(docSnap.data().sick)
  
  setEmail(Cookies.get('email'))
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
     if(docSnap.data().earnedAvailable==12){
         setEarnedAvail(12)
     }
     else{
         setEarnedAvail(docSnap.data().earnedAvailable)
     }
 
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
     
 }}
}
  handleGet()   
     },[]
   )


   let leavetype=localStorage.getItem('type')
      
   if(leavetype==='Casualleave'){
     leavetype='casual'
   }
   else if(leavetype==='Earnedleave'){
     leavetype='earned'
   }
   else if(leavetype==='Sickleave'){
     leavetype='sick'
   }
  else if (leavetype==='Paternityleave'){
     leavetype='paternity'
   }

   

  
 let  days = { casual:casualAvail,earned:earnedAvailable,lop:lopAvailable,paternity:paternityAvailable,sick:sickAvailable  }
 const booked={ casual: casual, earned: earned, lop:  lop, paternity: paternity, sick: sick }
 useEffect(()=>{
   const  getData=async()=>{
     for(let i in booked){
         if(i===leavetype){
             const docRef = doc(db, "admin", JSON.parse(sessionStorage.getItem('uid')));
             const docSnap = await getDoc(docRef)
             const newData=docSnap.data();
             newData[leavetype]+=1;
             updateDoc(docRef,newData)
             localStorage.removeItem('type')
            
             break;
             
         }
     }
 }
 getData()
 },[days,booked])


  return (
    <div className="d-flex  cards-box">
    <Card className="leave-cards d-inline me-3">
        <CardBody className="p-4">
            <div className="text-center mb-3 text-primary">
          
                <i className="fas fa-umbrella-beach fa-2x "></i>
                    <h5 className="mt-4 mb-2 font-size-15"><b>Casual Leave</b></h5>
            </div>

            <div className="d-flex">
                <p className="mb-0 flex-grow-1 text-success me-5">
                    Available {casualAvail}</p>
                    
                <p className="mb-0 text-danger">Booked  {casual}</p>
            </div>
        </CardBody>
    </Card>
    <Card className="leave-cards d-inline me-3">
        <CardBody className="p-4">
            <div className="text-center mb-3 text-primary">
           <i className="fas fa-hospital fa-2x"></i>
                    <h5 className="mt-4 mb-2 font-size-15"><b>Sick Leave</b></h5>
            </div>

            <div className="d-flex">
                <p className="mb-0 flex-grow-1 text-success me-5">Available  {sickAvailable}</p>
                <p className="mb-0 text-danger">Booked  {sick}</p>
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
                <p className="mb-0 flex-grow-1 text-success me-5">Available {Cookies.get('earnedLeave')}</p>
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
                <p className="mb-0 flex-grow-1 text-success me-5">Available  {paternityAvailable}</p>
                <p className="mb-0 text-danger">Booked  {paternity}</p>
            </div>
        </CardBody>
    </Card>
    <Card className="leave-cards d-inline me-3">
        <CardBody className="p-4">
            <div className="text-center mb-3 text-primary">
            <i className='fas fa-exclamation-circle fa-2x'></i>
                    <h5 className="mt-4 mb-2 font-size-15"><b>Loss of pay</b></h5>
            </div>

            <div className="d-flex">
                <p className="mb-0 flex-grow-1 text-success me-5">
                    Available  {lopAvailable}</p>
                <p className="mb-0 text-danger">Booked  {lop}</p>
            </div>
        </CardBody>
    </Card>
    </div>
  )
}

export default Leavecards