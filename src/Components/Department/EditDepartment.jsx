import { useState,useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axiosInstance from '../Protected/axios';

export const EditDepartment = () => {
    const [departmentName, setDepartmentName] = useState("");
    const [error, setError] = useState("");
    const [isSubmitting,setIsSubmitting] = useState(false);
    const navigate = useNavigate();
    const { id } = useParams();
    const type_Id=sessionStorage.getItem("type_id");
                  // sessionStorage.setItem("dept_id",id);
    
    


    useEffect(()=> {
        fetchDepartments();
    },[]);

    const fetchDepartments = async () =>{
        try{
            const response = await axiosInstance.get(`department/${id}/edit`);
            if(response.status === 200) {
                setDepartmentName(response.data.department.department_name)
                
            }else {
                setError(response.data.message);
            }
        }catch(e){
            console.log(e);
            setError("Failed to fetch department details. Please try again later.");
            navigate('/department');
        }
    }

    const handleSubmit=async (e)=>{
      e.preventDefault();
      if(!departmentName.trim()){
        setError("Department name is required");
        return;
      }
        setIsSubmitting(true);
        setError("");

        try{
            const response = await axiosInstance.put(`/department/${id}`,{
                type_id:type_Id,
                department_name: departmentName,
            });

            // const response = await axiosInstance.put(`/type/${encrypted_id}`, {
            //     type_name: typeName,
            //   });


                console.log("Department updated Successfully");
                navigate('/department');
        }catch(error){
            console.error("Error updating type:", error);
            setError("Failed to update type. Please try again later.");
        }finally{
            setIsSubmitting(false);
        }
    }
    
  
  
  
  
  
    return (
        <div className="form-container">
          <h2>Edit Type</h2>
          {error && <div className="error-message">{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="departmentName">Department Name</label>
              <input
                type="text"
                id="departmentName"
                value={departmentName}
                onChange={(e) => setDepartmentName(e.target.value)}
                placeholder="Enter Department name"
              />
            </div>
            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Updating..." : "Update"}
            </button>
          </form>
        </div>
      );
}
