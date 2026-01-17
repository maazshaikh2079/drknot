import React, { useState } from "react";
import { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import {
  cross_icon,
  dropdown_icon,
  logo,
  menu_icon,
  profile_pic,
} from "../assets/assets.js";
import { AppContext } from "../context/AppContext.jsx";

const Navbar = () => {
  const navigate = useNavigate();

  const [showMenu, setShowMenu] = useState(false);
  const { token, setToken, userData } = useContext(AppContext);

  const logout = () => {
    localStorage.removeItem("token");
    setToken(false);
    navigate("/auth/Sign-In");
    // navigate("/");
  };

  return (
    <div className="flex items-center justify-between text-sm py-4 mb-5 border-b border-b-zinc-400">
      <img
        onClick={() => navigate("/")}
        className="w-44 cursor-pointer"
        src={logo}
        alt=""
      />
      <ul className="hidden md:flex items-start gap-5 font-medium">
        <NavLink to="/">
          <li className="py-1">HOME</li>
          <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
        </NavLink>
        <NavLink to="/doctors">
          <li className="py-1">ALL DOCTORS</li>
          <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
        </NavLink>
        <NavLink to="/about">
          <li className="py-1">ABOUT</li>
          <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
        </NavLink>
        <NavLink to="/contact">
          <li className="py-1">CONTACT</li>
          <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
        </NavLink>
      </ul>

      <div className=" flex items-center gap-4 ">
        {token && userData ? (
          // PFP and Popup Menu (if logged in)
          <div className=" flex items-center gap-2 cursor-pointer group relative">
            {/* PFP */}
            {/* <img className="w-8.5 h-8.5 rounded-full object-cover bg-gray-100" src={profile_pic} alt="" /> */}
            <img
              className="w-8.5 h-8.5 rounded-full object-cover bg-gray-100"
              src={userData.image}
              alt=""
            />
            <img className="w-2.5" src={dropdown_icon} alt="" />
            {/* Popup Menu */}
            <div className=" absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block">
              <div className="min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4 group-hover:block">
                <p
                  onClick={() => navigate("/my-profile")}
                  className="hover:text-black cursor-pointer "
                >
                  My Profile
                </p>
                <p
                  onClick={() => navigate("/my-appointments")}
                  className="hover:text-black cursor-pointer "
                >
                  My Appointments
                </p>
                <p onClick={logout} className="hover:text-black cursor-pointer">
                  Logout
                </p>
              </div>
            </div>
          </div>
        ) : (
          // "Create Account" button (if not logged-in)
          <button
            onClick={() => navigate("/auth/Sign-In")}
            className="hidden md:block bg-primary text-white px-8 py-3 rounded-full font-light "
          >
            SIGN-IN
          </button>
        )}

        <img
          src={menu_icon}
          alt="menu_icon"
          onClick={() => setShowMenu(true)}
          className="w-6 md:hidden"
        />

        {/* ---- Mobile Menu (open) ---- */}
        <div
          className={`${showMenu ? "fixed w-full" : "h-0 w-0"} md:hidden right-0 top-0 bottom-0 z-20 overflow-hidden bg-white transition-all`}
        >
          <div className="flex items-center justify-between px-5 py-6">
            <img src={logo} className="w-36" alt="" />
            <img
              onClick={() => setShowMenu(false)}
              src={cross_icon}
              className="w-7"
              alt=""
            />
          </div>
          <ul className="flex flex-col items-center gap-2 mt-5 px-5 text-lg font-medium">
            {!token && (
              <NavLink
                onClick={() => {
                  setShowMenu(false);
                }}
                to="/login/Sign-In"
              >
                <p className="px-4 py-2 rounded inline-block">SIGN-IN</p>
              </NavLink>
            )}
            <NavLink onClick={() => setShowMenu(false)} to="/">
              <p className="px-4 py-2 rounded inline-block">HOME</p>
            </NavLink>
            <NavLink onClick={() => setShowMenu(false)} to="/doctors">
              <p className="px-4 py-2 rounded inline-block">ALL DOCTORS</p>
            </NavLink>
            <NavLink onClick={() => setShowMenu(false)} to="/about">
              <p className="px-4 py-2 rounded inline-block">ABOUT</p>
            </NavLink>
            <NavLink onClick={() => setShowMenu(false)} to="/contact">
              <p className="px-4 py-2 rounded inline-block">CONTACT</p>
            </NavLink>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
