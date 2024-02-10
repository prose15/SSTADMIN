import React from "react"
import { Link } from "react-router-dom"
import { Container, Row, Col } from "reactstrap"

//Import Countdown
import Countdown from "react-countdown"

//Import Images
import logodark from "../assets/images/logo-dark.png";
import logolight from "../assets/images/logo-light.png";
import maintanence from "../assets/images/coming-soon.svg"

const PagesComingsoon = () => {
  const renderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      // Render a completed state
      return <span>You are good to go!</span>
    } else {
      return (
        <>
          <div className="coming-box">
            {days} <span>Days</span>
          </div>{" "}
          <div className="coming-box">
            {hours} <span>Hours</span>
          </div>{" "}
          <div className="coming-box">
            {minutes} <span>Minutes</span>
          </div>{" "}
          <div className="coming-box">
            {seconds} <span>Seconds</span>
          </div>
        </>
      )
    }
  }
  return (
    <React.Fragment>
      <div className="home-btn d-none d-sm-block">
        <Link to="/" className="text-white">
          <i className="fas fa-home h2" />
        </Link>
      </div>

      <div className="my-5 ">
        <Container>
          <Row>
            <Col lg={12}>
              <div className="text-center">
                <Link to="/dashboard" className="d-block auth-logo">
                  <img
                    src={logolight}
                    alt=""
                    height="20"
                    className="logo-light-element"
                  />
                </Link>
                <Row className="justify-content-center mt-5">
                  <Col sm="4">
                    <div className="maintenance-img">
                      <img
                        src={maintanence}
                        alt=""
                        className="img-fluid mx-auto d-block"
                      />
                    </div>
                  </Col>
                </Row>
                <h1 className="mt-5 fs-1 text-primary">Coming Soon</h1>
                <Row className="justify-content-center mt-5">
                  <Col md="8">
                    <div className="counter-number">
                      <Countdown date="2024/04/09" renderer={renderer} />
                    </div>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default PagesComingsoon
