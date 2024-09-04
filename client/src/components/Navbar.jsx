import React from 'react';
import { Link } from 'react-router-dom';
import { IoSearch } from "react-icons/io5";
import { MdOutlineUploadFile } from "react-icons/md";
import { GiHamburgerMenu } from "react-icons/gi";
import { useDispatch, useSelector } from "react-redux";
import { removeUserData, setUserData } from "../Redux/slices/userSlice";
import { useNavigate } from 'react-router-dom';


const Navbar = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const user = useSelector((state) => state.user.userData);

  const handleLogout = () => {
    dispatch(removeUserData());
    navigate("/");
  }

  return (
    <header className="flex h-[80px] items-center justify-center shadow-xl">
      <div className="mx-5 flex w-full max-w-[1550px] items-center justify-between">
        {/* image sections */}
        <div className="flex h-[70px] w-[90px] items-center justify-center overflow-hidden">
          <img src="/logo.avif" alt="logo" />
        </div>
        {/* nav links */}
        <GiHamburgerMenu text-xl md:hidden />
        {/* <div className="flex gap-4">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/login">Login</Link>
          <Link to="/signup">Signup</Link>
        </div> */}
        {/* <ul className='flex justify-center items-center gap-4'>
          <li className="font-semibold">
          <Link to="/">Home</Link>
          </li>
          <li className="font-semibold">
          <Link to="/about">About</Link>
          </li>
          <li className="rounded-xl bg-blue-500 px-5 py-2 font-semibold">
          <Link to="/login">Login</Link>
          </li>
          <li className="rounded-xl bg-blue-500 px-5 py-2 font-semibold">
          <Link to="/signup">Signup</Link>
          </li>
        </ul> */}
        <div className="hidden md:flex md:gap-4 md:items-center md:justify-center">

          <Link to="/">Home</Link>
          <Link to="/about">About</Link>

          {isAuthenticated ? (
            <>
              <Link to="/search">
                <IoSearch className="text-xl" />
              </Link>
              <Link to="/upload">
                <MdOutlineUploadFile className="text-[24px]" />
              </Link>
              <Link to="/profile">
                <button className="rounded-xl bg-blue-500 px-5 py-2 font-semibold hover:bg-blue-700">
                  Profile
                </button>
              </Link>
              <button className="rounded-xl bg-blue-500 px-5 py-2 font-semibold hover:bg-blue-700">
                Logout
              </button>
            </>
          ) :
            <>
              <Link to="/login">
                <button className="rounded-xl bg-blue-500 px-5 py-2 font-semibold hover:bg-blue-600">
                  Login
                </button>
              </Link>
              <Link to="/signup">
                <button className="rounded-xl bg-blue-500 px-5 py-2 font-semibold hover:bg-blue-600">
                  Signup
                </button>
              </Link>
            </>
          }


        </div>
      </div>
    </header>
  )
}

export default Navbar