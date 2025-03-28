import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axiosInstance from '../Protected/axios';

export const Products = () => {
  const [products,setProducts] =useState([]);
  const navigate=useNavigate();
  const category_id=sessionStorage.getItem("category_id");
  

  useEffect(()=>{
     getProducts();
  },[])

  const getProducts = async ()=>{
    try{
        const response=await axiosInstance.get(`/category/products/${category_id}`);
            
        if(Array.isArray(response.data.data)){
            setProducts(response.data.data);
            }else{
                console.log("Not a Array");
            }
    }catch(error){
        console.log("unexpected response formate");
    }
  }

  
  const deleteType=async (encrypted_id) => {
       try{
        const response = await axiosInstance.delete(`/product/${encrypted_id}`);
        if( response.status === 200 ){
          setProducts((products).filter((product)=>product.id !== encrypted_id ));
          getProducts();
          console.log("Product deleted successfully:", response.data);
        }
       }catch(error){
           console.error("deleted is issue in  ", error);
       }
    
  }
  
  
  
  
  
  
  
  
  return (
    <div className="table-container">
      <div className="table-header">
        <h2>Products</h2>
        <Link to="/add-product" className="btn green">Add New Product</Link> 
      </div>

      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Product Code</th>
            <th>Product Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>HSN Code</th>
            <th>Cgst</th>
            <th>Sgst</th>
            <th>Igst</th>
            <th>Total</th>
             <th>Action</th>

          </tr>
        </thead>
        <tbody>
          {products.map((product,index) => (
            <tr key={product.id}>
              <td>{index + 1}</td>
              <td>{product.product_code}</td>
              <td>{product.product_name}</td>
              <td className='descrp' data-fulltext={product.product_description}>{product.product_description}</td>
              <td>{product.product_price}</td>
              <td>{product.hsn_code}</td>
              <td>{product.cgst}%</td>
              <td>{product.sgst}%</td>
              <td>{product.igst}%</td>
              <td>{product.total}.00</td>
              <td className="btn-container">
               
               
                <button
                    className="btn green"
                    onClick={() => navigate(`/edit-product/${product.encrypted_id}`)} 
                    >
                    Edit
                  </button>
                  
                  <button 
                  className="btn red"
                  onClick={() => {

                    if (window.confirm("Are you sure you want to delete this type?")) {
                      deleteType(product.encrypted_id);
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
