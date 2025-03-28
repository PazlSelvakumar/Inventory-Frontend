import { useEffect,useState } from "react"; 
import { Link, useNavigate} from "react-router-dom";
import axiosInstance from "../Protected/axios";


export const TypeMaster = () => {
  const [role, setRole] = useState(sessionStorage.getItem("role")); 
  const navigate = useNavigate();
  const [types, setTypes] = useState([]);  

  // const dept=sessionStorage.getItem("dept_id");
  // console.log(" dept is ", dept);


    //get data from api
    const getTypes = async()=> {
      try {
        const token = sessionStorage.getItem("token");
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
        console.error("Error fetching types:", error);
      }
    };

    //Get data useEffect
    useEffect(() => {
      getTypes();
    }, []);



    //delete type
    const deleteType = async (id) => {
      try {
        const response =await axiosInstance.delete(`/type/${id}`);
        if(response.status === 200){
           setTypes(types.filter((type) => type.id!== id));
          // setTypes((prevTypes) => prevTypes.filter((type) => type.id !== id));
          getTypes();
          console.log("Type deleted successfully:", response.data);
        }
      } catch (error) {
        console.error("Error deleting type:", error);
      }
    };



   return (
    <div className="table-container">
      <div className="table-header">
      <h2>TypeMaster</h2>
      {role == "admin" && (
          <Link to="/add-type" className="btn green">
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
          {types.map((type,index) => (
            <tr key={type.id}>
              <td>{index + 1}</td>
              <td>{type.type_name}</td>
              {role === "admin" && (
              <td className="btn-container">
               
               
                <button
                    className="btn green"
                    onClick={() => navigate(`/edit-type/${type.encrypted_id}`)} 
                    >
                    Edit
                  </button>
                  
                  <button 
                  className="btn red"
                  onClick={() => {
                    if (window.confirm("Are you sure you want to delete this type?")) {
                      
                      deleteType(type.encrypted_id);
  
                    }
                  }}
                  >Delete</button></td>

                )}
              
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

