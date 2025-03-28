import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import Login from '../Authendication/login';
import axiosInstance from '../Protected/axios';

export const AddProducts = () => {
            const [categories,setCategories]=useState([]);
            const [categoryId,setCategoryId]=useState("");
            const [product_code,setProductCode]=useState("");
            const [product_name,setProductName]=useState("");
            const [product_desc,setProductDesc]=useState("");
            const [product_prs,setProductPrs]=useState("");
            const [product_hsn,setProductHsn]=useState("");
            const [product_cgst,setProductCgst]=useState("");
            const [product_sgst,setProductSgst]=useState("");
            const [product_igst,setProductIgst]=useState("");
            const [product_ttl,setProductTtl]=useState("");
            const [products,setProducts]=useState([]);
            const navigate = useNavigate();
            const [error,setError]=useState("");
            const [isSubmitting,setIsSubmitting]=useState(false);
            // const category_id=sessionStorage.getItem("category_id");  
            const dept_id=sessionStorage.getItem("dept_id");

       
            useEffect(()=>{
              getCategories();
            },[]);

            const getCategories=async ()=>{
              try{
                const response = await axiosInstance.get(`/department/categories/${dept_id}`);
                if(response.status === 200){
                  if(Array.isArray(response.data.data)){
                    setCategories(response.data.data);
                    console.log(response.data.data);
                  }else{
                    console.log("Not Array");
                    
                  }
                }
                
              }catch(error){
                setError(error);
              }
            }

            const handleSubmit= async (e)=>{
              e.preventDefault();
                  if(!product_code.trim()){
                    setError("Product code is required");
                    return;
                  }else  if(!product_name.trim()){
                    setError("Product name is required");
                    return;
                  }else  if(!product_desc.trim()){
                    setError("Product Description is required");
                    return;
                  }else  if(!product_prs.trim()){
                    setError("Product Price is required");
                    return;
                  }else  if(!product_hsn.trim()){
                    setError("HSN code is required");
                    return;
                  }else  if(!product_cgst.trim()){
                    setError("CGST is required");
                    return;
                  }else  if(!product_sgst.trim()){
                    setError("SGST is required");
                    return;
                  }else  if(!product_igst.trim()){
                    setError("IGST is required");
                    return;
                  }else  if(!product_ttl.trim()){
                    setError("Total is required");
                    return;
                  }
                  setIsSubmitting(true);
                  setError("");

                  try{
                  const response = await axiosInstance.post(`/product/store`,{
                    category_id :categoryId,
                    product_name :product_name,
                    product_price :product_prs,
                    product_description :product_desc,
                    product_code :product_code,
                    hsn_code :product_hsn,
                    cgst :product_cgst,
                    sgst :product_sgst,
                    igst :product_igst,
                    total :product_ttl
                  }); 


                  if(response.status === 201){
                    console.log("product created successfully:", response.data);
                    navigate("/products");
                  } else {
                    setError("Failed to create products. Please try again later.");
                  }
                }catch(error){
                  console.error("Error creating products:", error);
                  setError("Failed to create products. Please try again later.");
                } finally {
                  setIsSubmitting(false);
                }
                  
            }
        
  
  
  
  
            return (
              <div className="form-container">
                <h2>Add Products</h2>
                {error && <div className="error-message">{error}</div>}
                <form onSubmit={handleSubmit}>

                  <div className="form-group">
                      <label htmlFor="category">Categories</label>
                      <select name="category" id="category" value={categoryId} onChange={(e)=>setCategoryId(e.target.value)}>
                        <option value="">Select</option>
                        {categories.map((cataegory)=>(
                          <option key={cataegory.id} value={cataegory.id}>{cataegory.category_name}</option>
                        ))}
                      </select>
                  </div>
                  
                  
                  <div className="form-group">
                    <label htmlFor="product_code">Product Code</label>
                    <input type="text" id="product_code" value={product_code} placeholder="Enter Product Code"
                      onChange={(e) => setProductCode(e.target.value)} />
                  </div>

                  <div className="form-group">
                    <label htmlFor="product_name">Product Name</label>
                    <input type="text" id="product_name" value={product_name} placeholder="Enter Product name"
                      onChange={(e) => setProductName(e.target.value)} />
                  </div>

                  <div className="form-group">
                    <label htmlFor="product_desc">Product Description</label>
                    <input type="text" id="product_desc" value={product_desc} placeholder="Enter Product Desc"
                      onChange={(e) => setProductDesc(e.target.value)} />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="product_prs">Product Price</label>
                    <input type="text" id="product_prs" value={product_prs} placeholder="Enter Product Price"
                      onChange={(e) => setProductPrs(e.target.value)} />
                  </div>

                  <div className="form-group">
                    <label htmlFor="product_hsn">HSN code</label>
                    <input type="text" id="product_hsn" value={product_hsn} placeholder="Enter Product HSN code"
                      onChange={(e) => setProductHsn(e.target.value)} />
                  </div>

                  <div className="form-group">
                    <label htmlFor="product_cgst">CGST</label>
                    <input type="text" id="product_cgst" value={product_cgst} placeholder="Enter CGST"
                      onChange={(e) => setProductCgst(e.target.value)} />
                  </div>

                  <div className="form-group">
                    <label htmlFor="product_sgst">SGST</label>
                    <input type="text" id="product_sgst" value={product_sgst} placeholder="Enter SGST"
                      onChange={(e) => setProductSgst(e.target.value)} />
                  </div>

                  <div className="form-group">
                    <label htmlFor="product_igst">IGST</label>
                    <input type="text" id="product_igst" value={product_igst} placeholder="Enter IGST"
                      onChange={(e) => setProductIgst(e.target.value)} />
                  </div>

                  <div className="form-group">
                    <label htmlFor="product_ttl">Total</label>
                    <input type="text" id="product_ttl" value={product_ttl} placeholder="Enter Total"
                      onChange={(e) => setProductTtl(e.target.value)} />
                  </div>

                  <button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Submitting..." : "Submit"}
                  </button>
                </form>
              </div>
            );
}
