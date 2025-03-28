import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../Protected/axios";

export const AddTypeMaster = () => {
  const [typeName, setTypeName] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();


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
      const response = await axiosInstance.post("/type/store", {
        type_name: typeName,
      });
      if (response.status === 201) {
        console.log("Type created successfully:", response.data);
        navigate("/admin-dashboard"); 
      }
    } catch (error) {
      console.error("Error creating type:", error);
      setError("Failed to create type. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };


//  View page
  return (
    <div className="form-container">
      <h2>Add New Type</h2>
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
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};