import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../Protected/axios';

export const AddCategory = () => {
  const [category,setCategory]=useState("");
  const navigate=useNavigate();
  const [isSubmitting,setIsSubmitting]=useState(false);
  const [error,setError]=useState("");
  const [departments,setDepartments]=useState([]);
  const [deptId,setDeptId]=useState("");
  const type_id=sessionStorage.getItem("type_id");
  


useEffect (()=>{
  getDepartment();
},[])

const getDepartment = async ()=>{
  try{
    const response=await axiosInstance.get(`/type/departments/${type_id}`);
    if (response.status === 200){
      if(Array.isArray(response.data.data)){
        console.log(response.data.data);
        setDepartments(response.data.data);
      }else{
        console.log("Not an array");
        setError("response is not an format")
      }
    }


  }catch(error){

  }
}



  
 const handleSubmit = async(e)=>{
    e.preventDefault();
    try{
        if (!category.trim()) { 
            setError("Category name is required");
            return;
        }
        // console.log(deptId);return;
        
        setIsSubmitting(true);
        setError("");
        
        const response=await axiosInstance.post("/category/store",{
                department_id:deptId,
                category_name:category
        });
        if(response.status === 201){
            console.log("Category created successfully:", response.data);
            navigate("/category");
        }else{
            alert("Unexpected response from server.");
        }

    }catch(error){
        setError(error);
        console.log(error);
    }finally {
        setIsSubmitting(false);
    }
 }
  
  
  
  //  View page
  return (
    <div className="form-container">
      <h2>Add Category</h2>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit}>

      <div className="form-group">
        <label htmlFor="department_id">Department</label>
        <select id="department_id" value={deptId} required
          onChange={(e) => setDeptId(e.target.value)} >
          <option value="">Select</option>

          {departments?.map((department) => (
            <option key={department.id} value={department.id}>
              {department.department_name} 
            </option>
          ))}
        </select>
      </div>


        <div className="form-group">
          <label htmlFor="categoryName">Category Name</label>
          <input
            type="text"
            id="categoryName"
            value={category}
            onChange={(e) => setCategory(e.target.value)} 
            placeholder="Enter category name"
          />
        </div>
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
  
  
  
  
  
  
  
  
}
