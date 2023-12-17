import React from "react";
import { Navigate } from "react-router-dom";
// Profile
import UserProfile from "../pages/Authentication/user-profile";
import DashboardSaas from "../pages/timesheet/Dashboard-saas/index"
// Dashboard
import Dashboard from "../pages/Dashboard/index";
import Logtime from "pages/timesheet/Dashboard-saas/pages/Logtime";
import Mytimesheet from "pages/timesheet/Dashboard-saas/pages/Mytimesheet";
import Myapprovals from "pages/timesheet/Dashboard-saas/pages/Myapprovals";
import CreateTImeSheet from "pages/timesheet/Dashboard-saas/pages/CreateTImeSheet";
import MyTicket from "pages/Ticket/MyTicket";
import TicketDashboard from "pages/Ticket/Dashboard";
import RiseTicket from "pages/Ticket/RiseTIcket";

// Authentication related pages
import Login from "../pages/Authentication/LoginTemp";
import Logout from "../pages/Authentication/Logout";
import Register from "../pages/Authentication/Register";
import ForgetPwd from "../pages/Authentication/ForgetPassword";
// Dashboard
import LeaveRecords from "pages/LeaveTracker/LeaveRecords";
import LeaveApprovals from "pages/LeaveTracker/LeaveApprovals";
import AddLeave from "pages/LeaveTracker/AddLeave";
import LeaveTracker from "pages/LeaveTracker/index";

const authProtectedRoutes = [
  { path: "/dashboard", component: <Dashboard /> },
  //leave tracker
  { path: "/leavetracker", component: <LeaveTracker /> },
  { path: "/leave/records", component: <LeaveRecords /> },
  { path: "/leave/approvals", component: <LeaveApprovals /> },
  { path: "/addleave", component: <AddLeave/> },
  //timesheet
  { path: "/timesheet/dashboard", component: <DashboardSaas /> },
  { path: "/timesheet/mytimesheet", component: <Mytimesheet /> },
  { path: "/timesheet/myapprovals", component: <Myapprovals /> },
  { path: "/timesheet/logtime", component: <Logtime /> },
  { path: "/timesheet/mytimesheet/createtimesheet", component: <CreateTImeSheet /> },
  //ticket 
  { path: "/ticket/dashboard", component: <TicketDashboard /> },
  { path: "/ticket/myticket", component: <MyTicket />  },
  { path: "/ticket/bookticket", component: <RiseTicket />  },


  //profile 

  { path: "/profile", component: <UserProfile /> },

  // this route should be at the end of all other routes
  // eslint-disable-next-line react/display-name
  {
    path: "/",
    exact: true,
    component: <Navigate to="/login" />,
  },
];

const publicRoutes = [
  { path: "/login", component: <Login /> },
  { path: "/forgot-password", component: <ForgetPwd /> },
  { path: "/register", component: <Register /> },
];

export { authProtectedRoutes, publicRoutes };
