import React from "react";
import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const PrivateRoute = ({ chilren }) => {
  const { currentUser, loading } = useContext(AuthContext);
  // const location = useLocation();

  console.log("from private route");
  if (currentUser) {
    return <Outlet />;
  } else if (loading) {
    return <progress className="progress w-56"></progress>;
  }
  return <Navigate to="/login"></Navigate>;
};

export default PrivateRoute;
