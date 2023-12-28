import React from "react"
import PropTypes from 'prop-types'
import { Link } from "react-router-dom"
import { Row, Col, BreadcrumbItem } from "reactstrap"
import Cookies from "js-cookie"

const Breadcrumb = props => {
  return (
    <Row>
      <Col className="col-12">
        <div className="page-title-box d-sm-flex align-items-center justify-content-between">
          <h4 className="mb-sm-0 font-size-18">{props.title}</h4>
          <div className="page-title-right">
            <ol className="breadcrumb m-0">
              {
                (Cookies.get('name') === 'Keerthana') ? (
                  <>
                    
                    <BreadcrumbItem>
                      <Link to="/leave/records">{props.title}</Link>
                    </BreadcrumbItem>
                    <BreadcrumbItem active>
                      <Link to="/allrecords">{props.breadcrumbItem}</Link>
                    </BreadcrumbItem>
                  </>
                ) : (<>
                  <BreadcrumbItem active>
                    <Link to="#">{props.breadcrumbItem}</Link>
                  </BreadcrumbItem>
                  <BreadcrumbItem>
                    <Link to="#">{props.title}</Link>
                  </BreadcrumbItem>
                </>
                )
              }
            </ol>
          </div>
        </div>
      </Col>
    </Row>
  )
}

// Breadcrumb.propTypes = {
//   breadcrumbItem: PropTypes.string,
//   title: PropTypes.string
// }

export default Breadcrumb
