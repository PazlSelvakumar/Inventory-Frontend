import { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../Protected/axios';


export const AddDepartment = () => {
    const type_id = sessionStorage.getItem("type_id");
    const [deptName, setDeptName] = useState("");
    const [error, setError] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {

    }, []);

    const handleSubmit = async (e) => { 
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);
        try {
          const response = await axiosInstance.post("/department/store", {
            type_id: type_id,  // Assuming dept_id is stored in session storage
            department_name: deptName,
          });
          if (response.status === 201) {
            console.log("Department created successfully:", response.data);
            navigate("/department");
          } else {
            setError("Failed to create department. Please try again later.");
          }
        } catch (error) {
          console.error("Error creating department:", error);
          setError("Failed to create department. Please try again later.");
        } finally {
          setIsSubmitting(false);
        }
        setDeptName("");
      };









    return (
    <div className="form-container">
      <h2>Add New Type</h2>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="deptName">Department Name</label>
          <input
            type="text"
            id="deptName"
            value={deptName}
            onChange={(e) => setDeptName(e.target.value)}
            placeholder="Enter Department name"
          />
        </div>
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
}
