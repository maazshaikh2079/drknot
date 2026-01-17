import mongoose, { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    name: { type: String, required: true, trim: true, index: true },
    email: { type: String, required: true, trim: true, unique: true },
    image: {
      type: String,
      default: "https://i.ibb.co/vxLH9d92/default-avatar-light.png",
      trim: true,
    },
    phone: { type: String, default: "000000000", trim: true },
    address: { type: Object, default: { line1: "", line2: "" } },
    gender: { type: String, default: "Not Selected" },
    dob: { type: String, default: "Not Selected" },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 8,
      trim: true,
    },
  },
  { timestamps: true }
);

const User = model("user", userSchema);
export default User;
