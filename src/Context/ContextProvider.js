import React , {useContext,createContext,useState,useEffect} from "react";
import { auth, storage } from "firebase-config";
import {getDownloadURL,ref,uploadBytes} from 'firebase/storage'
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {collection,getDoc,query,where,orderBy,onSnapshot,doc} from 'firebase/firestore'
import Cookies from "js-cookie";
import { db } from "firebase-config";
const StateContext=createContext();
export const ContextProvider=({children})=>{
  const [url,setUrl]=useState('')
  const [user,setUser]=useState()
  const [detail,setDetail]=useState([])
  const [request,setRequest]=useState([])
  const [subscribemodal,setSubscribemodal]=useState(false)
  
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
    return (<StateContext.Provider value={{startdate,enddate,setStartDate,setEndDate,workedHours,setWorkedHours,url,detail,setDetail,subscribemodal,setSubscribemodal,id,setId,request}}>
        {children}
    </StateContext.Provider>)
}
export const useStateContext = () => useContext(StateContext);