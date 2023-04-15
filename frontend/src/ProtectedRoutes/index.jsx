import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProtectedRoutes = (props) => {
  const { Component } = props;
  const navigate = useNavigate();

  useEffect(() => {
    let authDetails = JSON.parse(localStorage.getItem("authDetails"));
    console.log("authDetails", authDetails);
    if (!authDetails?.token) {
      navigate("/login");
    }
  }, []);
  
  return (
    <div>
      <Component />
    </div>
  );
};

export default ProtectedRoutes;
