import React, { useState } from "react"
import {
  Col,
  Card,
  Nav,
  CardBody,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  Table,
  Row,
  Container,
} from "reactstrap"
import "react-rangeslider/lib/index.css"

//Simple bar
import SimpleBar from "simplebar-react"
import { transactionsDataALL, transactionsDataBuy, transactionsDataSell } from "common/data"
import TeamMates from "./TeamMates"
import Slider from "react-rangeslider"
import { useStateContext } from "Context/ContextProvider"

const TeamMatesLeave = () => {
  const {leaveDetail}=useStateContext();
  const [activeTab, setactiveTab] = useState("1")
  const month = new Date().getMonth()+1
  const [custom_val, setcustom_val] = useState(month)
  const labels = {
    1: "Jan",
    2: "Feb",
    3: "Mar",
    4: "Apr",
    5: "May",
    6: "Jun",
    7: "Jul",
    8: "Aug",
    9: "Sep",
    10: "Oct",
    11: "Nov",
    12: "Dec",
  }

  if(!leaveDetail)return;
  const filterLeave = leaveDetail.filter((data=>parseInt(data.from.substring(5,7)) === custom_val))

  return (
    <React.Fragment>
      <Col xl="12">
        <Card>
          <CardBody>
            <h4 className="card-title mb-4">TeamMates Leave</h4>
<Container>
<Col md={12}>
                      <div className="p-3">
                        <Col md={12}>
                      <div>
                        <h5 className="font-size-14 mb-3 mt-0">
                          Choose Months
                        </h5>
                        <Slider
                          value={custom_val}
                          min={1}
                          max={12}
                          labels={labels}
                          orientation="horizontal"
                          onChange={value => {
                            setcustom_val(value)
                          }}
                        />
                      </div>
                    </Col>
                      </div>
                    </Col>
</Container>
            
            <TabContent activeTab={activeTab} className="mt-4">
              <TabPane tabId="1">
                <SimpleBar style={{ maxHeight: "330px" }}>
                  <div className="table-responsive">
                    <Table className="table align-middle table-nowrap">
                      <tbody>
                        {
                          (filterLeave || []).map((item) => (
                            <tr key={item.id}>
                              <td style={{ width: "50px" }}>
                                <div className={`font-size-22 text-${item.color}`}>
                                  {item.status ==="approved" ? <i className="mdi mdi-check-circle-outline text-success"></i>: <i className="mdi mdi-cancel text-danger"></i>}
                                </div>
                              </td>

                              <td>
                                <div>
                                  <h5 className="font-size-14 mb-1">{item.name}</h5>
                                  <p className="text-muted mb-0">{item.leaveType}</p>
                                </div>
                              </td>

                              <td>
                                <div className="text-end">
                                  <h5 className="font-size-14 mb-0">{item.from}</h5>
                                </div>
                              </td>

                              <td>
                                <div className="text-end">
                                  <h5 className="font-size-14 mb-0">
                                    {item.to}
                                  </h5>
                                </div>
                              </td>
                            </tr>
                          ))
                        }

                      </tbody>
                    </Table>
                  </div>
                </SimpleBar>
              </TabPane>
            </TabContent>
          </CardBody>
        </Card>
      </Col>
    </React.Fragment>
  )
}

export default TeamMatesLeave
