import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../Protected/axios";

export const AddUsers = () => {

  const [name, setName] = useState("");
  const [email,setEmail] =useState("");
  const [password, setPassword] = useState("");
  const [role,setRole] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [types, setTypes] = useState([])
  const [typeId, setTypeId] = useState(""); // State to store selected Type ID
  const [customRole, setCustomRole] = useState(""); // State for custom role input
  const [showCustomInput, setShowCustomInput] = useState(false); // Toggle input visibility
  const [isRoleFetched, setIsRoleFetched] = useState([]);
  const [departments,setDepartments]=useState([]);
  const [deptId,setDeptId]=useState("");


  // Get data useEffect
  useEffect(() => {
    getTypes();
    getRole();
    getDepartment();
  }, []);

  // get Department
  const getDepartment= async () =>{
    try{
      const response=await axiosInstance.get("/department");
    if(response.status ===200){
      if(Array.isArray(response.data.data)){
        setDepartments(response.data.data);
        console.log(response.data.data);
      }else{
        console.log("Not Array");
        
      }
    }

    }catch{
      console.error("Error fetching types:", error);
    }
  }

  //get data from api
  const getTypes = async()=> {
    try {
      const token = sessionStorage.getItem("token");
      const response = await axiosInstance.get("/type");
      console.log("Response fetched successfully:",response);
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
      // console.log(response.data);
      console.error("Error fetching types:", error);
    }
  };

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
    console.log("Type ID before sending:", typeId);
   
    if (!name.trim()) { 
        setError("Name is required");
        return;
      }else if(!email.trim()) {
        setError("Email is required");
        return;
      }else if(!password.trim()) {
        setError("Password is required");
        return;
      }else if(!role.trim()) {
        setError("Role is required");
        return;
      }else  if (!typeId.trim()) {
        setError("Type ID is required");
        return;
      }
      setIsSubmitting(true);
      setError("");

    try {
      const response = await axiosInstance.post("/users/create", { name, email, password, role, type_id: typeId, dept_id:deptId   });
      if (response.status === 201) {
        console.log("Type created successfully:", response.data);
        navigate("/users"); 
      }
    } catch (error) {
      console.error(error.message);
    }
  };


  // Role Selection
  const handleRoleChange = (e) => {
    const selectedRole = e.target.value;
    setRole(selectedRole);
    if (selectedRole === "other") {
      setShowCustomInput(true);
    } else {
      setShowCustomInput(false);
      setCustomRole(""); // Reset custom role if not needed
    }
  };



  // View Page
  return (
    <div className="form-container">
      <h2>Add New User</h2>
      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="type_id">Type</label>
          <select id="type_id" value={typeId} required 
            onChange={(e) => setTypeId(e.target.value)}>
            <option value="">Select Type</option>
            
            {types.map((type) => (
              <option key={type.id} value={type.id}>
                {type.type_name}
              </option>
            ))}

          </select>
        </div>



        <div className="form-group">
          <label htmlFor="type_id">Department</label>
          <select name="dept" id="dept" value={deptId} onChange={(e)=>setDeptId(e.target.value)}>
            <option value="">Select</option>
            
            {departments.map((department)=>(
            <option key={department.id} value={department.id}>{department.department_name}</option>
            ))}


          </select>
        </div>

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
        <label htmlFor="role">Select Your Role</label>
            <select id="role" value={role} onChange={handleRoleChange}>
                <option value="">Select Role</option>
                {/* <option value="admin">Admin</option>
                <option value="user">User</option> */}

                  {[...new Map(
                    isRoleFetched
                      .filter((role) => role.role !== "admin") // Exclude "admin"
                      .map((role) => [role.role, role]) // Create key-value pairs to remove duplicates
                  ).values()].map((role) => (
                    <option key={role.id} value={role.role}>
                      {role.role}
                    </option>
                  ))}
                <option value="other">Other</option>
            </select>

            {showCustomInput && (
                <input
                type="text"
                placeholder="Enter custom role"
                value={role} onChange={(e) => setRole(e.target.value)}
                />
            )}
        </div>

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>

      </form>
    </div>
  );
}