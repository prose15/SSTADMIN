import { db } from "firebase-config"
import { getDoc,doc, updateDoc,collection,Timestamp } from "firebase/firestore"
import Cookies from "js-cookie";
export const Accept = async(id) =>{
  const docRef = doc(db, 'WFH',id)
  const docSnap = await getDoc(docRef);

  if(docSnap.exists()){
    const detail= docSnap.data()
    let rpm = []
    let status=[]
    if (detail.team === 'Delivery') {
      rpm = [...rpm,'Yuvashini', 'Keerthana',]
      status=[...status,'L1 approved','approved','approved']
      let forwardedRpm=rpm.filter((data,index)=>(index>0))
      forwardedRpm.push('')
      console.log('arr',forwardedRpm)
      let flag=0;
      let index1=0;
      if(Cookies.get('level')==='L3'){
        detail.reportManager=forwardedRpm[forwardedRpm.length-1]
        detail.status=status[status.length-1]
        detail.timestamp=Timestamp.now()
      }
      else{
        rpm.map((data,index)=>{
          if(detail.reportManager===data){
            flag=1
            index1=index
          }
        })
        if(flag==1){
          detail.reportManager=forwardedRpm[index1]
            detail.status=status[index1]
            detail.timestamp=Timestamp.now()
        }
      } 
    }
    else if (detail.team === 'Sales') {
      rpm = [...rpm,'Balaji', 'Keerthana',]
      status=[...status,'L1 approved','approved','approved']
      let forwardedRpm=rpm.filter((data,index)=>(index>0))
      forwardedRpm.push('')
      console.log('arr',forwardedRpm)
      let flag=0;
      let index1=0;
      if(Cookies.get('level')==='L3'){
        detail.reportManager=forwardedRpm[forwardedRpm.length-1]
        detail.status=status[status.length-1]
        detail.timestamp=Timestamp.now()
      }
      else{
        rpm.map((data,index)=>{
          if(detail.reportManager===data){
            flag=1
            index1=index
          }
        })
        if(flag==1){
          detail.reportManager=forwardedRpm[index1]
            detail.status=status[index1]
            detail.timestamp=Timestamp.now()
        }
      } 
    }
    else if (detail.team === 'HR') {
      rpm = [...rpm,'Keerthana', 'Gobi']
      status=[...status,'L1 approved','approved']
      status=[...status,'L1 approved','approved','approved']
      let forwardedRpm=rpm.filter((data,index)=>(index>0))
      forwardedRpm.push('')
      console.log('arr',forwardedRpm)
      let flag=0;
      let index1=0;
      if(Cookies.get('level')==='L3'){
        detail.reportManager=forwardedRpm[forwardedRpm.length-1]
        detail.status=status[status.length-1]
        detail.timestamp=Timestamp.now()
      }
      else{
        rpm.map((data,index)=>{
          if(detail.reportManager===data){
            flag=1
            index1=index
          }
        })
        if(flag==1){
          detail.reportManager=forwardedRpm[index1]
            detail.status=status[index1]
            detail.timestamp=Timestamp.now()
        }
      } 
        
      }
 
    console.log(detail)

    const WFHDoc = doc(collection(db,'WFH'), id)

    updateDoc(WFHDoc, detail).then(() => {
      console.log('added successfully');
    }).catch((err) => {
      console.log(err);
    })
  }
  
}