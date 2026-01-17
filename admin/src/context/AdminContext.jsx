import axios from "axios";
import { createContext, useState } from "react";
import { toast } from "react-toastify";

export const AdminContext = createContext();

const AdminContextProvider = (props) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [atoken, setAtoken] = useState(
    localStorage.getItem("atoken") ? localStorage.getItem("atoken") : ""
  );

  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [dashboardData, setDashboardData] = useState(false);

  // Getting all Doctors data from Database using API
  const getAllDoctors = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/admin/all-doctors", {
        headers: { atoken },
      });
      if (data.success) {
        setDoctors(data.doctors);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Function to change doctor availablity using API
  const changeAvailability = async (docId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/admin/change-availability",
        { docId },
        { headers: { atoken } }
      );
      if (data.success) {
        toast.success(data.message);
        getAllDoctors();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const getAllAppointments = async () => {
    try {
      const { data } = await axios.get(
        // url:
        backendUrl + "/api/admin/appointments",
        // headers:
        { headers: { atoken } }
      );

      if (data.success) {
        setAppointments(data.appointments.reverse());
        console.log(data.appointments);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };

  // Function to cancel appointment using API
  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        // url:
        backendUrl + "/api/admin/cancel-appointment",
        // body:
        { appointmentId },
        // headers:
        { headers: { atoken } }
      );

      if (data.success) {
        toast.success(data.message);
        getAllAppointments();
        // Later after creating getDashData Function
        getDashboardData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };

  // API to get Admin Dashboard data from Database
  const getDashboardData = async () => {
    try {
      const { data } = await axios.get(
        // url:
        backendUrl + "/api/admin/dashboard",
        // headers:
        { headers: { atoken } }
      );

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

  const value = {
    atoken,
    setAtoken,
    doctors,
    getAllDoctors,
    changeAvailability,
    appointments,
    getAllAppointments,
    cancelAppointment,
    dashboardData,
    getDashboardData,
  };

  return (
    <AdminContext.Provider value={value}>
      {props.children}
    </AdminContext.Provider>
  );
};

export default AdminContextProvider;
