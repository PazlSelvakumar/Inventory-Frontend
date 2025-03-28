import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../Protected/axios";
  
export const EditTypeMaster = () => {
  
  const { encrypted_id } = useParams(); 
  const navigate = useNavigate();
  const [typeName, setTypeName] = useState([]);
  const [error, setError] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false); 


  //get data useEffect
  useEffect(() => {
    const fetchType = async () => {
        try {
          const response = await axiosInstance.get(`/type/${encrypted_id}/edit`);
          if (response.data) {
            setTypeName(response.data.type.type_name);
          }
        } catch (error) {
          console.error("Error fetching type:", error);
          setError("Failed to fetch type details. Please try again later.");
        }
      };
      fetchType();
    }, [encrypted_id]);


// Submit Function
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!typeName.trim()) {
      setError("Type name is required");
      return;
    }
    setIsSubmitting(true);
    setError("");

    try {
      const response = await axiosInstance.put(`/type/${encrypted_id}`, {
        type_name: typeName,
      });
      if (response.status === 200) {
        console.log("Type updated successfully:", response.data);
        navigate("/admin-dashboard"); // Redirect to the TypeMaster page
      }
    } catch (error) {
      console.error("Error updating type:", error);
      setError("Failed to update type. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };



//View Page
  return (
    <div className="form-container">
      <h2>Edit Type</h2>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="typeName">Type Name</label>
          <input
            type="text"
            id="typeName"
            value={typeName}
            onChange={(e) => setTypeName(e.target.value)}
            placeholder="Enter type name"
          />
        </div>
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Updating..." : "Update"}
        </button>
      </form>
    </div>
  );
};