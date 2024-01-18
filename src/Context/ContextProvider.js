import React , {useContext,createContext,useState,useEffect} from "react";
import { auth, storage } from "firebase-config";
import {getDownloadURL,ref,uploadBytes} from 'firebase/storage'
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {collection,getDoc,query,where,orderBy,onSnapshot,doc,getDocs} from 'firebase/firestore'
import Cookies from "js-cookie";
import { db } from "firebase-config";
const StateContext=createContext();
export const ContextProvider=({children})=>{
  const [url,setUrl]=useState('')
  const [user,setUser]=useState()
  const [detail,setDetail]=useState([])
  const [request,setRequest]=useState([])
  const [subscribemodal,setSubscribemodal]=useState(false)
  const [modal_backdrop, setmodal_backdrop] = useState(false);
  const [id,setId]=useState('')
  useEffect(()=>{
    onAuthStateChanged(auth,(user)=>{
      if(user){
      setUser(user.uid)
      }
    })
    async function getURL(user){
      if(user){
        const docRef = doc(db, "admin", user);
        const docSnap = await getDoc(docRef)
        if(docSnap.exists()){ 
        const filteredUsersQuery = query(collection(db, 'leave submssion'), where('reportManager', '==', docSnap.data().name), orderBy('timestamp','asc'));
        onSnapshot(filteredUsersQuery, (data) => {
          setRequest(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
        })
        const filteredApprovalQuery =query(collection(db,'leave submssion'),where('email','==',docSnap.data().email), where('status', 'in', ['approved', 'denied']),orderBy('timestamp','desc'));
          onSnapshot(
            filteredApprovalQuery,(data)=>{
              setDetail(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
          },(error)=>{
            console.log(error)
          })
        }
        const fileRef=ref(storage,'users/'+user+'.jpg');
        await getDownloadURL(fileRef).then((url) => {
          setUrl(url)
        }).catch((err)=>{
          console.log(err);
        })
      }
    }
    getURL(user)
  },[user])


 
  var today = new Date();
    var startDate = new Date()
    startDate.setDate(today.getDate() - today.getDay());
    var endDate = new Date()
    endDate.setDate(startDate.getDate() + 4)
    const [startdate, setStartDate] = useState(startDate);
    const [enddate, setEndDate] = useState(endDate);    
    const [workedHours,setWorkedHours]=useState(0)
    startdate.setHours(0);
    startdate.setMinutes(0);
    startdate.setSeconds(0);
    startdate.setMilliseconds(0);
    enddate.setHours(23);
    enddate.setMinutes(59);
    enddate.setSeconds(59);
    enddate.setMilliseconds(59);
    const [leaveData,setLeaveData]=useState([])
const name=Cookies.get('name')

useEffect(()=>{
    const getData=async()=>{
        // const collection=collection(db,'timesheet')
        const filteredUsersQuery =query(collection(db,'leave submssion'),where('name','==',name));
        
        const data=await getDocs(filteredUsersQuery).catch((err)=>{
        
        })
        setLeaveData(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
        
    }
    getData()
  },[])



const graphdetails=leaveData.filter((detail)=>new Date(detail.from).getFullYear()==today.getFullYear()||new Date(detail.to).getFullYear()==today.getFullYear())



const leave=[0,0,0,0,0,0,0,0,0,0,0,0]
const nextyearleave=[0,0,0,0,0,0,0,0,0,0,0,0]
let checkyear=new Date()
let checkyear2=new Date()
checkyear2.setDate(checkyear.getDate()-1)

for(let i=0;i<graphdetails.length;i++){
  if(graphdetails[i].status==="approved" && graphdetails[i].leaveType!=='WFH'){
  let sDate=new Date(graphdetails[i].from)
  let eDate=new Date(graphdetails[i].to)
  const today=new Date();
  while(sDate<=eDate){
    if(sDate.getDay()==5 || sDate.getDay()==6){
      sDate=sDate
    }
    else if(sDate.getMonth()!=eDate.getMonth() && sDate.getFullYear()==today.getFullYear()){
      leave[sDate.getMonth()]++
    }
    else if(sDate.getFullYear()==today.getFullYear()){
      leave[eDate.getMonth()]++
    }
    else if(sDate.getFullYear()!=today.getFullYear()){
      nextyearleave[sDate.getMonth()]++
    }

    sDate.setDate(sDate.getDate()+1)
  }
}
}

var available=[1.5,0,0,0,0,0,0,0,0,0,0,0]
let earnedLeave=0

for(let i=0;i<available.length;i++){
const remaining=available[i]-leave[i]
if(remaining>0){
if(i==11){
  earnedLeave+=remaining/2
}
else{
available[i+1]+=remaining
}
}
if(i!==11){
available[i+1]+=1.5
}
}
    return (<StateContext.Provider value={{startdate,enddate,setStartDate,setEndDate,workedHours,setWorkedHours,url,detail,setDetail,subscribemodal,setSubscribemodal,id,setId,request,earnedLeave,available,leave,modal_backdrop,setmodal_backdrop}}>
        {children}
    </StateContext.Provider>)
}
export const useStateContext = () => useContext(StateContext);