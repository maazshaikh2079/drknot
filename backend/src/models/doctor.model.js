import mongoose, { Schema, model } from "mongoose";

const doctorSchema = new Schema(
  {
    name: { type: String, required: true, trim: true, index: true },
    email: { type: String, required: true, trim: true, unique: true },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 8,
      trim: true,
    },
    image: { type: String, required: true, trim: true },
    speciality: { type: String, required: true, trim: true },
    degree: { type: String, required: true, trim: true },
    experience: { type: String, required: true, trim: true },
    about: { type: String, required: true, trim: true },
    available: { type: Boolean, default: true },
    fees: { type: Number, required: true },
    slots_booked: { type: Object, default: {} }, // Eg. { "20_01_2026": ["10:00 AM", "11:00 AM"], "": [], ... }
    address: { type: Object, required: true },
    date: { type: Number, required: true },
  },
  { minimize: false },
  { timestamps: true }
);

// export const Doctor = model("doctor", doctorSchema);
const Doctor = model("doctor", doctorSchema);
export default Doctor;
