import React, { useEffect, useState } from 'react';
import { Card, CardBody} from 'reactstrap';
import './indexcss.css';
import { useSelector,useDispatch } from 'react-redux';
import { getContactStart } from 'store/actions';
import { state } from 'store/toolkit';
const Leavecards = () => {
    let dispatch=useDispatch();
    useEffect(()=>{
dispatch(getContactStart());
    },[])
    const {contacts:data}=useSelector(state=>state.data)
    console.log(data,state);
  return (
    <div className="d-flex cards-box">
    <Card className="leave-cards me-3">
        <CardBody className="p-4">
            <div className="text-center mb-3 text-primary">
          
                <i className="fas fa-umbrella-beach fa-2x "></i>
                    <h5 className="mt-4 mb-2 font-size-15"><b>Casual Leave</b></h5>
            </div>

            <div className="d-flex">
                <p className="mb-0 flex-grow-1 text-success me-5">
                    Available :{0}</p>
                    
                <p className="mb-0 text-danger">Booked : {0}</p>
            </div>
        </CardBody>
    </Card>
    <Card className="leave-cards me-3">
        <CardBody className="p-4">
            <div className="text-center mb-3 text-primary">
            <i className='fas fa-exclamation-circle fa-2x'></i>
                    <h5 className="mt-4 mb-2 font-size-15"><b>Loss of pay</b></h5>
            </div>

            <div className="d-flex">
                <p className="mb-0 flex-grow-1 text-success me-5">
                    Available : {0}</p>
                <p className="mb-0 text-danger">Booked : {0}</p>
            </div>
        </CardBody>
    </Card>
    <Card className="leave-cards me-3">
        <CardBody className="p-4">
            <div className="text-center mb-3 text-primary">
                <i className="fas fa-wallet fa-2x">
                    </i>
                    <h5 className="mt-4 mb-2 font-size-15"><b>Earned leave</b></h5>
            </div>

            <div className="d-flex">
                <p className="mb-0 flex-grow-1 text-success me-5">Available
                     : {0}</p>
                <p className="mb-0 text-danger">Booked : {0}</p>
            </div>
        </CardBody>
    </Card>
    <Card className="leave-cards me-3">
        <CardBody className="p-4">
            <div className="text-center mb-3 text-primary">
             <i className="fas fa-baby-carriage fa-2x">
                </i>
                    <h5 className="mt-4 mb-2 font-size-15"><b>Paternity</b></h5>
            </div>

            <div className="d-flex">
                <p className="mb-0 flex-grow-1 text-success me-5">Available : {0}</p>
                <p className="mb-0 text-danger">Booked : {0}</p>
            </div>
        </CardBody>
    </Card>
    <Card className="leave-cards me-3">
        <CardBody className="p-4">
            <div className="text-center mb-3 text-primary">
           <i className="fas fa-hospital fa-2x"></i>
                    <h5 className="mt-4 mb-2 font-size-15"><b>Sick Leave</b></h5>
            </div>

            <div className="d-flex">
                <p className="mb-0 flex-grow-1 text-success me-5">Available : {0}</p>
                <p className="mb-0 text-danger">Booked : {0}</p>
            </div>
        </CardBody>
    </Card>
    </div>
  )
}

export default Leavecards