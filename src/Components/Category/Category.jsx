import React, { useState,useEffect } from 'react'
import { Link,useNavigate } from 'react-router-dom';
import axiosInstance from '../Protected/axios';

export const Category = () => {
  const [categories,setCategories]=useState([]);
  const navigate=useNavigate();
  const role=sessionStorage.getItem("role");
  const category = sessionStorage.getItem("category_id");

  useEffect(()=>{
   

     getCategories();
  },[]);
  

  const getCategories = async ()=>{
    try{
        const response = await axiosInstance.get("/category");

        if(Array.isArray(response.data)){
            setCategories(response.data);
        }else{
            console.log("unexpected formate : ", response.data)
        }

    }catch(error){
        console.log("unexpected response formate");
        
    }
  }

  const deleteType=async (encrypted_id)=>{
    try{
     
      const response = await axiosInstance.delete(`/category/${encrypted_id}`);

      if(response.status===200){
        setCategories(category.filter((category)=>category.id !== encrypted_id));
        getCategories();
        console.log("category deleted successfully:", response.data);
      }
    }catch(error){
      console.error("Error deleting category:", error);
    }
  }

  
  
  
  return (
    <div className="table-container">
      <div className="table-header">
        <h2>Categories</h2>
         <Link to="/add-category" className="btn green">Add New Category</Link> 
      </div>

      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Category Name</th>
            <th>Action</th>

          </tr>
        </thead>
        <tbody>
          {categories.map((category,index) => (
            <tr key={category.id}>
              <td>{index + 1}</td>
              <td>{category.category_name}</td>
              <td className="btn-container">
               
               
                <button
                    className="btn green"
                    onClick={() => navigate(`/edit-category/${category.encrypted_id}`)} 
                    >
                    Edit
                  </button>
                  
                  <button 
                  className="btn red"
                  onClick={() => {
                    if (window.confirm("Are you sure you want to delete this type?")) {
                      deleteType(category.encrypted_id);
                    }
                  }}
                  >Delete</button></td>

              
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
