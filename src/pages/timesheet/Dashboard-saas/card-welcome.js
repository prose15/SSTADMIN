import React from "react"
import { Row, Col, Card } from "reactstrap"

//Import Images
import profileImg from "assets/images/profile-img.png"
function CardWelcome(props) {
  return (
    <React.Fragment>
    <Col xl="4">
      <Card className="bg-primary-subtle">
        <div>
          <Row>
            <Col xs="7">
              <div className="text-primary p-3">
                <h5 className="text-primary">Welcome Back !</h5>
                <p>Time Sheet Dashboard</p>

                {/* <ul className="ps-3 mb-0 ">
                  <li className="py-1">Log work status here!</li>
                
                </ul> */}
              </div>
            </Col>
          </Row>
        </div>
      </Card>
    </Col>
  </React.Fragment>
  );
}

export default CardWelcome;