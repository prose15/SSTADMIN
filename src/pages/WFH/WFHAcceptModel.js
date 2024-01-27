import React,{useState,useEffect} from 'react'
import { Modal,Input,ModalHeader,Button } from 'reactstrap'
import { useStateContext } from 'Context/ContextProvider'
import { DatePicker } from 'antd'
import { Accept } from './Accept'
import Flatpickr from 'react-flatpickr'
const WFHAcceptModal = () => {
    const {acceptModel,setAcceptModel,id,users,admin,WFHDetail}= useStateContext()
    const [reason,setReason]=useState('')
    const [date,setDate] = useState('')


     return (
       <>

         <Modal
           isOpen={acceptModel}
           role="dialog"
           autoFocus={true}
           centered
           data-toggle="modal"
           toggle={() => {
             setAcceptModel(!acceptModel);
           }}
         >
           <div>
             <ModalHeader
               className="border-bottom-0"
               toggle={() => {
                setAcceptModel(!acceptModel);
              }}
             ></ModalHeader>
           </div>
        <div className="modal-body">
  <div className="text-center mb-4">
      <div className="avatar-title bg-light  rounded-circle text-danger h1">
      </div>
  

    <div className="row justify-content-center">
      <div className="col-xl-10">
        <h4 className="text-success">Choose Dates!</h4>
       <p className="text-muted font-size-14 mb-4">
      </p>
        <div
          className="input-group rounded "
        >
           <div className="form-group mb-4 mx-auto">
          
           <div className="input-group">
           <Flatpickr
             className="form-control d-block"
             placeholder="dd M,yyyy"
             options={{
               altInput: true,
               altFormat: "F j, Y",
               mode: "multiple",
               dateFormat: "Y-m-d"
             }}
               onChange={(date,string)=>setDate(string)}/>
           </div>
         </div>
        </div>
        <div>
        <Button className='bg-success m-4' type="button" id="button-addon2" onClick={()=>{

          //Aarumugam you can write call the accept method here 

            setAcceptModel(!acceptModel)
          }}>
            Approve
          </Button>
        </div>
      </div>
    </div>
  </div>
        </div>
         </Modal>
         </>
     )
   }

export default WFHAcceptModal