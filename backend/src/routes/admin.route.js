import express from "express";
import {
  addDoctor,
  loginAdmin,
  getAllDoctors,
  appointmentsAdmin,
  appointmentCancel,
  adminDashboard
} from "../controllers/admin.controller.js";
import { changeAvailablity } from "../controllers/doctor.controller.js";
import upload from "../middlewares/multer.js";
import authAdmin from "../middlewares/authAdmin.js";

const adminRouter = express.Router();

adminRouter.post("/login", loginAdmin);

// adminRouter.use(authAdmin) // adminRouter.use(verifyJwt)

adminRouter.post("/add-doctor", authAdmin, upload.single("image"), addDoctor);
adminRouter.get("/all-doctors", authAdmin, getAllDoctors);
adminRouter.post("/change-availability", authAdmin, changeAvailablity);
adminRouter.get("/appointments", authAdmin, appointmentsAdmin);
adminRouter.post("/cancel-appointment", authAdmin, appointmentCancel);
adminRouter.get("/dashboard", authAdmin, adminDashboard);

export default adminRouter;
