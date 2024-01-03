import React from "react"
import { Link } from "react-router-dom"
import {
  Table,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
  DropdownItem,
} from "reactstrap"

import { recentfile } from "../../common/data/file-manager";


const RecentFile = () => {
  return (
    <React.Fragment>
      <div className="">
        <div className="d-flex flex-wrap">
          <h5 className="font-size-16 me-3">Recent Tickets</h5>
        </div>
        <hr className="mt-2" />

        <div className="table-responsive">
          <Table className="table align-middle table-nowrap table-hover mb-0">
            <thead>
              <tr>
                <th scope="col">Ticket name</th>
                <th scope="col">Date raised</th>
                <th scope="col" colSpan="2">
                  Hours Quoted
                </th>
                <th scope="col">Priority</th>
                <th scope="col">Status</th>
                <th scope="col" colSpan="2">
                 Estimated Hours
                </th>
                <th scope="col" colSpan="2">
                 Estimated Date
                </th>
              </tr>
            </thead>
            {/* <tbody>
              {recentfile.map((item, key) => (
                <tr key={key}>
                  <td>
                    <UncontrolledDropdown>
                      <DropdownToggle tag="a" className="font-size-16 text-muted" role="button">
                        <i className="mdi mdi-dots-horizontal"></i>
                      </DropdownToggle>

                      <DropdownMenu className="dropdown-menu-end">
                        <DropdownItem href="#">Bitumat</DropdownItem>
                        <DropdownItem href="#">AMS</DropdownItem>
                        <DropdownItem href="#">#173</DropdownItem>
                        <div className="dropdown-divider"></div>
                        <DropdownItem href="#">Description</DropdownItem>
                      </DropdownMenu>
                    </UncontrolledDropdown>
                  </td>
                </tr>
              ))}
            </tbody> */}
          </Table>
        </div>
      </div>
    </React.Fragment>
  )
}

export default RecentFile;
