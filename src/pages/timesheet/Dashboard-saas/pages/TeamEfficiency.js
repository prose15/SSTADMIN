import React, { useEffect, useState, useMemo, useRef } from 'react'
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
import { collection, getDocs, query, where, orderBy, onSnapshot, addDoc, doc, getDoc, Timestamp, deleteDoc } from 'firebase/firestore'
import { totHours } from '../Components/totHours';
import { useStateContext } from 'Context/ContextProvider';
import { EmployeeName, EmplyeeID, Team, Designation, Actions } from './TeamEfficiencyCol';
import { db } from "firebase-config";
const TeamEfficiency = () => {
  const [varyingModal, setVaryingModal] = useState(false);

  const { setPerformanceArray, startdate, enddate, format, setFormat } = useStateContext()
  const startDate = new Date(startdate)
  const endDate = new Date(enddate)
  const [data, setData] = useState([])
  const [data2, setData2] = useState([])
  const [project, setProject] = useState([])
  const [userId, setUserId] = useState('')
  const lastDate = new Date(startDate.getFullYear(), startDate.getMonth() + 1, 1)
  const lastDateTimestamp = Timestamp.fromDate(lastDate)
  const firstDate = new Date(startDate.getFullYear(), startDate.getMonth(), 1)
  const firstDateTimestamp = Timestamp.fromDate(firstDate)
  function tog_varyingModal() {
    setVaryingModal(!varyingModal);
  }
  const [team, setTeam] = useState([])
  const [costCenter,setCostCenter]=useState([])
  const [colors,setColors]=useState([])
  useEffect(() => {
    const getData = async () => {
      if (Cookies.get('role') === 'Chief Executive Officer') {
        const filteredUsersQuery = query(collection(db, 'users'), where('team', '==', 'Delivery'));
        const data = await getDocs(filteredUsersQuery).catch((err) => {

        })
        const collectionRef = collection(db,'costCenter')
        const data1 =await getDocs(collectionRef) 
        setCostCenter(data1.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
        setTeam(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
        const numbers=[0,1,2,3,4,5,6,7,8,9]
            const alphabets = ['A','B','C','D','E'].concat(numbers)
            console.log(data1.docs.length)
        if(data1.docs.length>0){
          const color=[]
            for(let i=0;i<data1.docs.length;i++){
              let hexCode = '#'
            for(let j=0;j<6;j++){
            hexCode=hexCode+alphabets[Math.floor(Math.random()*11)+1];
            }
            color.push(hexCode)
            
             }
             setColors(color)
        }

      } else {
        const filteredUsersQuery = query(collection(db, 'users'), where('team', '==', Cookies.get('team')));
        const data = await getDocs(filteredUsersQuery).catch((err) => {
        })
        setTeam(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
      }
    }
    getData()

  }, [])

  useEffect(() => {
    const getReport = async () => {
      if (userId !== '') {
        const docRef = doc(db, 'users', userId)
        const docSnap = await getDoc(docRef)
        if (docSnap.exists()) {
          const filteredQuery = query(collection(db, 'Timesheet'), where('name', '==', docSnap.data().name), where('dateTimestamp', '>=', firstDateTimestamp), where('dateTimestamp', '<=', lastDateTimestamp), orderBy('dateTimestamp', 'desc'));
          const data1 = await getDocs(filteredQuery)
          setData(data1.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
        }
      }
      await getDocs(collection(db, 'projectName')).then((data) => {
        setProject(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
      }).catch((err) => {
        console.log(err)
      })
    }
    getReport()
  }, [userId, startdate])
  const getReport = async () => {
    const firstDay = new Date(startdate)
    const lastDay = new Date(enddate)
    const firstDayOfWeek = Timestamp.fromDate(firstDay)
    const lastDayOfWeek = Timestamp.fromDate(lastDay)
    console.log(firstDayOfWeek, lastDayOfWeek)
    setPerformanceArray([])
    let arr = []
    if (format === 'weekly') {
      const weeklyData = data.filter((data) => data.dateTimestamp.seconds >= firstDayOfWeek.seconds && data.dateTimestamp.seconds <= lastDayOfWeek.seconds)
      console.log(project)
      console.log(weeklyData)
      if (project.length > 0 && weeklyData.length > 0) {
        for (let i = 0; i < project.length; i++) {
          let workedHours = 0;
          const projectName = project[i].service;
          for (let j = 0; j < weeklyData.length; j++) {
            if (projectName === weeklyData[j].projectName) {
              workedHours += totHours(weeklyData[j].startTime, weeklyData[j].endTime)
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
      if (project.length > 0 && data.length > 0) {
        for (let i = 0; i < project.length; i++) {
          let workedHours = 0;
          const projectName = project[i].service;
          for (let j = 0; j < data.length; j++) {
            if (projectName === data[j].projectName) {
              workedHours += totHours(data[j].startTime, data[j].endTime)
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

  const newTeam=team.map((data)=>  {
 
    return {
      name:data.name,
      worked : ['0.0','0.0','0.0','0.0','0.0','0.0','0.0','0.0','0.0','0.0','0.0','0.0'],
    }
  }
    )
  const tothrs=['1000000','1000000','1000000','1000000','1000000','1000000','1000000','1000000','1000000','1000000','1000000','1000000']
  const workedHrs=['0','0','0','0','0','0','0','0','0','0','0','0']
    // const customers=[{service:'SSTCC0001-ARTIC-MP',tothrs:'0',workedHrs:'0',members:newTeam},{service:'SSTCC0002-ALHAMARA-IMP',tothrs:'0',workedHrs:'0',members:newTeam},{service:'SSTCC0003-BITUMAT-AMS',tothrs:'0',workedHrs:'0',members:newTeam},{service:'SSTCC0004-ALSUHAIMI-IMP',tothrs:'0',workedHrs:'0',members:newTeam},{service:'SSTCC0005-CEPCO-AMS',tothrs:'0',workedHrs:'0',members:newTeam},{service:'SSTCC0006-ALHAMAR-AMS',tothrs:'0',workedHrs:'0',members:newTeam},{service:'SSTCC0007-ALSUHAIMI-AMS',tothrs:'0',workedHrs:'0',members:newTeam},{service:'SSTCC0008-BUREAUVERITAS-EI',tothrs:'0',workedHrs:'0',members:newTeam},{service:'SSTCC0009-TAHAKOM-T&M',tothrs:'0',workedHrs:'0',members:newTeam},{service:'SSTCC00010-BASAMH-AMS',tothrs:'0',workedHrs:'0',members:newTeam},{service:'SSTCC00011-KOCL-IMP',tothrs:'0',workedHrs:'0',members:newTeam},{service:'SSTCC00012-NAFCEL-EI',tothrs:'0',workedHrs:'0',members:newTeam},{service:'SSTCC00013-BITUMAT-DR',tothrs:'0',workedHrs:'0',members:newTeam},{service:'SSTCC00014-BERAIN-MP',tothrs:'0',workedHrs:'0',members:newTeam},{service:'SSTCC00015-CHEMAF-T&M',tothrs:'0',workedHrs:'0',members:newTeam},{service:'SSTCC00016-AVALON-MP',tothrs:'0',workedHrs:'0',members:newTeam},{service:'SSTCC00017-HAIL-EI',tothrs:'0',workedHrs:'0',members:newTeam},{service:'SSTCC00018-ALFACILIAH-MP',tothrs:'0',workedHrs:'0',members:newTeam},{service:'SSTCC00019-GHC-EI',tothrs:'0',workedHrs:'0',members:newTeam},{service:'SSTCC00020-BEYAN-MP',tothrs:'0',workedHrs:'0',members:newTeam},{service:'SSTCC00021-SABAYEK-EI',tothrs:'0',workedHrs:'0',members:newTeam},{service:'SSTCC00022-ALTAWKILAT-T&M',tothrs:'0',workedHrs:'0',members:newTeam},{service:'SSTCC00023-FOULATH-T&M',tothrs:'0',workedHrs:'0',members:newTeam},{service:'SSTCC00024-NADEQ-IMP',tothrs:'0',workedHrs:'0',members:newTeam},{service:'SSTCC00025-KOUT-T&M',tothrs:'0',workedHrs:'0',members:newTeam}]
//   console.log(newTeam)
console.log(costCenter)
// costCenter.forEach(async(data,index)=>{
//    addDoc(collection(db,'costCenter'),{members:newTeam,tothrs:tothrs,workedHrs:workedHrs,service:'Leave'}).then(()=>console.log('updated')).catch((err)=>console.log(err))
// // })

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
        return <Actions {...cellProps} setVaryingModal={setVaryingModal} setUserId={setUserId} userId={userId} />;
      },
    },
  ],
  []
);
  return (

    <div className='page-content'>
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
                  <select className='form-select' onChange={(e) => setFormat(e.target.value)} value={format}
                  >
                    <option value='#'>Choose format</option>
                    <option value="monthly">Month-wise</option>
                    <option value="weekly">Week-wise</option>
                  </select>
                </div>
              </form>
              <div className='float-right'>
                <Button className='bg-primary' onClick={() => getReport()}>Get Data</Button>
              </div>
            </div>
          </Modal>
      <Row>
        <Col md={6}>
          
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
        <Col className='mt-4' md={6}>
          <EfficiencyChart dataColors={JSON.stringify(colors)} />
        </Col>
      </Row>

    </div>
  )
}

export default TeamEfficiency