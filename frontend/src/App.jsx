import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";

import Home from "./pages/Home.jsx";
import Doctors from "./pages/Doctors.jsx";
import Appointment from "./pages/Appointment.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import Auth from "./pages/Auth.jsx";
import MyAppointments from "./pages/MyAppointments.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MyProfile from "./pages/MyProfile.jsx";

function App() {
  return (
    <div className="mx-4 sm:mx-[10%]">
      <ToastContainer />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/doctors/:speciality" element={<Doctors />} />
        <Route path="/appointment/:docId" element={<Appointment />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        {/* <Route path="/auth" element={<Auth />} /> */}
        <Route path="/auth/:authMode" element={<Auth />} />
        <Route path="/my-appointments" element={<MyAppointments />} />
        <Route path="/my-profile" element={<MyProfile />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
