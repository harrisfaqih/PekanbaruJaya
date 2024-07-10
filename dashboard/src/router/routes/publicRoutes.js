import { lazy } from "react";
import AdminLogin from "../../views/auth/AdminLogin";
// import UnAuthorized from "../../views/UnAuthorized.jsx";

const Login = lazy(() => import("../../views/auth/Login"));
const Register = lazy(() => import("../../views/auth/Register"));
const Home = lazy(() => import("../../views/Home.jsx"));
const UnAuthorized = lazy(() => import("../../views/UnAuthorized.jsx"));

const publicRoutes = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/admin/login",
    element: <AdminLogin />,
  },
  {
    path: "/unauthorized",
    element: <UnAuthorized />,
  },
];

export default publicRoutes;
