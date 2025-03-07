"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { AiFillAppstore, AiFillSlackSquare } from "react-icons/ai";
import { FaSearch, FaRegHeart, FaUserAlt, FaBars, FaTimes } from "react-icons/fa";
import { CgShoppingCart } from "react-icons/cg";
import NavbarBottom from "./navbarBottom";
import { useDispatch, useSelector } from "react-redux";
import { useSession, signIn, signOut } from "next-auth/react";
import { adduser, removeUser } from "@/app/redux/shopperSlice";

// ✅ Correct Image Import
import logo from "@/public/assets /images/logo.png";

const Navbar = () => {
  const { data: session } = useSession();
  const dispatch = useDispatch();

  const productData = useSelector((state) => state.productData.productData);
  const userInfo = useSelector((state) => state.productData.userInfo);
  
  const [totalAmount, setTotalAmount] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (session?.user) {
      dispatch(adduser(session.user));
    } else {
      dispatch(removeUser());
    }
  }, [session?.user, dispatch]);

  useEffect(() => {
    let price = 0;
    productData.forEach((item) => {
      price += item.price * item.quantity;
    });
    setTotalAmount(price.toFixed(2));
  }, [productData]);

  return (
    <>
      {/* ✅ Navbar */}
      <div className="w-full bg-blue-400 text-white sticky top-0 z-50">
        <div className="h-full flex items-center justify-between px-5 md:px-10 lg:px-20 py-3">
          
          {/* ✅ Logo */}
          <Link href="/">
            <div className="navbarHover">
              <Image src={logo} alt="logo" width={150} height={50} priority />
            </div>
          </Link>

          {/* ✅ Desktop Menu */}
          <div className="hidden lg:flex items-center gap-6">
            <Link href="#" className="navbarHover flex items-center gap-2">
              <AiFillAppstore />
              Departments
            </Link>
            <Link href="#" className="navbarHover flex items-center gap-2">
              <AiFillSlackSquare />
              Services
            </Link>
          </div>

          {/* ✅ Search Box (Hidden on Small Screens) */}
          <div className="relative hidden sm:flex">
            <input
              type="text"
              className="bg-amber-50 w-44 md:w-60 lg:w-96 rounded-lg p-2 text-gray-600"
              placeholder="Search everything at shoppers online"
            />
            <span className="absolute bg-amber-400 w-8 h-8 rounded-full flex items-center justify-center top-1 right-1">
              <FaSearch />
            </span>
          </div>

          {/* ✅ User Account */}
          {userInfo ? (
            <div
              className="p-2 flex items-center gap-2 cursor-pointer text-sm hidden lg:flex"
              onClick={() => signOut()}
            >
              <FaRegHeart />
              <Image src={userInfo.image} alt="User" width={40} height={40} className="rounded-full" />
              <p>
                {userInfo?.name} <br />
                <span className="font-bold">Sign Out</span>
              </p>
            </div>
          ) : (
            <div
              className="p-2 flex items-center gap-2 cursor-pointer text-sm hidden lg:flex"
              onClick={() => signIn()}
            >
              <FaUserAlt />
              <p>
                Sign In <br />
                <span className="font-bold">Account</span>
              </p>
            </div>
          )}

          {/* ✅ Cart */}
          <Link href="/cart">
            <div className="flex items-center gap-2 cursor-pointer text-lg p-1">
              <CgShoppingCart className="text-3xl" />
              <p>Amount: ${totalAmount}</p>
              <p className="hidden md:block">
                Items: {productData.length > 0 ? productData.length : 0}
              </p>
            </div>
          </Link>

          {/* ✅ Mobile Menu Button */}
          <button className="lg:hidden text-2xl" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* ✅ Mobile Menu */}
        <div
          className={`lg:hidden bg-blue-500 text-white fixed top-0 left-0 w-3/4 h-full p-5 transition-transform duration-300 z-[60] ${
            isMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <button className="absolute top-4 right-4 text-2xl" onClick={() => setIsMenuOpen(false)}>
            <FaTimes />
          </button>

          <nav className="flex flex-col gap-6 mt-10 text-lg">
            <Link href="/" className="block" onClick={() => setIsMenuOpen(false)}>
              Home
            </Link>
            <Link href="#" className="block" onClick={() => setIsMenuOpen(false)}>
              Departments
            </Link>
            <Link href="#" className="block" onClick={() => setIsMenuOpen(false)}>
              Services
            </Link>
            <Link href="/cart" className="block" onClick={() => setIsMenuOpen(false)}>
              Cart (${totalAmount})
            </Link>

            {/* Sign In / Sign Out */}
            {userInfo ? (
              <div className="block cursor-pointer" onClick={() => { signOut(); setIsMenuOpen(false); }}>
                Sign Out
              </div>
            ) : (
              <div className="block cursor-pointer" onClick={() => { signIn(); setIsMenuOpen(false); }}>
                Sign In
              </div>
            )}
          </nav>
        </div>
      </div>

      {/* ✅ Second Navbar */}
      <NavbarBottom />
    </>
  );
};

export default Navbar;
