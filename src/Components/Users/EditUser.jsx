import React, { useState,useEffect } from 'react';
import axiosInstance from '../Protected/axios';
import { useParams,useNavigate } from 'react-router-dom';


export const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isRoleFetched, setIsRoleFetched] = useState([]);
  

// Get data useEffect
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axiosInstance.get(`/users/edit/${id}`);
        const userData = response.data;
        setName(userData.user.name);
        setEmail(userData.user.email);
        setRole(userData.user.role);
      } catch (error) {
        console.error(error);
        setError("Failed to load user data.");

      }
    };
    fetchUser();
    getRole();
  }, [id]);


  const getRole = async () => {
    try{
      const response = await axiosInstance.get("/users/index");


      if(Array.isArray(response.data.user)){
       setIsRoleFetched(response.data.user);
        console.log("Roles fetched successfully:", response.data.user);
      }else{
        console.error("Unexpected response format:", response.data);
      }
    }catch(error){
      console.error("Error fetching roles:", error);
    }

 }

// Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await axiosInstance.put(`/users/update/${id}`, {
        name,
        email,
        password, // If empty, backend should handle keeping old password
        role,
      });
      navigate('/users');
    } catch (error) {
      console.error(error);
      setError("Failed to update user.");

    }finally{
      setIsSubmitting(false);
    }
  };


// View Page 
  return (
    <div className="form-container">
      <h2>Edit User</h2>
      {error && <div className="error-message">{error}</div>}

      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleSubmit}>
        
        <div className="form-group">
          <label htmlFor="name">User Name</label>
          <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter user name" />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="text" id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter user email" />
        </div>

        <div className="form-group">
          <label htmlFor="password">User Password</label>
          <input type="text" id="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter user Password" />
        </div>

        <div className="form-group">
          <label htmlFor="role">Select User Role</label>
          {/* <input type="text" id="role" value={role} onChange={(e) => setRole(e.target.value)} placeholder="Enter user role" /> */}
          <select id="role" value={role} onChange={(e) => setRole(e.target.value)} >
                <option value="">Select Role</option>
                  {[...new Map(
                    isRoleFetched
                      .filter((role) => role.role !== "admin") // Exclude "admin"
                      .map((role) => [role.role, role]) // Create key-value pairs to remove duplicates
                  ).values()].map((role) => (
                    <option key={role.id} value={role.role}>
                      {role.role}
                    </option>
                  ))}
            </select>
        
        
        </div>


        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Updating..." : "Update"}
        </button>

      </form>
    </div>
  );
}
