import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../Protected/axios";
 
export const Users = () => {
  const [role, setRole] = useState(sessionStorage.getItem("role")); 
  const navigate = useNavigate();
  const [users, setUsers] = useState([]); 
  const[user_id, setUserId] = useState([]);


  // Get users useEffect
  useEffect(() => {

    fetchUsers();

  }, [role]); // Added role as dependency


  // Fetch Users from API
  const fetchUsers = async () => {
    try {
      const token = sessionStorage.getItem("token"); // Ensure token is sent
      const response = await axiosInstance.get("/users/index", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Response: ", response.data.user);
      if (response.data.user && Array.isArray(response.data.user)) {
        // setUsers(response.data.user); 


        const usersData = response.data.user;

        // Fetch department & type for each user
      const usersWithDetails = await Promise.all(
        usersData.map(async (user) => {
          let department_name = "Not Assigned";
          let type_name = "Not Assigned";

          try {
            if (user.dept_id) {
              const departmentResponse = await axiosInstance.get(`/department/${user.dept_id}/edit`);
              department_name = departmentResponse.data.department.department_name;
            }
          } catch (error) {
            console.error(`Error fetching department for user ${user.id}:`, error);
            department_name = "Unknown";
          }

          try {
            if (user.type_id) {
              const typeResponse = await axiosInstance.get(`/type/${user.type_id}/edit`);
              type_name = typeResponse.data.type.type_name;
            }
          } catch (error) {
            console.error(`Error fetching type for user ${user.id}:`, error);
            type_name = "Unknown";
          }

          return { ...user, department_name, type_name };
        })
      );

      setUsers(usersWithDetails); 

      // // Fetch type names for each user
      // const usersWithTypes = await Promise.all(
      //   usersData.map(async (user) => {
      //     if (user.type_id) {
      //       try {
      //         const typeResponse = await axiosInstance.get(`/type/${user.type_id}/edit`);
      //         return { ...user, type_name: typeResponse.data.type.type_name };
      //       } catch (error) {
      //         console.error(`Error fetching type for user ${user.id}:`, error);
      //         return { ...user, type_name: "Unknown" }; // Default value in case of error
      //       }
      //     }
      //     return { ...user, type_name: "Not Assigned" }; // Handle users without a type_id
      //   })
      // );

      // setUsers(usersWithTypes); 
        



      } else {
        console.error("Unexpected response format:", response.data);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }finally{
      setloading(false);
    }
  };

  // Delete user
  const deleteUser = async (id) => {
    try {
      const token = sessionStorage.getItem("token"); // Ensure token is sent
      const response = await axiosInstance.delete(`/users/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        setUsers(users.filter((user) => user.id !== id)); // Update state after deletion
        console.log("User deleted successfully:", response.data);
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };




  //get Type from api
  const getTypes = async()=> {
    try {
      const token = sessionStorage.getItem("token");
      const response = await axiosInstance.get("/type");
      console.log("Response fetched successfully:",response);
      const type_id = response.data.data.id;
      s//essionStorage.setItem("type_id", type_id);

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





// View Page
  return (
    <div className="table-container">
      <div className="table-header">
        <h2>Users</h2>
        {role === "admin" && (
          <Link to="/add-user" className="btn green">
            Add New User
          </Link>
        )}
      </div>

      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Role</th>
            <th>Type</th>
            <th>Department</th>
            {role === "admin" && <th>Action</th>}
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user.id}>
              <td>{index + 1}</td>
              <td>{user.name}</td>
              <td>{user.role}</td>
              <td>{user.type_name}</td>
              <td>{user.department_name}</td>
             
              {role === "admin" && (
                <td className="btn-container">
                  <button className="btn green" onClick={() => navigate(`/edit-user/${user.id}`)} >
                    Edit
                  </button>
                  <button className="btn red" 
                    onClick={() => {
                      if (window.confirm("Are you sure you want to delete this user?")) {
                        deleteUser(user.id);
                      }
                    }}
                  > Delete </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
