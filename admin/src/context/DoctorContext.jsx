import { createContext, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

export const DoctorContext = createContext();

const DoctorContextProvider = (props) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [dtoken, setDtoken] = useState(
    localStorage.getItem("dtoken") ? localStorage.getItem("dtoken") : ""
  );

  const [appointments, setAppointments] = useState([]);
  const [dashboardData, setDashboardData] = useState(false);
  const [docProfileData, setDocProfileData] = useState(false);

  // Getting Doctor appointment data from Database using API
  const getAppointments = async () => {
    try {
      const { data } = await axios.get(
        // url:
        backendUrl + "/api/doctor/appointments",
        // headers:
        { headers: { dtoken } }
      );

      if (data.success) {
        setAppointments(data.appointments.reverse());
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  // Function to cancel doctor appointment using API
  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.patch(
        // url:
        backendUrl + "/api/doctor/cancel-appointment",
        // body:
        { appointmentId },
        // headers:
        { headers: { dtoken } }
      );

      if (data.success) {
        toast.success(data.message);
        getAppointments();
        getDashboardData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };

  // Function to Mark appointment completed using API
  const completeAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.patch(
        // urL:
        backendUrl + "/api/doctor/complete-appointment",
        // body:
        { appointmentId },
        // headers:
        { headers: { dtoken } }
      );

      if (data.success) {
        toast.success(data.message);
        getAppointments();
        getDashboardData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };

  // Getting Doctor dashboard data using API
  const getDashboardData = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/doctor/dashboard", {
        headers: { dtoken },
      });

      if (data.success) {
        setDashboardData(data.dashboardData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  // Getting Doctor profile data from Database using API
  const getDocProfileData = async () => {
    try {
      const { data } = await axios.get(
        // url:
        backendUrl + "/api/doctor/profile",
        // body:
        { headers: { dtoken } }
      );
      console.log(data.docProfileData);
      setDocProfileData(data.docProfileData);
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const value = {
    backendUrl,
    dtoken,
    setDtoken,
    appointments,
    getAppointments,
    cancelAppointment,
    completeAppointment,
    dashboardData,
    getDashboardData,
    docProfileData,
    setDocProfileData,
    getDocProfileData,
  };

  return (
    <DoctorContext.Provider value={value}>
      {props.children}
    </DoctorContext.Provider>
  );
};

export default DoctorContextProvider;
