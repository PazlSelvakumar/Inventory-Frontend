import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from './Components/Layouts/Layout';
import Login from './Components/Authendication/login'; 
import './index.css';
import { TypeMaster } from './Components/TypeMaster/Typemaster';
import { AddTypeMaster } from './Components/TypeMaster/AddTypeMaster';
import { EditTypeMaster } from './Components/TypeMaster/EditTypeMaster';
import { Logout } from './Components/Authendication/Logout';
import ProtectedRoute from './Components/Protected/ProtectedRoute';
import { Users } from './Components/Users/users';
import { AddUsers } from './Components/Users/AddUsers';
import { EditUser } from './Components/Users/EditUser';
import { Department } from './Components/Department/Department';
import { AdminPopup } from './Components/Authendication/AdminPopup';
import { AddDepartment } from './Components/Department/AddDepartment';
import { EditDepartment } from './Components/Department/EditDepartment';
import { Category } from './Components/Category/Category';
import { AddCategory } from './Components/Category/AddCategory';
import { EditCategory } from './Components/Category/EditCategory';
import { Products } from './Components/Products/Products';
import { AddProducts } from './Components/Products/AddProducts';
import { EditProducts } from './Components/Products/EditProducts';

function App() {
  return (
    <Router>
      <Routes>
        {/* Login Page */}
        <Route path="/login" element= {<Login />} />
        <Route path="/logout" element= {<Logout />} />
        <Route path="/types" element= {<AdminPopup />} />
   


        <Route element= {<ProtectedRoute />}>
          <Route path="/" element= {<Layout />}>
            
            {/* Users */}
            <Route path="/users" element= {<Users />} />
            <Route path="/add-user" element= {<AddUsers />} />
            <Route path="/edit-user/:id" element= {<EditUser />} />

            {/* TypeMaster */}
            <Route path="/admin-dashboard" element= {<TypeMaster />} />
            <Route path="/add-type" element= {<AddTypeMaster />} />
            <Route path="/edit-type/:encrypted_id" element= {<EditTypeMaster />} />

            {/* Department */}
            <Route path="/department" element= {<Department />} />
            <Route path="/add-department" element= {<AddDepartment />} />
            <Route path="/edit-department/:id" element= {<EditDepartment />} />

            {/* Category */}
            <Route path="/category" element= {<Category/>} />
            <Route path="/add-category" element= {<AddCategory/>} />
            <Route path="/edit-category/:encrypted_id" element= {<EditCategory/>} />

            {/* Products */}
            <Route path="/products" element={ <Products /> } />
            <Route path= "/add-product" element={ < AddProducts />} />
            <Route path="/edit-product/:encrypted_id" element= {<EditProducts/>} />
          
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
