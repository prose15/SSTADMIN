import React , {useContext,createContext,useState,useEffect} from "react";
import { auth, storage } from "firebase-config";
import {getDownloadURL,ref,uploadBytes} from 'firebase/storage'
import { getAuth, onAuthStateChanged } from "firebase/auth";
const StateContext=createContext();
export const ContextProvider=({children})=>{
  const [url,setUrl]=useState('')
  const [user,setUser]=useState()
  const [subscribemodal, setSubscribemodal] = useState(false);
  const [id,setId] = useState('')
  useEffect(()=>{
    onAuthStateChanged(auth,(user)=>{
      if(user){
      setUser(user.uid)
      }
    })
    async function getURL(user){
      if(user){
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
    return (<StateContext.Provider value={{startdate,enddate,setStartDate,setEndDate,workedHours,setWorkedHours,url,subscribemodal,setSubscribemodal,setId,id}}>
        {children}
    </StateContext.Provider>)
}
export const useStateContext = () => useContext(StateContext);