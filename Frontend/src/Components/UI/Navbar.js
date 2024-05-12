import React from "react";
import { Link, useLocation } from 'react-router-dom';
import img from "../Assets/logo.png"
import './navbar.css'

const Navbar = () => {
  const location = useLocation();

  return (
    <nav>
      <div className="logo">
        {/* <Link to='/' className="logo">
        <img src={img} className="mr-2 w-70 h-12 bg-transparent" alt="GFG Logo" />
          {/* <span className="self-center text-2xl font-semibold">AK CAR </span> */}
        {/* </Link> */} 
        <div id="navbar-sticky" class="items-center justify-between hidden w-full md:flex md:w-auto md:order-1">
          <ul className="flex flex-col p-4 md:p-0 font-medium md:flex-row md:space-x-8">
            <li>
            <Link to='/'className="Link">
                Home
              </Link>
            </li>
            <li>
              <Link to='/rent'className="Link">
                Rent a Car
              </Link>
            </li>
            <li>
              <Link to='/register'className="Link">
                Register Car
              </Link>
            </li>
            <li>
              <Link to='/SignIn'className="Link">
                Owner SignIn
              </Link>
            </li>
           
            <li>
              <Link to='/Aboutus'className="Link">
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
