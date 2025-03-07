"use client";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  productData: [],
  userInfo: null,
};

export const shopperSlice = createSlice({
  name: "products",
  initialState: initialState,
  reducers: {
    addtocart: (state, action) => {
      const item = state.productData.find((item) => item._id === action.payload._id);

      if (item) {
        // If the item exists, increase its quantity
        item.quantity += 1;
      } else {
        // If the item doesn't exist, add it to the cart with quantity = 1
        state.productData.push({ ...action.payload, quantity: 1 });
      }
    },
    plusQuantity: (state, action) => {
      const item = state.productData.find((item) => item._id === action.payload._id);
      if (item) {
        item.quantity += 1;
      }
    },
    minusQuantity: (state, action) => {
      const item = state.productData.find((item) => item._id === action.payload._id);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }
    },
    deleteProduct: (state, action) => {
      state.productData = state.productData.filter((item) => item._id !== action.payload._id);
    },
    resetCart:(state) =>{
      state.productData =[]
    },
    adduser:(state,action)=>{
      state.userInfo = action.payload
    },
    removeUser:(state)=>{
      state.userInfo = null;
    }
  },
});

// Exporting actions
export const { addtocart, plusQuantity, minusQuantity, deleteProduct,resetCart,adduser,removeUser } = shopperSlice.actions;
export default shopperSlice.reducer;
