import React from "react";
import { logo } from "../assets/assets.js";

const Footer = () => {
  return (
    <div className="md:mx-10">
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
        <div>
          <img src={logo} alt="logo" className="w-40 mb-5" />
          <p className="w-full md:w-2/3 text-gray-600 leading-6">
            DrKnot is dedicated to revolutionizing the way you access
            healthcare. By combining cutting-edge technology with a user-centric
            approach, we simplify doctor booking and empower you to manage your
            health journey with ease.
          </p>
        </div>

        <div>
          <p className="text-xl font-medium mb-5">COMPANY</p>
          <ul className="flex flex-col gap-2 text-gray-600">
            <li>Home</li>
            <li>About Us</li>
            <li>Delivery</li>
            <li>Privacy Policy</li>
          </ul>
        </div>

        <div>
          <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
          <ul className="flex flex-col gap-2 text-gray-600">
            <li>+91-72086-13298</li>
            <li>maazshaikh2079@gmail.com</li>
          </ul>
        </div>
      </div>

      <div>
        <hr className="border-none" />
        <p className="py-5 text-sm text-center border-t border-t-zinc-400">
          Copyright 2026 @ DrKnot.com - All Right Reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
