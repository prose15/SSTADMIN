import React, { useEffect, useRef, useCallback } from "react";
import { useLocation } from "react-router-dom";
import SimpleBar from "simplebar-react";
import MetisMenu from "metismenujs";
import withRouter from "components/Common/withRouter";
import { Link } from "react-router-dom";
import { withTranslation } from "react-i18next";
import Cookies from "js-cookie";

const SidebarContent = props => {
  const ref = useRef();
  const activateParentDropdown = useCallback((item) => {
    item.classList.add("active");
    const parent = item.parentElement;
    const parent2El = parent.childNodes[1];

    if (parent2El && parent2El.id !== "side-menu") {
      parent2El.classList.add("mm-show");
    }

    if (parent) {
      parent.classList.add("mm-active");
      const parent2 = parent.parentElement;

      if (parent2) {
        parent2.classList.add("mm-show");

        const parent3 = parent2.parentElement;

        if (parent3) {
          parent3.classList.add("mm-active");
          parent3.childNodes[0].classList.add("mm-active");
          const parent4 = parent3.parentElement;
          if (parent4) {
            parent4.classList.add("mm-show");
            const parent5 = parent4.parentElement;
            if (parent5) {
              parent5.classList.add("mm-show"); // li
              parent5.childNodes[0].classList.add("mm-active"); // a tag
            }
          }
        }
      }
      scrollElement(item);
      return false;
    }
    scrollElement(item);
    return false;
  }, []);

  const removeActivation = (items) => {
    for (var i = 0; i < items.length; ++i) {
      var item = items[i];
      const parent = items[i].parentElement;

      if (item && item.classList.contains("active")) {
        item.classList.remove("active");
      }
      if (parent) {
        const parent2El =
          parent.childNodes && parent.childNodes.lenght && parent.childNodes[1]
            ? parent.childNodes[1]
            : null;
        if (parent2El && parent2El.id !== "side-menu") {
          parent2El.classList.remove("mm-show");
        }

        parent.classList.remove("mm-active");
        const parent2 = parent.parentElement;

        if (parent2) {
          parent2.classList.remove("mm-show");

          const parent3 = parent2.parentElement;
          if (parent3) {
            parent3.classList.remove("mm-active"); // li
            parent3.childNodes[0].classList.remove("mm-active");

            const parent4 = parent3.parentElement; // ul
            if (parent4) {
              parent4.classList.remove("mm-show"); // ul
              const parent5 = parent4.parentElement;
              if (parent5) {
                parent5.classList.remove("mm-show"); // li
                parent5.childNodes[0].classList.remove("mm-active"); // a tag
              }
            }
          }
        }
      }
    }
  };

  const path = useLocation();
  const activeMenu = useCallback(() => {
    const pathName = path.pathname;
    let matchingMenuItem = null;
    const ul = document.getElementById("side-menu");
    const items = ul.getElementsByTagName("a");
    removeActivation(items);

    for (let i = 0; i < items.length; ++i) {
      if (pathName === items[i].pathname) {
        matchingMenuItem = items[i];
        break;
      }
    }
    if (matchingMenuItem) {
      activateParentDropdown(matchingMenuItem);
    }
  }, [path.pathname, activateParentDropdown]);

  useEffect(() => {
    ref.current.recalculate();
  }, []);

  useEffect(() => {
    new MetisMenu("#side-menu");
    activeMenu();
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    activeMenu();
  }, [activeMenu]);

  function scrollElement(item) {
    if (item) {
      const currentPosition = item.offsetTop;
      if (currentPosition > window.innerHeight) {
        ref.current.getScrollElement().scrollTop = currentPosition - 300;
      }
    }
  }

  return (
    <React.Fragment>
      <SimpleBar className="h-100" ref={ref}>
        <div id="sidebar-menu" className=" position-fixed">
          <ul className="metismenu list-unstyled" id="side-menu">
            <li className="menu-title">{props.t("Menu")} </li>
            <li>
              <Link to="/dashboard" className="">
                <i className="bx bx-home-circle"></i>
                <span>{("Dashboard")}</span>
              </Link>
            </li>

            <li className="menu-title">Apps</li>


            <li>
              <Link to="/#" className="has-arrow">
                <i className="bx bx-cycling"></i>
                <span>Leave Tracker</span>
              </Link>
              <ul className="sub-menu">
                {
                  (Cookies.get('level') != 'L3') ? (
                    <>
                      <li>
                        <Link to="/leavetracker">Dashboard</Link>
                      </li>
                      <li>
                        <Link to="/leave/records">My Records</Link>
                      </li>
                      <li>
                        <Link to="/leave/requests">Team Requests</Link>
                      </li>
                    </>) : (
                    <li>
                      <Link to="/leave/requests">Team Requests</Link>
                    </li>)
                }
                {
                  Cookies.get('level') === 'L2' && <li>
                    <Link to="/leave/festiveleave">Declare Holiday</Link>
                  </li>
                }

              </ul>
            </li>
            <li>
              <Link to="/#" className="has-arrow">
                <i className='mdi mdi-laptop-windows'></i>
                <span>Work From Home</span>
              </Link>
              <ul className="sub-menu">
                {
                  Cookies.get('level') !== 'L3' &&
                  (
                    <>
                      <li>
                        <Link to="/WFH">Apply WFH</Link>
                      </li>
                      <li>
                        <Link to="/WFH/records">My Records</Link>
                      </li>
                    </>
                  )
                }

                <li>
                  <Link to="/WFH/requests">Team's Request</Link>
                </li>
              </ul>
            </li>
            {
              (Cookies.get('team')==='Delivery' || Cookies.get('role')==='Chief Executive Officer') && (
              <li>
                <Link to="/#" className="has-arrow" >
                  <i className="bx bx-calendar"></i>
                  <span>{props.t("Time Sheet")}</span>
                </Link>
                <ul className="sub-menu">
                  <li>
                    <Link to="/timesheet/requests">{props.t("Team Request")}</Link>
                  </li>
                  <li>
                    {
                      Cookies.get('role')==='Chief Executive Officer' && (
                      <Link to="/timesheet/efficiency">{props.t("Team Efficiency")}</Link>
                      )
                    }
                    </li>
                  {
                    Cookies.get('role')==='Chief Executive Officer' && (
                      <li><Link to="/timesheet/cost-center">{props.t("Cost Center")}</Link></li>
                    )
                  }
                </ul>
              </li>
              )
            }{
              (Cookies.get('role') === 'HR - Operational Executive') && (
                <li>
                <Link to="/#" className="has-arrow" >
                  <i className="bx bx-calendar"></i>
                  <span>{props.t("Time Sheet")}</span>
                </Link>
                <ul className="sub-menu">
                  <li>
                    <Link to="/timesheet/approved-timesheet">{props.t("Approved Timesheet")}</Link>
                  </li>
                </ul>
              </li>
              )
            }

            <li>
              <Link to="/ticket/dashboard" className="has-arrow">
                <i className="mdi mdi-ticket-outline" />

                <span>{props.t("Raise a Ticket")}</span>
              </Link>
              {/* <ul className="sub-menu">
                <li>
                  <Link to="/ticket/dashboard">{props.t("Dashboard")}</Link>
                </li>
                <li>
                  <Link to="/ticket/myticket">{props.t("My Tickets")}</Link>
                </li>
                <li>
                  <Link to="/ticket/bookticket">{props.t("View Ticket")}</Link>
                </li>
              </ul> */}
            </li>
            <li>

              <Link to="/profile" className="">
                <i className="bx bx-user"></i>
                <span>{props.t("Profile")}</span>
              </Link>
            </li>
          </ul>
        </div>
      </SimpleBar>
    </React.Fragment>
  );
};

// SidebarContent.propTypes = {
//   location: PropTypes.object,
//   t: PropTypes.any,
// };

export default withRouter(withTranslation()(SidebarContent));
