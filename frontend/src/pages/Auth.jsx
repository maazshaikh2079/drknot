import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

import { AppContext } from "../context/AppContext.jsx";
import { useContext } from "react";

const Auth = () => {
  //   const [authMode, setAuthMode] = useState(auth_mode);

  const navigate = useNavigate();
  const { backendUrl, token, setToken } = useContext(AppContext);

  const { authMode } = useParams();

  // let { authMode } = useParams();
  // if (!authMode) authMode = "Sign-In";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    if (authMode === "Sign-In") {
      // email && password && console.log("User Logged-In!");
      // alert("User Logged-In!");
      const { data } = await axios.post(backendUrl + "/api/user/login", {
        email,
        password,
      });

      if (data.success) {
        localStorage.setItem("token", data.token);
        setToken(data.token);
        alert("User Logged-In!");
        // navigate("/");
      } else {
        toast.error(data.message);
      }
    } else {
      // name && email && password && console.log("User Registered!");
      // alert("User Registered!");
      const { data } = await axios.post(backendUrl + "/api/user/register", {
        name,
        email,
        password,
      });

      if (data.success) {
        localStorage.setItem("token", data.token);
        setToken(data.token);
        alert("User Registered!");
        // navigate("/");
      } else {
        toast.error(data.message);
      }
    }
  };

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token]);

  return (
    // border
    <form
      onSubmit={onSubmitHandler}
      className=" min-h-[80vh] flex items-center"
    >
      <div className="border border-zinc-200 flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 rounded-xl text-zinc-600 text-sm shadow-lg">
        <p className="text-2xl font-semibold">
          {authMode === "Sign-In" ? "Login" : "Create Account"}
        </p>
        <p>
          Please {authMode === "Sign-In" ? "log-in" : "sign-up"} to book
          appointment
        </p>
        {authMode === "Sign-Up" ? (
          <div className="w-full">
            <label htmlFor="name">Full Name</label>
            <input
              id="name"
              type="text"
              value={name}
              required
              onChange={(event) => setName(event.target.value)}
              className="border border-zinc-300 rounded w-full p-2 mt-1"
            />
          </div>
        ) : null}
        <div className="w-full">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            required
            onChange={(event) => setEmail(event.target.value)}
            className="border border-zinc-300 rounded w-full p-2 mt-1"
          />
        </div>
        <div className="w-full">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            required
            onChange={(event) => setPassword(event.target.value)}
            className="border border-zinc-300 rounded w-full p-2 mt-1"
          />
        </div>

        {/* <button  type="submit" className="bg-primary text-white w-full py-2 rounded-md text-base">
          {authMode === "Sign-In" ? "Login" : "Register"}
        </button> */}

        <input
          type="submit"
          value={authMode === "Sign-In" ? "Login" : "Register"}
          className="bg-primary text-white w-full py-2 rounded-md text-base"
        />

        {authMode === "Sign-In" ? (
          <p>
            Create a new account?{" "}
            <span
              //   onClick={() => setAuthMode("Sign-Up")}
              onClick={() => navigate("/auth/Sign-Up")}
              className="text-primary underline cursor-pointer"
            >
              Click here
            </span>
          </p>
        ) : (
          <p>
            Already have an account?{" "}
            <span
              //   onClick={() => setAuthMode("Sign-In")}
              onClick={() => navigate("/auth/Sign-In")}
              className="text-primary underline cursor-pointer"
            >
              Login here
            </span>
          </p>
        )}
      </div>
    </form>
  );
};

export default Auth;
