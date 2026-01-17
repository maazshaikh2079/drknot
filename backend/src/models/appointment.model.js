import mongoose, { Schema, model } from "mongoose";

const appointmentSchema = new Schema(
  {
    userId: { type: String, required: true, trim: true },
    docId: { type: String, required: true, trim: true },
    slotDate: { type: String, required: true, trim: true },
    slotTime: { type: String, required: true, trim: true },
    userData: { type: Object, required: true },
    docData: { type: Object, required: true },
    amount: { type: Number, required: true },
    date: { type: Number, required: true },
    cancelled: { type: Boolean, default: false },
    payment: { type: Boolean, default: false },
    isCompleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Appointment = model("appointment", appointmentSchema);
export default Appointment;
