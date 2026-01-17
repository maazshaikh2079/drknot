import axios from "axios";
import React, { useContext, useState } from "react";
import { assets } from "../assets/assets.js";
import { AdminContext } from "../context/AdminContext.jsx";
import { DoctorContext } from "../context/DoctorContext.jsx";
import { AppContext } from "../context/AppContext.jsx";
import { toast } from "react-toastify";

const Login = () => {
  const [loginMode, setLoginMode] = useState("Admin");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //   const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const { backendUrl } = useContext(AppContext);

  const { setAtoken } = useContext(AdminContext);
  const { setDtoken } = useContext(DoctorContext);

  // ADMIN_EMAIL = "admin@drknot.com"
  // ADMIN_PASSWORD = "admin1234"

  // Doc Email: drrichard@demo.com
  // doc password: drrichard1234

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    if (loginMode === "Admin") {
      const { data } = await axios.post(
        // url:
        backendUrl + "/api/admin/login",
        // body:
        {
          email,
          password,
        }
      );
      if (data.success) {
        setAtoken(data.atoken);
        localStorage.setItem("atoken", data.atoken);
        // alert(`Admin logged-in!\natoken: ${data.atoken}`);
        // toast.success(`Admin logged-in! atoken: ${data.atoken}`);
      } else {
        toast.error(data.message);
        // alert(data.message);
      }
    } else if (loginMode === "Doctor") {
      const { data } = await axios.post(
        // url:
        backendUrl + "/api/doctor/login",
        // body:
        {
          email,
          password,
        }
      );
      if (data.success) {
        setDtoken(data.dtoken);
        localStorage.setItem("dtoken", data.dtoken);
        // alert(`Doctor logged-in!\ndtoken: ${data.dtoken}`);
        // toast.success(`Doctor logged-in!\natoken: ${data.dtoken}`);
      } else {
        toast.error(data.message);
      }
      // alert("TODO: make doc login-in ");
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className="min-h-[80vh] flex items-center">
      <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border border-zinc-200 rounded-xl text-zinc-600 text-sm shadow-lg">
        <p className="text-2xl font-semibold m-auto">
          <span className="text-primary">{loginMode}</span> Login
        </p>

        <div className="w-full ">
          <p>Email:</p>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className="border border-[#DADADA] rounded w-full p-2 mt-1"
            type="email"
            required
          />
        </div>
        <div className="w-full ">
          <p>Password:</p>
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            className="border border-[#DADADA] rounded w-full p-2 mt-1"
            type="password"
            required
          />
        </div>
        <button className="bg-primary text-white w-full py-2 rounded-md text-base">
          Login
        </button>
        {loginMode === "Admin" ? (
          <p>
            Doctor Login?{" "}
            <span
              onClick={() => setLoginMode("Doctor")}
              className="text-primary underline cursor-pointer"
            >
              Click here
            </span>
          </p>
        ) : (
          <p>
            Admin Login?{" "}
            <span
              onClick={() => setLoginMode("Admin")}
              className="text-primary underline cursor-pointer"
            >
              Click here
            </span>
          </p>
        )}
      </div>
    </form>
  );
};

export default Login;
