import { IoIosArrowDown } from "react-icons/io";
import { BsHouse } from "react-icons/bs";
import { IoLocationOutline } from "react-icons/io5";
import Link from "next/link"; // Import Next.js Link
import "./navbarBottom.css";

const NavbarBottom = () => {
  return (
    <div className="w-full h-10 bg-blue-400 border-t-2 border-amber-50 sticky top-16 z-[40]">
      <div className="h-full w-full flex items-center justify-between px-4">

        {/* ✅ Left Section */}
        <div className="  flex items-center gap-2">
          <p className="hidden lg:block text-white">
            How do you want your items delivered?
          </p>
          <span className="mx-2 text-white">|</span>
        </div>

        {/* ✅ Middle Section */}
        <div className="flex items-center gap-2 text-amber-50 sm:text-left">
          <IoLocationOutline className="text-lg" />
          <p>Canada</p>
          <BsHouse className="text-lg" />
          <p>40 Joanna Dr</p>
        </div>

        {/* ✅ Right Section (Next.js Links) */}
        <div className="flex items-center gap-4">
          <Link href="/" className="hover:text-amber-300 transition duration-200 appearence">Home</Link>
          <Link href="/about" className="hover:text-amber-300 transition duration-200 appearence">About</Link>
          <Link href="/contact" className="hover:text-amber-300 transition duration-200 appearence">Contact</Link>
          <Link href="/blog" className="hover:text-amber-300 transition duration-200 appearence">Blog</Link>
          <Link href="/services" className="hover:text-amber-300 transition duration-200 appearence">Services</Link>
        </div>

      </div>
    </div>
  );
};

export default NavbarBottom;
