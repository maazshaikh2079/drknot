import express from "express";
import {
  getDoctorList,
  loginDoctor,
  changeAvailablity,
  appointmentsDoctor,
  appointmentCancel,
  appointmentComplete,
  doctorDashboard,
  doctorProfile,
  updateDoctorProfile,
} from "../controllers/doctor.controller.js";
import authDoctor from "../middlewares/authDoctor.js";

const doctorRouter = express.Router();

doctorRouter.get("/list", getDoctorList);
doctorRouter.post("/login", loginDoctor);

// doctorRouter.post("/change-availability", authDoctor, changeAvailablity)

doctorRouter.get("/appointments", authDoctor, appointmentsDoctor);
doctorRouter.patch("/cancel-appointment", authDoctor, appointmentCancel);
doctorRouter.patch("/complete-appointment", authDoctor, appointmentComplete);
doctorRouter.get("/dashboard", authDoctor, doctorDashboard);
doctorRouter.get("/profile", authDoctor, doctorProfile);
doctorRouter.post("/update-profile", authDoctor, updateDoctorProfile);

export default doctorRouter;
