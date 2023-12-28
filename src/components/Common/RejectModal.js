import React,{useState,useEffect} from 'react'
import { Modal,Input,Button,ModalHeader } from 'reactstrap'
import { useStateContext } from 'Context/ContextProvider'
import { Reject } from 'pages/LeaveTracker/Reject'
const RejectModal = () => {
  const {subscribemodal,setSubscribemodal,id}= useStateContext()
 const [reason,setReason]=useState('')
  return (
    <>
        <Modal
        isOpen={subscribemodal}
        role="dialog"
        autoFocus={true}
        centered
        data-toggle="modal"
        toggle={() => {
          setSubscribemodal(!subscribemodal);
        }}
      >
        <div>
          <ModalHeader
            className="border-bottom-0"
            toggle={() => {
              setSubscribemodal(!subscribemodal);
            }}
          ></ModalHeader>
        </div>
        <div className="modal-body">
          <div className="text-center mb-4">
            <div className="avatar-md mx-auto mb-4">
              <div className="avatar-title bg-light  rounded-circle text-danger h1">
                <i className="fas fa-ban text-danger"></i>
              </div>
            </div>

            <div className="row justify-content-center">
              <div className="col-xl-10">
                <h4 className="text-danger">Reject!</h4>
                <p className="text-muted font-size-14 mb-4">
                  Please enter the valid reason.
                </p>

                <div
                  className="input-group rounded bg-light"
                >
                  <Input
                    type="text"
                    className="form-control bg-transparent border-0"
                    placeholder="Enter Reason"
                    value={reason}
                    onChange={(e)=>setReason(e.target.value)}
                  />
                  <Button color="danger" type="button" id="button-addon2" onClick={()=>{
                    Reject(id,reason)
                    setSubscribemodal(!subscribemodal)
                  }}>
                    <i className="bx bxs-paper-plane"></i>
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

export default RejectModal