import React, { useMemo } from "react";
import ApprovalCard from "./ApprovalCard";
import { Row } from "reactstrap";
import { useStateContext } from "Context/ContextProvider";
function Approvals() {
   const {detail,WFHDetail,holidays,request,revokeDetail,WFHRecords} = useStateContext()
   const newDetail=detail.filter(data=>data.displayStatus==='')
   const newWFHRecords=WFHRecords.filter(data=>data.displayStatus==='')
   const data = [...newDetail,...newWFHRecords,...holidays]
   const userData = [...request,...revokeDetail,...WFHDetail]
   const reverseArray = data.reduce((acc, curr) => {
    const indexToInsert = acc.findIndex(item => item.timestamp > curr.timestamp);
    if (indexToInsert === -1) {
      acc.push(curr);
    } else {
      acc.splice(indexToInsert, 0, curr);
    }
  
    return acc;
  }, []);
  const sortedArray = reverseArray.reverse();

  const reverseUserArray = userData.reduce((acc, curr) => {
    const indexToInsert = acc.findIndex(item => item.timestamp > curr.timestamp);
    if (indexToInsert === -1) {
      acc.push(curr);
    } else {
      acc.splice(indexToInsert, 0, curr);
    }
  
    return acc;
  }, []);
  const sortedUserArray = reverseUserArray.reverse()
  console.log(sortedUserArray);
    return (
        <div className="page-content pt-1">
            <div className="container-fluid pt-5">-
                <Row className="mt-5">
                <ApprovalCard
                data={sortedArray}
                userData={sortedUserArray}/>
                </Row>
            </div>
        </div>
    );
}
export default Approvals;