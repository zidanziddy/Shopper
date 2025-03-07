"use client";

import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { ship1Img, ship2Img, ship3Img } from "@/public/assets /images";
import { useDispatch } from "react-redux";
import { addtocart } from "@/app/redux/shopperSlice";
import { toast, Toaster } from "react-hot-toast";

const ProductDetails = () => {
  const dispatch = useDispatch();
  const { _id } = useParams();
  console.log("Product ID from URL:", _id);

  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const fetchProducts = async () => {
    try {
      console.log("Fetching product data...");
      const response = await fetch("http://localhost:3000/api/productData");
      if (!response.ok) {
        throw new Error("Failed to fetch product data");
      }
      const data = await response.json();
      console.log("Fetched Product Data:", data);
      setProducts(data.productData || []);
    } catch (error) {
      console.error("Error fetching product data:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    if (products.length > 0) {
      console.log("Available Products:", products);
      console.log("Searching for ID:", _id);

      const result = products.find((x) => x._id === Number(_id));

      if (result) {
        console.log("Matched Product:", result);
        setSelectedProduct(result);
      } else {
        console.log("No matching product found.");
      }
    }
  }, [products, _id]);

  const handleAddToCart = () => {
    if (!selectedProduct) {
      toast.error("Product not found!");
      return;
    }

    dispatch(
      addtocart({
        _id: Number(_id),
        title: selectedProduct.title,
        description: selectedProduct.description,
        image: selectedProduct.image,
        price: selectedProduct.price,
        oldPrice: selectedProduct.oldPrice,
        quantity: 1,
        brand: selectedProduct.brand,
        category: selectedProduct.category,
      })
    );

    toast.success(`${selectedProduct.title.substring(0, 20)} added successfully`);
  };

  return (
    <div className="flex justify-center w-full h-screen">
      <div className="container bg-gray-100 w-full h-full flex gap-10 p-10">
        {/* Left Section - Image */}
        <div className="w-1/2 h-full bg-white flex items-center justify-center shadow-lg p-5 rounded-2xl shadow-2xl">
          {selectedProduct ? (
            <Image
              src={selectedProduct.image || "/placeholder.jpg"}
              alt={"Product Image"}
              width={400}
              height={400}
              className="rounded-lg"
            />
          ) : (
            <p>Loading Image...</p>
          )}
        </div>

        {/* Right Section - Product Details */}
        <div className="w-1/2 h-full bg-white shadow-lg p-1 flex flex-col justify-between rounded-2xl shadow-2xl">
          <div className="w-full h-full p-[40] gap-10">
            <h2 className="text-2xl font-bold text-gray-800 ">
              {selectedProduct?.title || "No Title"}
            </h2>
            <p className="text-gray-600 mt-1">
              {selectedProduct?.description || "No Description Available"}
            </p>

            {/* Price Section */}
            <div className="mt-4">
              <span className="text-xl font-semibold text-green-600">
                ${selectedProduct?.price || "N/A"}
              </span>
              <span className="line-through">
                ${selectedProduct?.oldPrice || "N/A"}
              </span>
            </div>

            {/* Ratings */}
            <div className="mt-2 flex items-center">
              <span className="text-yellow-500 text-xl">⭐️⭐️⭐️⭐️⭐️</span>
              <span className="text-gray-600 ml-2">(25 Reviews)</span>
            </div>
            <p>How do you want your Item?</p>

            {/* Shipping & Delivery */}
            <div className="mt-4 w-full h-full flex-col justify-around">
              <div className="border-2 p-5 rounded-3xl m-1 flex justify-between">
                <div>
                  <Image src={ship1Img} alt="" />
                </div>
                <p className="text-sm text-gray-700">
                  Shipping: <span className="font-semibold">Tomorrow, Free</span>
                </p>
              </div>
              <div className="border-2 p-5 rounded-3xl m-1 flex justify-between">
                <div>
                  <Image src={ship2Img} alt="" />
                </div>
                <p className="text-sm text-gray-700">
                  Pickup: <span className="font-semibold">Tomorrow, Free</span>
                </p>
              </div>
              <div className="border-2 p-5 rounded-3xl m-1 flex justify-between">
                <div>
                  <Image src={ship3Img} alt="" />
                </div>
                <p className="text-sm text-gray-700">
                  Delivery: <span className="font-semibold">Tomorrow</span>
                </p>
              </div>
              <div>
                {/* Add to Cart Button */}
                <button
                  className="bg-blue-600 text-white text-lg font-semibold py-3 rounded-lg hover:bg-blue-700 transition mt-1 p-5"
                  onClick={handleAddToCart}
                >
                  Add to Cart
                </button>
              </div>
            </div>
            <Toaster
              reverseOrder={false}
              position="top-center"
              toastOptions={{
                style: {
                  borderRadius: "8px",
                  background: "#333",
                  color: "#fff",
                },
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
