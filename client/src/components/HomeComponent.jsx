import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const HomeComponent = () => {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  return (
    <div className="bg-bgImage relative flex h-full items-center justify-center bg-center bg-cover">
      <div className="z-[1] absolute bg-black inset-0 bg-opacity-65" />
      <div className="relative z-[10] w-full max-w-[860px] border text-center text-white">
        <h1 className="text-4xl font-black">NOTE-NEST</h1>
        <p className="text-sm mt-5 font-light md:text-xl md:font-normal">
          Welcome To Notes-nest!!!
          Lorem ipsum dolor sit amet consectetur.
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Velit aspernatur ipsa, porro in saepe iste praesentium molestiae!
          Inventore et, laboriosam maxime nostrum quas soluta consectetur esse harum!
        </p>
        <div className="flex gap-5 items-center justify-center mt-5">
          {isAuthenticated ? (
            <>
              <Link to="/search" className="rounded-xl bg-white px-6 py-3 text-lg font-bold text-blue-500 hover:bg-gray-100">
                Get Started
              </Link>
            </>
          ) : (
            <>
              <Link to="/login">
                <button className="rounded-xl bg-white text-black px-5 py-2 font-bold hover:text-blue-500">
                  Login
                </button>
              </Link>
              <Link to="/signup">
                <button className="rounded-xl bg-white text-black px-5 py-2 font-bold hover:text-blue-500">
                  Signup
                </button>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomeComponent;
