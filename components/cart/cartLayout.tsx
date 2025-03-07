'use client'
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { resetCart, plusQuantity, minusQuantity, deleteProduct } from '@/app/redux/shopperSlice';
import FormattedPrice from '../formattedPrice';
import { useRouter } from 'next/navigation';

const CartLayout = ({ productData }) => {

  const userInfo = useSelector((state)=> state.productData.userInfo)
  console.log(userInfo);
  const router = useRouter()
  
  //stripe 

  console.log('cartlayout -', productData);
  const dispatch = useDispatch();
  const [subTotal, setSubTotal] = useState(0);
  const [total, setTotal] = useState(0);
  const [savings, setSavings] = useState(0);

  // Calculate totals using reduce
  useEffect(() => {
    const newSubTotal = productData.reduce((acc, item) => acc + item.oldPrice * item.quantity, 0);
    const newTotal = productData.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const newSavings = newSubTotal - newTotal;

    setSubTotal(newSubTotal);
    setTotal(newTotal);
    setSavings(newSavings);
  }, [productData]); // Runs when productData changes

  return (
    <div className="max-w-6xl mx-auto p-4 grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Cart Items - 2/3 width */}
      <div className="md:col-span-2 bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Shopping Cart</h2>
        <h3>Cart: {productData.length}</h3>

        {productData.map((item) => (
          <div key={item._id} className="flex items-center justify-between border-b pb-4 mb-4">
            {/* Image Section */}
            <div className="w-32 h-32">
              <Image
                src={item.image}
                alt={item.title}
                width={128}
                height={128}
                className="object-cover rounded-md"
                priority
              />
            </div>

            {/* Product Details */}
            <div className="flex-1 px-4">
              <p className="font-semibold text-lg">{item.title}</p>
              <p className="text-gray-500 text-sm">{item.category}</p>
              <p className="text-green-600 font-bold text-xl">
                <FormattedPrice amount={item.price} />
              </p>
              <p className="text-gray-500 line-through">
                <FormattedPrice amount={item.oldPrice} />
              </p>
              <p className="text-sm text-green-500 font-semibold">
                You save ${(item.oldPrice - item.price).toFixed(2)}
              </p>
            </div>

            {/* Quantity Controls */}
            <div className="flex items-center space-x-4">
              <button
                className="px-3 py-1 border rounded cursor-pointer"
                onClick={() =>
                  dispatch(minusQuantity({ _id: item._id }))
                }
              >
                -
              </button>
              <span className="text-lg">{item.quantity}</span>

              <button
                className="px-3 py-1 border rounded cursor-pointer m-2"
                onClick={() => dispatch(plusQuantity({ _id: item._id }))}
              >
                +
              </button>
            </div>

            {/* Remove Button */}
            <button
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-950 hover:text-amber-50"
              onClick={() => dispatch(deleteProduct({ _id: item._id }))}
            >
              Remove
            </button>
          </div>
        ))}

        {/* Reset Cart Button */}
        <button
          className="mt-4 bg-red-600 text-white px-6 py-3 w-full rounded-lg cursor-pointer"
          onClick={() => dispatch(resetCart())}
        >
          Reset Cart
        </button>
      </div>

      {/* Checkout Summary - 1/3 width */}
      <div className="border p-4 rounded-md shadow-md bg-white h-fit">
  {userInfo? <button className="w-full bg-blue-500 text-white py-2 rounded" onClick={()=>router.push('/checkout')}>Continue to checkout</button>: <div><button className="w-full bg-blue-500 text-white py-2 rounded">Continue to checkout</button> <p className="text-red-500 text-sm mt-2">Please sign in for checkout</p>
  </div>}     
        <p className="text-gray-500 text-sm">
          For the best shopping experience, <a href="#" className="text-blue-500">sign in</a>
        </p>
        <div className="mt-4">
          <div className="flex justify-between">
            <span>Subtotal ({productData.length} items)</span>
            <span className="">${subTotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-green-600">
            <span>Savings</span>
            <span>- ${savings.toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-bold mt-2">
            <span>Total Amount</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-gray-500 mt-2">
            <span>Shipping</span>
            <span>Free</span>
          </div>
          <div className="flex justify-between text-gray-500 mt-1">
            <span>Taxes</span>
            <span>Calculated at checkout</span>
          </div>
          <div className="flex justify-between font-bold text-lg mt-4">
            <span>Estimated total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartLayout;
