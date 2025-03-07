'use client'
import React from 'react';
import Image from "next/image";
import "./product.css";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { addtocart } from '@/app/redux/shopperSlice';
import { toast, Toaster } from 'react-hot-toast';

const Products = ({ products }) => {
  const dispatch = useDispatch();
  return (
    <div className="p-5">
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((value, index) => (
          <div key={value.id || index} className="w-full min-h-[500px] rounded-2xl shadow-lg flex flex-col bg-white">
            {/* Image Section */}
            <div className="h-60 w-full p-3">
              <Image
                src={value.image}
                alt={value.title}
                width={300}
                height={300}
                className="rounded-t-2xl object-cover w-full h-full transition-transform duration-300 ease-in-out transform hover:scale-105"
              />
            </div>
            {/* Buttons & Rating */}
            <div className="p-4 flex justify-between items-center">
              <button className="buttonAdd" onClick={() => {
                dispatch(addtocart({
                  _id: value._id,
                  title: value.title,
                  discription: value.discription,
                  image: value.image,
                  price: value.price,
                  oldPrice: value.oldPrice,
                  quantity: 1,
                  brand: value.brand,
                  category: value.category
                }));
                toast.success(`${value.title.substring(0, 20)} added successfully`);
              }}>Add</button>
              <Link href={{ pathname: `product/${value._id}` }}>
                <button className="buttonDetails">Details</button>
              </Link>
            </div>
            {/* Product Info */}
            <div className="p-4 flex flex-col">
              <h3 className="text-lg font-bold">{value.title.substring(0, 25)}</h3>
              <p className="text-sm text-gray-600">{value.description.substring(0, 60)}...</p>
              <div className="flex justify-start items-center space-x-2">
                <p className="text-xl font-semibold text-red-500">Now <span>${value.price}</span></p>
                <p className="line-through text-gray-500">${value.oldPrice}</p>
              </div>
            </div>
            <div className="p-4 text-center text-yellow-500 font-bold">
              ⭐ Rating: {value.rating}
            </div>
          </div>
        ))}
      </div>
      <Toaster 
        reverseOrder={false}
        position='top-center'
        toastOptions={{
          style: {
            borderRadius: '8px',
            background: '#333',
            color: '#fff'
          }
        }}
      />
    </div>
  );
};

export default Products;