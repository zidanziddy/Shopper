import React from "react";
import Products from "./products";


const ProductPost = async () => {
  // SSR Fetching data
  const response = await fetch("http://localhost:3000/api/productData");
  const productData = await response.json();
  console.log(productData);

  const products = Array.isArray(productData.productData) ? productData.productData : [];

  
  return (
    <>
    <Products products ={products}></Products>
   
    </>
  );
};

export default ProductPost;
