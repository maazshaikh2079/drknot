// import { doctors } from "../assets/assets.js";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

export const AppContext = createContext();

const AppContextProvider = (props) => {
  // const currencySymbol = "$";
  const currencySymbol = "₹";
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [token, setToken] = useState(
    localStorage.getItem("token") ? localStorage.getItem("token") : ""
  );
  const [doctors, setDoctors] = useState([]);
  const [userData, setUserData] = useState(false);

  // Getting All Doctors using API
  const getDoctorsData = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/doctor/list");
      if (data.success) {
        setDoctors(data.doctors);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  // Getting User Profile using API
  const loadUserProfileData = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/user/get-profile", {
        headers: { token },
      });

      if (data.success) {
        setUserData(data.userData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      // console.log(error);
      // toast.error(error.message);
      console.log(error);
      toast.error("Session expired, please login again"); // Specific error message
      setToken(""); // Clear invalid token
      localStorage.removeItem("token");
    }
  };

  useEffect(() => {
    getDoctorsData();
  }, []);

  useEffect(() => {
    if (token) {
      loadUserProfileData();
    }
  }, [token]);

  const value = {
    currencySymbol,
    backendUrl,
    token,
    setToken,
    doctors,
    getDoctorsData,
    userData,
    setUserData,
    loadUserProfileData,
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export default AppContextProvider;
