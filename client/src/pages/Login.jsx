import axios from 'axios';
import React, { useState } from 'react';
import { setUserData } from "../Redux/slices/userSlice";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
// import { ToastContainer, toast } from 'react-toastify';
// import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');

  const loginUser = async (e) => {
    e.preventDefault();

    try {
      const user = {
        userEmail,
        userPassword,
      };

      const result = await axios.post("http://localhost:3000/auth/login", user);

      if (result.data.status === "Error") {
        // Commented out toast notification
        // toast.error(result.data.message || "Wrong credentials");
        alert(result.data.message || "Wrong credentials");
      } else {
        console.log("User Logged in Successfully: ", result);
        dispatch(setUserData(result.data.user)); // Ensure `result.data.user` contains userId
        localStorage.setItem('token', result.data.token); // Store the token if needed
        navigate("/");
      }
    } catch (error) {
      console.log("Cannot Login the User: ", error);
      // Commented out toast notification
      // toast.error("An error occurred. Please try again.");
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="h-screen flex w-full items-center justify-center p-5">
      <form className="w-full max-w-md bg-white p-6 rounded-lg shadow-md" onSubmit={loginUser}>
        <h1 className="text-2xl font-bold mb-4">Login</h1>
        <div className="space-y-4">
          <div>
            <label className="font-bold" htmlFor="userEmail">Email</label>
            <input
              type="email"
              id="userEmail"
              name="userEmail"
              className="w-full rounded-lg border border-gray-400 p-2 focus:ring focus:ring-blue-500"
              placeholder="your.email@example.com"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="font-bold" htmlFor="userPassword">Password</label>
            <input
              type="password"
              id="userPassword"
              name="userPassword"
              className="w-full rounded-lg border border-gray-400 p-2 focus:ring focus:ring-blue-500"
              placeholder="*********"
              value={userPassword}
              onChange={(e) => setUserPassword(e.target.value)}
            />
          </div>
        </div>
        <button className="mt-4 w-full bg-blue-500 text-white rounded-lg py-2 hover:bg-blue-600">
          Login
        </button>
        <div className="flex items-center justify-between mt-4 text-sm">
          <p>New to FindMyNotes?</p>
          <Link to="/signup">
            <p className="font-bold text-blue-500 hover:underline">Create an account</p>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
