import React from 'react'
import { Card , CardBody,Col } from 'reactstrap'
const TeamMates = (props) => {
    const team = props.team
    const getFirstLetter=(name)=>{
        const arr=name.split('')
        return arr[0]
    }
  return (
    <React.Fragment>
    <Col >

        <Card  >
        
            <CardBody   >
            <h4 className="card-title mb-3">Team Members</h4>
            <div className='container overflow-y-auto ' style={{maxHeight:'245px'}}>
                {
                   team.map((data)=>(
                    <div className="bg-light p-3 d-flex mb-3 rounded" key={data}>
                    <span  className='rounded-circle  d-flex align-items-center justify-content-center  pt-1 me-4 bg-primary-subtle text-primary  ' style={{width:'55px',height:'55px'}}>
                <h3>{getFirstLetter(data.name)}</h3>
              </span>
                    <div className="flex-grow-1 mt-2">
                        <h5 className="font-size-15 mb-2"><a href="candidate-overview" className="text-body" key={data.name}>{data.name}</a></h5>
                        <p className="mb-0  text-muted"><i className="me-2 bx bx-briefcase text-body align-middle"></i>{data.designation}</p>
                    </div>
                </div>
                   )) 
                }
                </div>
            </CardBody>
        </Card>
    </Col>
</React.Fragment>
  )
}

export default TeamMates