import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Login.css";


export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/login", { email, password });
      console.log("Response is ",response.data);
      
      const token = response.data.token;
      const role = response.data.user.role;
      const type_id = response.data.user.type_id;
      const dept_id = response.data.user.dept_id;
      
      sessionStorage.setItem("token", token);
      sessionStorage.setItem("role", role); 
      sessionStorage.setItem("dept_id",dept_id);


      if(role !== "admin") {
        sessionStorage.setItem("type_id", type_id);  
      }
      
      
      if (role === "admin") {
        navigate("/types"); 
      } else if (role === "manager") {
        navigate("/department"); 
      } else {
        navigate("/department"); 
      }




    } catch (error) {
      setError(error.response?.data?.message || "Login failed");
      console.error(error.message);
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};
export default Login;