import React,{useState} from 'react'
import { Card,Modal,CardBody,CardTitle } from 'reactstrap';
import { useStateContext } from 'Context/ContextProvider';
import { db,storage} from "firebase-config";
import { collection,addDoc, Timestamp, getDoc, doc,updateDoc } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';
import { ref, uploadBytes } from 'firebase/storage';
import Cookies from 'js-cookie';
const AlertModal = ({data,file,newData}) => {
  const email=Cookies.get('email');
  const date=new Date().getDate()+'-'+(new Date().getMonth()+1)+'-'+new Date().getFullYear()
const nav=useNavigate()
    async function upload(file){
        const fileRef=ref(storage,'MedicalProof/'+`${date}/`+email);
         await uploadBytes(fileRef,file).then(()=>{
          console.log('uploaded');
        }).catch((err)=>{
          console.log(err);
        })
      }
      const sendData=()=>{
        addDoc(collection(db,'leave submssion'),data).then(()=>{
            if(file){
              upload(file)
              
            //   setAlert('d-block')
            }
              
            //   setAlert('d-block')
            const subLeave=data.subLeave
            const lopBooked=data.lopBooked
            const earnedBooked=data.earnedBooked
              let str1=''
            let leavetype = data.leaveType
            let strArr=leavetype.split('')
            for(let i=0;i<strArr.length-5;i++){
                str1+=strArr[i]
            }
            str1=str1.toLocaleLowerCase()
                      newData[str1]+=data.noofdays;
                      if(subLeave==='both'){
                        if(lopBooked>0 && earnedBooked>0){
                          newData.lop+=lopBooked
                          newData.earned+=earnedBooked
                        } 
                      }
                      else {
                        if(subLeave==='lop') {
                          newData.lop+=lopBooked
                        }else if(subLeave==='earned'){
                          newData.earned+=earnedBooked
                        }
                    }
                    console.log(newData)
                   updateDoc(doc(db,'admin',JSON.parse(sessionStorage.getItem('uid'))),newData).then(()=>{
                    console.log('profile updated')
                   }).catch((err)=>{
                    console.log(err)
                   })
                   setmodal_backdrop(false)
              setTimeout(()=>{nav('/leavetracker')},2000)
          })
      .catch((err) => {
          console.log(err.message);
          })
      }
   const {modal_backdrop,setmodal_backdrop}=useStateContext()
    function tog_backdrop() {
        setmodal_backdrop(!modal_backdrop);
      }
  return (   
                    <Modal
                      isOpen={modal_backdrop}
                      toggle={() => {
                        tog_backdrop();
                      }}
                      backdrop={'static'}
                      id="staticBackdrop"
                    >
                      <div className="modal-header">
                        <h5 className="modal-title text-warning" id="staticBackdropLabel"><i className='fas fa-exclamation-triangle' />Warning!</h5>
                        <button type="button" className="btn-close"
                          onClick={() => {
                            setmodal_backdrop(false);
                          }} aria-label="Close"></button>
                      </div>
                      <div className="modal-body">
                        <p>You have consumed the quoted leave for this month.This leave will be deduced from earned leave or loss of pay.</p>
                      </div>
                      <div className="modal-footer">
                        <button type="button" className="btn btn-light" onClick={() => {
                          setmodal_backdrop(false);
                        }}>Close</button>
                        <button type="button" className="btn btn-primary" onClick={()=>{
                            sendData()
                            }}>Agree</button>
                      </div>
                    </Modal>

                
              
  )
}

export default AlertModal