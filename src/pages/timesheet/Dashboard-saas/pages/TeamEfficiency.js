import React ,{useEffect,useState,useMemo, useRef}from 'react'
import {
    Button,
    Card,
    CardBody,
    Row,
    Modal,
    Col,
  } from "reactstrap";
  import Cookies from 'js-cookie';
  import TableContainer from "components/Common/TableContainer";
  import EfficiencyChart from 'pages/AllCharts/echart/EfficiencyChart';
  import {collection,getDocs,query,where,orderBy,onSnapshot,updateDoc,doc,getDoc,Timestamp} from 'firebase/firestore'
  import { totHours } from '../Components/totHours';
import { useStateContext } from 'Context/ContextProvider';
  import { EmployeeName,EmplyeeID,Team,Designation,Actions } from './TeamEfficiencyCol';
import { db } from "firebase-config";
const TeamEfficiency = () => {
  const [varyingModal, setVaryingModal] = useState(false);
  const currentDate=new Date()
  const {setPerformanceArray,startdate,enddate,format,setFormat} = useStateContext()
const [data,setData]=useState([])
const [data2,setData2]=useState([])
const [project,setProject]=useState([])
const [userId,setUserId]=useState('')
        const lastDate=new Date(currentDate.getFullYear(),currentDate.getMonth()+1,0)
        const lastDateTimestamp=Timestamp.fromDate(lastDate)
        const firstDate= new Date(currentDate.getFullYear(),currentDate.getMonth(),1)
        const firstDateTimestamp=Timestamp.fromDate(firstDate)
    function tog_varyingModal() {
        setVaryingModal(!varyingModal);
      }
    const [team,setTeam]=useState([])
 useEffect(() => {
  const getData=async()=>{
    const filteredUsersQuery =query(collection(db,'users'),where('team','==',Cookies.get('team')));
    const data=await getDocs(filteredUsersQuery).catch((err)=>{
    
    })
    setTeam(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
  }
getData()

}, [])

useEffect(()=>{
  const getReport = async()=>{  
    if(userId!==''){     
    const docRef=doc(db,'users',userId)
    const docSnap=await getDoc(docRef)
    if(docSnap.exists()){
      console.log(docSnap.data().name)
      const filteredQuery = query(collection(db,'Timesheet'), where('name', '==',docSnap.data().name),where('dateTimestamp','>=',firstDateTimestamp),where('dateTimestamp','<=',lastDateTimestamp),orderBy('dateTimestamp','desc'));
          const data1=await getDocs(filteredQuery)
          setData(data1.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    }
  }
  await getDocs(collection(db,'projectName')).then((data)=>{
    setProject(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
  }).catch((err)=>{
    console.log(err)
  })
  }
  getReport()
},[userId])

  const getReport = async()=>{ 
        const firstDay=new Date(startdate)
        const lastDay=new Date(enddate)
        const firstDayOfWeek=Timestamp.fromDate(firstDay)
        const lastDayOfWeek=Timestamp.fromDate(lastDay)  
        setPerformanceArray([])
          let arr=[]
          if(format==='weekly'){
            const weeklyData=data.filter((data)=>data.dateTimestamp>=firstDayOfWeek && data.dateTimestamp<=lastDayOfWeek)
            if(project.length>0 && weeklyData.length>0){
              for(let i=0;i<project.length;i++){
                let workedHours=0;
                const projectName=project[i].service;
                for(let j=0;j<data.length;j++){
                    if(projectName===weeklyData[j].projectName){
                        workedHours+=totHours(weeklyData[j].startTime,weeklyData[j].endTime)
                    }
                }
                console.log(workedHours)
                    arr.push(workedHours)
              }
              setPerformanceArray(arr)
              setUserId('')
              setData([])
              setVaryingModal(false)
          }  
          }
          else {
          if(project.length>0 && data.length>0){
          for(let i=0;i<project.length;i++){
            let workedHours=0;
            const projectName=project[i].service;
            for(let j=0;j<data.length;j++){
                if(projectName===data[j].projectName){
                    workedHours+=totHours(data[j].startTime,data[j].endTime)
                }
            }
                arr.push(workedHours)
          }
          setPerformanceArray(arr)
          setUserId('')
          setData([])
          setVaryingModal(false)
      }
    }
    } 

    const columns = useMemo(
        () => [
            {
                Header: "Employee ID",
                accessor: "employeeID",
                filterable: false,
                disableFilters: true,
                Cell: cellProps => {
                  return <EmplyeeID {...cellProps} />;
                },
              },
          {
            Header: "Employee Name",
            accessor: "name",
            filterable: false,
            disableFilters: true,
            Cell: cellProps => {
              return <EmployeeName {...cellProps} />;
            },
          },    
          {
            Header: "Actions",
            accessor: "id",
            disableFilters: true,
            filterable: false,
            Cell: cellProps => {
              return <Actions {...cellProps} setVaryingModal={setVaryingModal} setUserId={setUserId} />;
            },
          }, 
        ],
        []
      );
  return (

    <div className='page-content'>
        <Row>
            <Col>
            <Modal
                              isOpen={varyingModal}
                              toggle={() => {
                                tog_varyingModal()
                              }}
                            >
                              <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Choose format</h5>
                                <button type="button"
                                  onClick={() => {
                                    setVaryingModal(false);
                                  }} className="btn-close"></button>
                              </div>
                              <div className="modal-body">
                                <form>
                                  <div className="mb-2">
                                    <select className='form-select'  onChange={(e)=>setFormat(e.target.value) } value={format}
                                    >
                                      <option value='#'>Choose format</option>
                                      <option value="monthly">Month-wise</option>
                                      <option value="weekly">Week-wise</option>
                                    </select>
                                  </div>
                                </form>
                                <div className='float-right'>
                                  <Button className='bg-primary' onClick={()=>getReport()}>Get Data</Button>
                                </div>
                              </div>
                            </Modal>
            <h4 className="font-size-16 mb-3">Team Efficiency</h4> 
            <Card>   
     <CardBody>
     <TableContainer 
                        columns={columns}
                        data={team}
                        isGlobalFilter={true}
                        isAddOptions={false}
                        customPageSize={10}
                        isPagination={true}
                        tableClass="align-middle table-nowrap table-check table"
                        theadClass="table-light"
                        paginationDiv="col-12"
                        pagination="justify-content-center pagination pagination-rounded"
                    />
        </CardBody>
      </Card>
            </Col>
            <Col className='mt-4'>
          <EfficiencyChart dataColors='[ "--bs-light","--bs-primary","--bs-warning","--bs-info", "--bs-success"]' />
            </Col>
        </Row>
        
    </div>
  )
}

export default TeamEfficiency