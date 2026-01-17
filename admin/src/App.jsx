import { useContext } from "react";
import "./index.css";
import Login from "./pages/Login.jsx";
import { Route, Routes, Navigate } from "react-router-dom"; // Added Navigate
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { AdminContext } from "./context/AdminContext.jsx";
import { DoctorContext } from "./context/DoctorContext.jsx";
import Navbar from "./components/Navbar.jsx";
import Sidebar from "./components/Sidebar.jsx";
import Dashboard from "./pages/Admin/Dashboard.jsx";
import AllAppointments from "./pages/Admin/AllAppointments.jsx";
import AddDoctor from "./pages/Admin/AddDoctor.jsx";
import DoctorDashboard from "./pages/Doctor/DoctorDashboard.jsx";
import DoctorProfile from "./pages/Doctor/DoctorProfile.jsx";
import DoctorsList from "./pages/Admin/DoctorList.jsx";
import DoctorAppointments from "./pages/Doctor/DoctorAppointments.jsx";

function App() {
  const { atoken } = useContext(AdminContext);
  const { dtoken } = useContext(DoctorContext);

  // return (
  //   <>
  //     <ToastContainer />
  //     <Login />
  //   </>
  // );

  return atoken || dtoken ? (
    <div className="bg-[#F8F9FD] min-h-screen">
      <ToastContainer />
      <Navbar />
      <div className="flex items-start">
        <Sidebar />
        <Routes>
          {/* Default Route if admin logged-in: Redirects from / to /admin-dashboard */}
          {atoken && (
            <Route path="/" element={<Navigate to="/admin-dashboard" />} />
          )}
          {/* Default Route if doctor logged-in: Redirects from / to /doctor-dashboard */}
          {dtoken && (
            <Route path="/" element={<Navigate to="/doctor-dashboard" />} />
          )}

          {/* Admin Routes */}
          <Route path="/admin-dashboard" element={<Dashboard />} />
          <Route path="/all-appointments" element={<AllAppointments />} />
          <Route path="/add-doctor" element={<AddDoctor />} />
          <Route path="/doctor-list" element={<DoctorsList />} />

          {/* Doctor Routes */}
          <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
          <Route path="/doctor-appointments" element={<DoctorAppointments />} />
          <Route path="/doctor-profile" element={<DoctorProfile />} />
        </Routes>
      </div>
    </div>
  ) : (
    <>
      <ToastContainer />
      <Login />
    </>
  );
}

export default App;
