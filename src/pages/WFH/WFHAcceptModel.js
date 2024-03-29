import React,{useState,useEffect,useRef} from 'react'
import { Modal,Input,ModalHeader,Button, Row, Col, Label } from 'reactstrap'
import { useStateContext } from 'Context/ContextProvider'
import { DatePicker } from 'antd'
import { Accept } from './Accept'
//Import Flatepicker
import Flatpickr from 'react-flatpickr'
import { doc, getDoc } from 'firebase/firestore'
import { db } from 'firebase-config'
const WFHAcceptModal = ({users,admin}) => {
    const {acceptModel,setAcceptModel,id,WFHDetail}= useStateContext()
    const [data,setData]=useState()
    const datePickerRef = useRef(null);
    const [dates,setDates]=useState([])
    const [from,setFrom]=useState(null)
    const [to,setTo]=useState(null)
    useEffect(()=>{
      const getData=async()=>{
        if(id){
          const docRef=doc(db,'WFH',id)
          const docSnap=await getDoc(docRef)
          if(docSnap.exists()){
           setData(docSnap.data())
           setFrom(docSnap.data().from)
           setTo(docSnap.data().to)
          }
        }
      }
      getData()
    },[id])
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
      <div className="avatar-md mx-auto mb-4">
              <div className="avatar-title bg-light  rounded-circle text-success h1">
                <i className="bx bx-calendar-check"></i>
              </div>
            </div>
  

    <div className="row justify-content-center">
      <div className="col-xl-10">
        <h4 className="text-success">Approve Dates!</h4>
       <p className="text-muted font-size-14 mb-4">
        Pick dates for WFH approval
      </p>
        <div
          className="input-group rounded "
        >
           <div className="form-group mb-4 mx-auto">
           <Row>
            <Col className='text-start'>
            <Label htmlFor="formrow-email-Input text-start">From Date</Label>
                          <Input
                            value={from}
                          />
            </Col>
            <Col className='text-start'>
            <Label htmlFor="formrow-email-Input text-start">To Date</Label>
                          <Input
                            value={to}
                          />
            </Col>
           </Row>
           <div className="form-group mb-4 text-start">
                      <label>Pick Dates</label>
                      <div className="input-group">
                        <Flatpickr
                          className="form-control d-block"
                          placeholder="dd M,yyyy"
                          id='flatpicker'
                          
                          options={{
                            enable: [
                              {
                                  from: from,
                                  to: to
                              },
                            ],
                            mode: "multiple",
                            dateFormat: "Y-m-d",
                            onChange: function(selectedDates, dateStr, instance) {
                              setDates(selectedDates)
                          }
                          }}
                          ref={datePickerRef}
                        />
                      </div>
                    </div>
         </div>
        </div>
        <div>
        <Button className='btn-success' type="button" id="button-addon2" onClick={()=>{
          Accept(id,users,admin,dates,setAcceptModel,)
          setDates([])
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