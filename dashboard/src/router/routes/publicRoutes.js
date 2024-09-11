import { lazy } from "react";
import AdminLogin from "../../views/auth/AdminLogin";
// import UnAuthorized from "../../views/UnAuthorized.jsx";

const Home = lazy(() => import("../../views/Home.jsx"));
//const UnAuthorized = lazy(() => import("../../views/UnAuthorized.jsx"));

const publicRoutes = [
  {
    path: "/",
    element: <Home />,
  },

  {
    path: "/admin/login",
    element: <AdminLogin />,
  },
  // {
  //   path: "/unauthorized",
  //   element: <UnAuthorized />,
  // },
];

export default publicRoutes;
