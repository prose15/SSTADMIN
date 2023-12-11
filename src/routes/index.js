import React from "react";
import { Navigate } from "react-router-dom";

// Profile
import UserProfile from "../pages/Authentication/user-profile";

// Authentication related pages
import Login from "../pages/Authentication/Login";
import Logout from "../pages/Authentication/Logout";
import Register from "../pages/Authentication/Register";
import ForgetPwd from "../pages/Authentication/ForgetPassword";
import DashboardSaas from "../pages/timesheet/Dashboard-saas/index"
// Dashboard
import Dashboard from "../pages/Dashboard/index";
import Logtime from "pages/timesheet/Dashboard-saas/pages/Logtime";
import Mytimesheet from "pages/timesheet/Dashboard-saas/pages/Mytimesheet";
import Myapprovals from "pages/timesheet/Dashboard-saas/pages/Myapprovals";
import CreateTImeSheet from "pages/timesheet/Dashboard-saas/pages/CreateTImeSheet";

const authProtectedRoutes = [
  { path: "/dashboard", component: <Dashboard /> },
  //leave tracker
  { path: "/leavetracker/dashboard", component: <Dashboard /> },
  { path: "/leavetracker/dashboard", component: <Dashboard /> },
  { path: "/leavetracker/dashboard", component: <Dashboard /> },
  //timesheet
  { path: "/timesheet/dashboard", component: <DashboardSaas /> },
  { path: "/timesheet/mytimesheet", component: <Mytimesheet /> },
  { path: "/timesheet/myapprovals", component: <Myapprovals /> },
  //ticket 
  { path: "/ticket/dashboard", component: <Dashboard /> },
  { path: "/timesheet/myticket", component: <Dashboard />  },
  { path: "/timesheet/book ticket", component: <Dashboard />  },

  { path: "/timesheet/logtime", component: <Logtime /> },
  { path: "/timesheet/mytimesheet/createtimesheet", component: <CreateTImeSheet /> },
  //profile

  { path: "/profile", component: <UserProfile /> },

  // this route should be at the end of all other routes
  // eslint-disable-next-line react/display-name
  {
    path: "/",
    exact: true,
    component: <Navigate to="/dashboard" />,
  },
];

const publicRoutes = [
  { path: "/login", component: <Login /> },
  { path: "/logout", component: <Logout /> },
  { path: "/forgot-password", component: <ForgetPwd /> },
  { path: "/register", component: <Register /> },
];

export { authProtectedRoutes, publicRoutes };
