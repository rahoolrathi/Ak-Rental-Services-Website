import React from "react";
import { Link, useLocation } from 'react-router-dom';
import img from "../Assets/logo.png"

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="w-full z-20 h-25 bg-white">
      <div className="flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="https://geeksforgeeks.org/" className="flex items-center">
        <img src={img} className="mr-2 w-70 h-12 bg-transparent" alt="GFG Logo" />
          {/* <span className="self-center text-2xl font-semibold">AK CAR </span> */}
        </a>
        <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
          <ul className="flex flex-col p-4 md:p-0 font-medium md:flex-row md:space-x-8">
            <li>
            <Link to='/' className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0">
                Home
              </Link>
            </li>
            <li>
              <Link to='/rent' className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0">
                Rent a Car
              </Link>
            </li>
            <li>
              <Link to='/register' className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0">
                Register Car
              </Link>
            </li>
            <li>
              <Link to='/SignIn' className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0">
                Owner SignIn
              </Link>
            </li>
           
            <li>
              <Link to='/Aboutus' className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0">
                About us
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
