import  { useEffect, useState } from 'react'
import { useNavigate, useParams,  } from 'react-router-dom';
import axiosInstance from '../Protected/axios';

export const EditCategory = () => {
  const [categoryName,setCategoryName]=useState("");
  const [error,setError]=useState("");
  const [isSubmitting,setIsSubmitting]=useState(false);
  const {encrypted_id}=useParams();
  const navigate=useNavigate();
  const dept_id=sessionStorage.getItem("dept_id");
  sessionStorage.setItem("category_id", encrypted_id); 

  
  useEffect(() => {
    if (encrypted_id) {
      getCategory();
    }
  }, [encrypted_id]);

  const getCategory = async ()=>{
    try{
      const response=await axiosInstance.get(`/category/${encrypted_id}/edit`);
          setCategoryName(response.data.category.category_name);
          console.log(response.data.category.category_name);
    }catch(error){
      console.error("Error fetching type:", error);
      setError("Failed to fetch type details. Please try again later.");
    }

  }

  const handleSubmit=async (e)=>{
      e.preventDefault();
      if(!categoryName.trim()){
        setError("categoryName name is required");
        return;
      }

      setIsSubmitting(true);
      setError("");

      try{
        const response=await axiosInstance.put(`/category/${encrypted_id}`,{
          department_id:dept_id,
          category_name:categoryName
        });
        navigate('/category');
      }catch(error){
        console.error("Error updating type:", error);
        setError("Failed to update type. Please try again later.");
      }finally{
          setIsSubmitting(false);
      }

  
  }
  
  
  
  
  return (
    <div className="form-container">
      <h2>Edit Category</h2>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="categoryName">Category Name</label>
          <input
            type="text"
            id="categoryName"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            placeholder="Enter Category name"
          />
        </div>
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Updating..." : "Update"}
        </button>
      </form>
    </div>
  );
}
