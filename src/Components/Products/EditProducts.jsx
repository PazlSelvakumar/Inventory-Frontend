import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import axiosInstance from '../Protected/axios';

export const EditProducts = () => {
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
  const { encrypted_id }=useParams();
  // console.log(encrypted_id);
  
  
  
  useEffect(()=>{
    getProducts();
  },[])
  
  
  const getProducts = async ()=>{
    try{
        const response=await axiosInstance.get(`/product/${encrypted_id}/edit`);
        if(response.status===200){
          setProducts(response.data.products)
          console.log(response.data.products);
        }else{
          console.log("not response");
        }
        
    }catch(error){
      setError(error);
    }finally{

    }


  }
  
  
  
  
  return (
    <div className="form-container">
      <h2>Add Products</h2>
      {error && <div className="error-message">{error}</div>}
      <form >
      {/* onSubmit={handleSubmit} */}
        {/* <div className="form-group">
            <label htmlFor="category">Categories</label>
            <select name="category" id="category" value={categoryId} onChange={(e)=>setCategoryId(e.target.value)}>
              <option value="">Select</option>
              {categories.map((cataegory)=>(
                <option key={cataegory.id} value={cataegory.id}>{cataegory.category_name}</option>
              ))}
            </select>
        </div> */}
        
        <div className="form-group">
          <label htmlFor="product_code">Product Code</label>
          <input type="text" id="product_code" value={products.product_code} placeholder="Enter Product Code"
            onChange={(e) => setProductCode(e.target.value)} />
        </div>

        <div className="form-group">
          <label htmlFor="product_name">Product Name</label>
          <input type="text" id="product_name" value={products.product_name} placeholder="Enter Product name"
            onChange={(e) => setProductName(e.target.value)} />
        </div>

        <div className="form-group">
          <label htmlFor="product_desc">Product Description</label>
          <input type="text" id="product_desc" value={products.product_description} placeholder="Enter Product Desc"
            onChange={(e) => setProductDesc(e.target.value)} />
        </div>
        
        <div className="form-group">
          <label htmlFor="product_prs">Product Price</label>
          <input type="text" id="product_prs" value={products.product_price} placeholder="Enter Product Price"
            onChange={(e) => setProductPrs(e.target.value)} />
        </div>

        <div className="form-group">
          <label htmlFor="product_hsn">HSN code</label>
          <input type="text" id="product_hsn" value={products.hsn_code} placeholder="Enter Product HSN code"
            onChange={(e) => setProductHsn(e.target.value)} />
        </div>

        <div className="form-group">
          <label htmlFor="product_cgst">CGST</label>
          <input type="text" id="product_cgst" value={products.cgst} placeholder="Enter CGST"
            onChange={(e) => setProductCgst(e.target.value)} />
        </div>

        <div className="form-group">
          <label htmlFor="product_sgst">SGST</label>
          <input type="text" id="product_sgst" value={products.sgst} placeholder="Enter SGST"
            onChange={(e) => setProductSgst(e.target.value)} />
        </div>

        <div className="form-group">
          <label htmlFor="product_igst">IGST</label>
          <input type="text" id="product_igst" value={products.igst} placeholder="Enter IGST"
            onChange={(e) => setProductIgst(e.target.value)} />
        </div>

        <div className="form-group">
          <label htmlFor="product_ttl">Total</label>
          <input type="text" id="product_ttl" value={products.total} placeholder="Enter Total"
            onChange={(e) => setProductTtl(e.target.value)} />
        </div>

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
}
