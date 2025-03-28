import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../Protected/axios";

export const AdminPopup= () => {

  const [role,setRole] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [types, setTypes] = useState([])
  const [typeId, setTypeId] = useState(""); 


 // Fetch data when the component mounts
    useEffect(() => {
      getTypes();
    }, []);


//get data from api
  const getTypes = async()=> {
    try {
      const response = await axiosInstance.get("/type");
      const type_id = response.data.data.id;
      //sessionStorage.setItem("type_id", type_id);
      if (Array.isArray(response.data.data)) {
        setTypes(response.data.data);
        console.log("Types fetched successfully:", response.data);
      } else {
        console.error("Unexpected response format:", response.data);
      }

    } catch (error) {
      const response = await axiosInstance.get("/type");
      console.error("Error fetching types:", error);
    }
  };


// select type
  const handleSubmit = async (e) => {
    e.preventDefault();
   
   if (!typeId.trim()) {
        setError("Type ID is required");
        return;
      }

      setIsSubmitting(true);
      setError("");

      if(role !== "admin") {
        sessionStorage.setItem("type_id", typeId);  
        navigate("/department"); 
      }else{
        navigate("/department");
      }
  };


  // View page
  return (
    <div className="form-container">
      <h2>Types</h2>
      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="type_id">Type</label>
        <select
          id="type_id"
          value={typeId}
          onChange={(e) => setTypeId(e.target.value)}
          required 
        >
          <option value="">Select Type</option>
          {types.map((type) => (
            <option key={type.id} value={type.id}>
              {type.type_name}
            </option>
          ))}
        </select>
      </div>

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );

}