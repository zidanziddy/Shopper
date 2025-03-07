'use client'
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import CartLayout from "./cartLayout";

const CartComponent = () => {

  const productData = useSelector((item)=> item.productData.productData)
  console.log('cart----',productData);

  
  

  return (
   productData.length >0 ?   <CartLayout  productData = {productData}/> : " No Data Available"
 
  );
};

export default CartComponent;