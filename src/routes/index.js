import React from "react";
import { Navigate } from "react-router-dom";
// Profile
import UserProfile from "../pages/Authentication/user-profile";
// Dashboard
import Dashboard from "../pages/Dashboard/index";
import Logtime from "pages/timesheet/Dashboard-saas/pages/Logtime";
import CreateTImeSheet from "pages/timesheet/Dashboard-saas/pages/CreateTImeSheet";
import MyTicket from "pages/Ticket/MyTicket";
import TicketDashboard from "pages/Ticket/Dashboard";
import RiseTicket from "pages/Ticket/RiseTIcket";
import ApplyAgain from "pages/Forms/ApplyAgain";

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
import TeamRequests from "pages/LeaveTracker/TeamRequests";
import TimesheetTeamRequests from "pages/timesheet/Dashboard-saas/TimesheetTeamRequests";
import AllRecords from "pages/LeaveTracker/AllRecords";
//WFH
import WFH from "pages/WFH/index";
import WFHRecord from "pages/WFH/WFHRecord";
import WFHTeamRequests from "pages/WFH/WFHTeamRequests";
import FestiveLeave from "pages/Forms/FestiveLeave";
import TeamEfficiency from "pages/timesheet/Dashboard-saas/pages/TeamEfficiency";
import ResetPassword from "pages/Authentication/ResetPassword";
import WFHApplyAgain from "pages/WFH/ApplyAgain";
import Viewtimesheet from "pages/timesheet/Dashboard-saas/pages/Viewtimesheet";
import PagesComingsoon from "utilites/PagesComingSoon";
import Pages404 from "utilites/Pages404";
import ApprovalCard from "pages/LeaveTracker/ApprovalCard";
import Approvals from "Approvals/Approvals";
import ViewTeamTimesheet from "pages/timesheet/Dashboard-saas/pages/ViewTeamTimesheet";
import ApprovedTimesheet from "pages/timesheet/Dashboard-saas/pages/ApprovedTimesheet";

const authProtectedRoutes = [
  { path: "/dashboard", component: <Dashboard /> },
  //leave tracker
  { path: "/leavetracker", component: <LeaveTracker /> },
  { path: "/leave/records", component: <LeaveRecords /> },
  { path: "/leave/approvals", component: <LeaveApprovals /> },
  { path:"/leave/requests",component: <TeamRequests />},
  { path:"/leave/festiveleave",component: <FestiveLeave />},
  { path: "/addleave", component: <AddLeave/> },
  { path: "/allrecords", component: <AllRecords /> },
  { path: "/addleave/:id", component: <ApplyAgain /> },
  //WFH
  {path: '/WFH', component: <WFH/>},
  {path: "/WFH/records", component: <WFHRecord/>},
  { path:"/WFH/requests",component: <WFHTeamRequests />},
  { path:"/WFH/apply-again/:id",component: <WFHApplyAgain />},
  //timesheet
  { path: "/timesheet/logtime", component: <Logtime /> },
  { path: "/timesheet/requests", component: <TimesheetTeamRequests/>},
  { path: "/timesheet/requests/viewtimesheet/:id", component: <Viewtimesheet />},
  { path: "/timesheet/efficiency", component: <TeamEfficiency/>},
  { path: "/timesheet/mytimesheet/createtimesheet", component: <CreateTImeSheet /> },
  { path: "/timesheet/view-timesheet/:id", component: <ViewTeamTimesheet /> },
  { path: "/timesheet/approved-timesheet", component: <ApprovedTimesheet /> },
  //ticket 
  { path: "/ticket/dashboard", component: <PagesComingsoon/> },
  // { path: "/ticket/myticket", component: <MyTicket />  },
  // { path: "/ticket/bookticket", component: <RiseTicket />  },

  //Approvals
  {path:'/approvals',component:<Approvals/>},

  //profile 
  { path: "/profile", component: <UserProfile /> },
  {
    path: "/",
    exact: true,
    component: <Navigate to="/login" />,
  },
  {path:'*',component: <Pages404/>}
];

const publicRoutes = [
  { path: "/login", component: <Login /> },
  { path: "/forgot-password", component: <ForgetPwd /> },
  { path: "/reset-password", component: <ResetPassword /> },
  { path: "/register", component: <Register /> },
];

export { authProtectedRoutes, publicRoutes };
