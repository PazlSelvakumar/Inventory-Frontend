import React, { useState, useEffect } from 'react';
import axiosInstance from '../Protected/axios';
import { Link ,useNavigate } from 'react-router-dom';


export const Department = () => {
   const navigate = useNavigate();
   const [departments, setDepartments] = useState([]);
   const type_id = sessionStorage.getItem("type_id");
   const role = sessionStorage.getItem("role");



    useEffect(()=>{
      fetchDepartments();
    },[]);

    const fetchDepartments = async() => {
      try{
        const response = await axiosInstance.get(`/type/departments/${type_id}`);
        if(Array.isArray(response.data.data)){
          setDepartments(response.data.data);
        }else{
          console.log("Not an array");
        }

      }catch(e){
        console.log(e);
      }

    }

   
    
    return (
      <div className="table-container">
        <div className="table-header">
        <h2>Department Master</h2>
        {role == "admin" && (
            <Link to="/add-department" className="btn green">
              Add New Type
            </Link>
          )}
        {/* <Link to="/add-type" className="btn green">Add New Type</Link> */}
        </div>
  
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              {role === "admin" && <th>Action</th>}
  
            </tr>
          </thead>
          <tbody>
                {departments.map((department, index) => (
                  <tr key={department.id}>
                    <td>{index + 1}</td>
                    <td>{department.department_name}</td>
                    {role === "admin" && (
                      <td className="btn-container">
                        <button
                          className="btn green"
                          onClick={() => navigate(`/edit-department/${department.id}`)} // Use department.id
                        >
                          Edit
                        </button>

                        <button
                          className="btn red"
                          onClick={() => {
                            if (window.confirm("Are you sure you want to delete this department?")) {
                              deleteType(department.id); 
                            }
                          }}
                        >
                          Delete
                        </button>
                      </td>
                    )}
                  </tr>
                ))}
          </tbody>
        </table>
      </div>
    );
}
