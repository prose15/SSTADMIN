import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";
import { map } from "lodash";
import {
  Badge,
  Card,
  CardBody,
  Col,
  UncontrolledTooltip,
} from "reactstrap";
import images from "assets/images";
import companies from "assets/images/companies";
// import { useState } from "react";
import './card-project.css'
const CardProject = ({ projects }) => {
  // const HoverChangeColor = () => {
    // const [isHovered, setIsHovered] = useState(false);
  
    // const handleMouseEnter = () => {
    //   setIsHovered(true);
    // };
  
    // const handleMouseLeave = () => {
    //   setIsHovered(false);
    // };
  
    // const colorStyle = {
    //   color: isHovered ? 'red' : 'blue', // Change 'red' and 'blue' to your desired colors
    //   fontSize:"16px"
    // };
  
  return (
    <React.Fragment>
      {map(projects, (project, key) => (
        <Col xl="4" sm="6" key={key}>
          <Card>
            <CardBody>
              <div className="d-flex">
             
                <div className="avatar-md me-4">
                  <span className="avatar-title rounded-circle bg-primary-subtle text-primary font-size-24">
                    {/* <img src={companies[project.img]} alt="" height="30" /> */}
                    <i className={project.img} ></i>
                  </span>
                </div>

                <div className="flex-grow-1 overflow-hidden">
                  <h5 className="text-truncate font-size-15">
                    <Link
                      to={`/projects-overview/${project.id}`}
                      className="text-dark"
                    >
                      {project.name}
                    </Link>
                   
                  </h5>
                  
                  
                  <p className="text-muted mb-4">{project.description}</p>

                  <div className="avatar-group">
                    {project.team.map((team, key) =>
                      !team.img || team.img !== "Null" ? (
                        <React.Fragment key={key}>
                          <div className="avatar-group-item">
                            <Link
                              to="#"
                              className="d-inline-block"
                              id={"member" + key}
                            >
                              <img
                                src={images[team.img]}
                                className="rounded-circle avatar-xs"
                                alt=""
                              />

                            
                            </Link>
                          </div>
                        </React.Fragment>
                      ) : (
                        <React.Fragment key={key}>
                          <div className="avatar-group-item">
                            <Link
                              to="#"
                              className="d-inline-block"
                              id={"member" + key}
                            >
                              <div className="avatar-xs">
                                <span
                                  className={
                                    "avatar-title rounded-circle bg-" +
                                    team.color +
                                    " text-white" +                                   
                                    " font-size-16"
                                  }
                                >
                                  {team.name}
                                </span>
                                {/* <UncontrolledTooltip
                                  placement="top"
                                  target={"member" + key}
                                >
                                  {team.fullname}
                                </UncontrolledTooltip> */}
                              </div>
                            </Link>
                          </div>
                        </React.Fragment>
                      )
                    )}
                  </div>
                </div>
              </div>
            </CardBody>
            <div className="px-4 py-3 border-top">
              <ul className="list-inline mb-0">
                <li className="list-inline-item me-3">
                  <Badge className={"bg-" + project.color}>
                    {project.status}
                  </Badge>
                </li>{" "}
                <li className="list-inline-item me-3" id="dueDate">
                  <i className="bx bx-calendar me-1" /> {project.dueDate}
                  <UncontrolledTooltip placement="top" target="dueDate">
                    Due Date
                  </UncontrolledTooltip>
                </li>{" "}
                <li className="list-inline-item me-3" id="comments">
                  
                  <i className="dripicons-trash card-delete"/>{" "}
                  {project.commentsCount}
                  <UncontrolledTooltip placement="top" target="comments">
                    Delete
                  </UncontrolledTooltip>
                </li>
              </ul>
            </div>
          </Card>
        </Col>
      ))}
    </React.Fragment>
  );
};

// CardProject.propTypes = {
//   projects: PropTypes.array,
// };

export default CardProject;
