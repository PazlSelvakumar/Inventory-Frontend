import React from "react";
import { Link, Outlet } from "react-router-dom";
import "./Layout.css"; // Import your CSS file for styling


const token=sessionStorage.getItem("token");
const role=sessionStorage.getItem("role");
const type_id=sessionStorage.getItem("type_id");


const Layout = () => {
  return (
    <div className="layout-container">
      {/* Header */}
      <header className="header">
        <h1>Inventory Management</h1>
      {/* Logout link */}  
        <Link to="/logout">Logout</Link> 
      </header>

      <div className="main-content">
        {/* Sidebar */}
        <aside className="sidebar">
          <nav>
            <ul>
              <li>
                <Link to="/users">User</Link>
              </li>
              <li>
                <Link to="/admin-dashboard">Type Master</Link>
              </li>
              <li>
                <Link to="/department">Department Master</Link>
              </li>
              <li>
                <Link to="/category">Category</Link>
              </li>
              <li>
                <Link to="/products">Products</Link>
              </li>
              <li>
                <Link to="/other-page">Other Page</Link>
              </li>
            </ul>
          </nav>
        </aside>

        <main className="content">
          <Outlet /> {/* This will render the nested routes */}
        </main>
      </div>
    </div>
  );
};

export default Layout;