import React from 'react';
import { Link } from 'react-router-dom';
import * as moment from "moment";
import { Badge,Button } from 'reactstrap';
import { doc, deleteDoc } from "firebase/firestore";
import { db } from 'firebase-config';
const formateDate = (date, format) => {
    const dateFormat = format ? format : "DD MMM Y";
    const date1 = moment(new Date(date)).format(dateFormat);
    return date1;
};

const toLowerCase1 = str => {
    return (
      str === "" || str === undefined ? "" : str.toLowerCase()
    );
  };

const deleteData=async(id)=>{
    
await deleteDoc(doc(db, "timesheet", id)).then(()=>{
    console.log('deleted successfully');
}).catch((err)=>{
    console.log(err);
})
}  

const CheckBox = (cell) => {
    return cell.value ? cell.value : '';
};

const OrderId = (cell) => {
    return (
        <Link to="#" className="text-body ">{cell.value ? cell.value : ''}</Link>
    );
};

const BillingName = (cell) => {
    return cell.value ? cell.value : '';
};

const Date = (cell) => {
    return cell.value ? cell.value : '';
};

const Total = (cell) => {
    return cell.value ? cell.value : '';
};

const Status = (cell) => {
    return (
        <Badge
          className={"font-size-11 badge-soft-" + 
          (cell.value === "accept" ? "success" : "danger" && cell.value === "pending" ? "warning" : "danger")}          
        >
          {cell.value}
        </Badge>
    )
};
const Action =(cell)=>{
    return (
        <Button
        type="button"
        className=" btn-rounded bg-primary-subtle text-primary border-primary-subtle"
        onClick={()=>deleteData(cell.value)}
      >
        <i className="dripicons-trash"></i>
      </Button>
    )
}
export {
    CheckBox,
    OrderId,
    BillingName,
    Date,
    Total,
    Status,
    Action,
};