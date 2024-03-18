import React  from 'react'
import { Link } from 'react-router-dom';
import { useStateContext } from 'Context/ContextProvider';
import { UncontrolledDropdown, DropdownMenu,DropdownToggle, Button } from 'reactstrap';
const Costcenter = (cell) => {
    return (
        <Link to="#" className="text-body fw-bold">{cell.value ? cell.value : ''}</Link>
    );
};
const CostcenterHours = (cell)=>{
    const {startdate} = useStateContext()
    console.log(startdate)
    return cell.value ? cell.value[new Date(startdate).getMonth()] : ''
}
const Actions = ({cell,setId})=>{
    const handleClick=()=>{
        setId(cell.value)
    }
    return (
        <UncontrolledDropdown className="ms-auto">
        <DropdownToggle
        className="text-muted font-size-14"
        tag="a"
        color="white"
      >
        <i className="mdi mdi-dots-horizontal"></i>
      </DropdownToggle>
      <DropdownMenu className="dropdown-menu-end ">
      <Button className='btn dropdown-item' onClick={()=>handleClick()}> 
      {'View reports'}<i className='ms-2 fas fa-chart-line'/>
      </Button>
      </DropdownMenu>
      </UncontrolledDropdown>
    )
}
export {
    Costcenter,
    CostcenterHours,
    Actions
}