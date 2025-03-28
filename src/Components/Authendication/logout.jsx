import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../Protected/axios";

export const Logout = () => {
    

    const navigate = useNavigate();
  
    const handleLogout = async () => {
      const token = sessionStorage.getItem("token");

      if (!token) {
        navigate("/login");
        return;
      }
  
      try {
        await axiosInstance.post("/logout");
      } catch (error) {
        console.error("Logout failed:", error.response?.data || error.message);
      } finally {
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("role");
        navigate("/login");
      }
    };
  
    return <button onClick={handleLogout}>Logout</button>;
  };