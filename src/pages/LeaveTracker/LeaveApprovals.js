// src/components/filter.
import React, { useMemo } from "react";
import ApprovalCard from "./ApprovalCard";
// import TableContainer from '../../components/Common/TableContainer';
import {useState,useEffect} from "react";
import {collection,getDocs,query,where,orderBy,onSnapshot} from 'firebase/firestore'
import { Row } from "reactstrap";
import Cookies from "js-cookie";
import { db } from "firebase-config";
import { useStateContext } from "Context/ContextProvider";
function LeaveApprovals() {
   const {detail} = useStateContext()
    return (
        <div className="page-content pt-1">
            <div className="container-fluid pt-5">
                <Row className="mt-5">
                <ApprovalCard data={detail} />
                </Row>
            </div>
        </div>
    );
}
export default LeaveApprovals;