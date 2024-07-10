import React from "react";
// import AdminDashboard from "../views/admin/AdminDashboard";
import { useRoutes } from "react-router-dom";
// Sesuaikan dengan lokasi file komponen AdminDashboard

const Router = ({ allRoutes }) => {
  const routes = useRoutes([
    ...allRoutes,
    //   { path: "/admin/dashboard", element: <AdminDashboard /> },
  ]);
  return routes;
};

export default Router;
