// import { db } from 'firebase-config';
// import { collection, getDocs, where, query,getDoc } from 'firebase/firestore'
// import Cookies from 'js-cookie'
// import React ,{useState,useEffect} from "react";

// // const dbstore = () => {
// //   return (
// //     <div>dbstore</div>
// //   )
// // }

// const [name,setName]=useState('')
// const [email,setEmail]=useState('')
// const [casual,setCasual]=useState(0);
// const [lop,setLop]=useState(0);
// const [earned,setEarned]=useState(0);
// const [paternity,setPaternity]=useState(0);
// const [sick,setSick]=useState(0);
// const [casualAvail,setCasualAvail]=useState(0);
// const [lopAvailable,setLopAvail]=useState(0);
// const [earnedAvailable,setEarnedAvail]=useState(0);
// const [paternityAvailable,setPaternityAvail]=useState(0);
// const [sickAvailable,setSickAvail]=useState(0);
// const [user, setUser] = useState(null);
// //  const collectionRef = collection(db, 'leave submssion')

// const [details,
//  setDetails]=useState([]);
//  useEffect(()=>{

//      const handleGet=async()=>{
//          const docRef = doc(db, "users", JSON.parse(sessionStorage.getItem('uid')));
//          setName(()=>Cookies.get('name'))
//  const docSnap = await getDoc(docRef)
// //  const dataSet = await getDocs(collectionRef);
//         //  setDetails(dataSet.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
//  if(docSnap.exists()){
//  var data=docSnap.data().name
//  setCasual(docSnap.data().casual)
//  setEarned(docSnap.data().earned)
//  setPaternity(docSnap.data().paternity)
//  setLop(docSnap.data().lop)
//  setSick(docSnap.data().sick)
  
//   setEmail(docSnap.data().email)
//   if(docSnap.data().casualAvailable<=0){
//      setCasualAvail(0)
//   }
//   else{
//      if(docSnap.data().casualAvailable==12){
//          setCasualAvail(12)
//      }
//      else{
//   setCasualAvail(docSnap.data().casualAvailable )
//      }
//   }
//   if(docSnap.data().earnedAvailable<=0){
//      setEarnedAvail(0)
//   }else{
//      if(docSnap.data().earnedAvailable==12){
//          setEarnedAvail(12)
//      }
//      else{
//          setEarnedAvail(docSnap.data().earnedAvailable)
//      }
 
//   }
//   if(docSnap.data().paternityAvailable==0){
//      setPaternityAvail(0)
//   }
//   else{
//   setPaternityAvail(docSnap.data().paternityAvailable)
//   }
//   if(docSnap.data().lopAvailable==0){
//      setLopAvail(0)
//   }else{
//      setLopAvail(docSnap.data().lopAvailable)
//   }
//  if(docSnap.data().sickAvailable<=0){
//      setSickAvail(0)
//  }
//  else{
//      if(docSnap.data().sickAvailable==12){
//          setSickAvail(12)
//      }
//      else{
//          setSickAvail(docSnap.data().sickAvailable)
//      }
     
//  }
  
  
//  }
// }
//   handleGet()   
//      },[]
//    )
//    let  days = { casual:casualAvail,earned:earnedAvailable,lop:lopAvailable,paternity:paternityAvailable,sick:sickAvailable  }
//   const booked={ casual: casual, earned: earned, lop:  lop, paternity: paternity, sick: sick }
   
//    // }
// export {days,booked}
   