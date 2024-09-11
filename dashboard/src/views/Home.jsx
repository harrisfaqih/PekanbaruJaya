import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const Home = () => {
  const { role } = useSelector((state) => state.auth);
  if (role === "admin") return <Navigate to="/admin/dashboard" replace />;
  else if (role === "admin") return <Navigate to="/admin/dashboard" replace />;
  else return <Navigate to="/admin/login" replace />;
};

export default Home;
