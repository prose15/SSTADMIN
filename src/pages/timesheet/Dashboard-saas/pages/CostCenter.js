import React,{useMemo,useEffect,useState} from 'react'
import TableContainer from 'components/Common/TableContainer'
import { Costcenter,CostcenterHours,Actions } from './CostCenterCol';
import { db } from 'firebase-config';
import { collection, doc, getDoc, getDocs, query } from 'firebase/firestore';
import { Row, Col } from 'reactstrap';
import { useStateContext } from 'Context/ContextProvider';
import CostCenterChart from 'pages/AllCharts/echart/CostCenterChart';
import { orderBy } from 'lodash';
const CostCenter = () => {
  const {ccMembers,setCCMembers,ccData,setCCData,startdate} = useStateContext()
    const [costCenter,setCostCenter]=useState([])
    const [id,setId]=useState('')
    const [reportData,setReportData]=useState()
    const [colors,setColors]=useState([])
    useEffect(()=>{
        const getData=async()=>{
                const collectionRef = collection(db,'costCenter')
                const filteredQuerey= query(collection(db,'costCenter'),orderBy('service','asc'))
                const data = await getDocs(filteredQuerey)
                setCostCenter(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
        }
        getData()
    },[])
    useEffect(()=>{
      const getData=async()=>{
        if(id){
          const docRef = doc(db,'costCenter',id)
          const docSnap = await getDoc(docRef)
          if(docSnap.exists()){
            setReportData(docSnap.data())
            const memArr=docSnap.data().members
           const label = memArr.map((data)=>{
              return data.name
            })
            const induvidualHrs=memArr.map((data)=>{
              return data.worked[new Date(startdate).getMonth()]
            })
            setCCMembers([...label])
            setCCData([...induvidualHrs])
            const numbers=[0,1,2,3,4,5,6,7,8,9]
            const alphabets = ['A','B','C','D','E'].concat(numbers)
          
          console.log(label)
          if(label.length>0){
            const color=[]
            for(let i=0;i<label.length;i++){
              let hexCode = '#'
            for(let j=0;j<6;j++){
            hexCode=hexCode+alphabets[Math.floor(Math.random()*label.length)+1];
            }
            color.push(hexCode)
            console.log(hexCode)
            
             }
             setColors(color)
          }
            
          }
        }       
      }
      getData()
  },[id])
 console.log(colors)
 
    const columns = useMemo(
        () => [
          {
            Header: "Costcenter",
            accessor: "service",
            filterable: false,
            disableFilters: true,
            Cell: cellProps => {
              return <Costcenter {...cellProps} />;
            },
          },
          {
            Header: "Worked Hours",
            accessor: "workedHrs",
            filterable: false,
            disableFilters: true,
            Cell: cellProps => {
              return <CostcenterHours {...cellProps} />;
            },
          },
          {
            Header: "Actions",
            accessor: "id",
            disableFilters: true,
            filterable: false,
            Cell: cellProps => {
              return <Actions {...cellProps} setId={setId}  />;
            },
          },
        ],
        []
      );
  return (
    <div className='page-content'>
        <Row >
            <Col md={6} >
            <TableContainer columns={columns} data={costCenter.reverse()} isGlobalFilter={true} isAddOptions={false} customPageSize={10} isPagination={true} tableClass="align-middle table-nowrap table-check table" theadClass="table-light" paginationDiv="col-12" pagination="justify-content-center pagination pagination-rounded" />  
            </Col>
            <Col md={6}>
            <Col className='mt-4'>
          <CostCenterChart dataColors={JSON.stringify(colors)} />
        </Col>
            </Col>
        </Row>
     
    </div>
  )
}

export default CostCenter