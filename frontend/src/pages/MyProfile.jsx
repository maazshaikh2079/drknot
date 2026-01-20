import React, { useState, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { AppContext } from "../context/AppContext.jsx";
import { upload_icon } from "../assets/assets.js";

const MyProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [image, setImage] = useState(false);

  const { token, backendUrl, userData, setUserData, loadUserProfileData } =
    useContext(AppContext);

  // Function to update user profile data using API
  const updateUserProfile = async () => {
    try {
      const formData = new FormData();

      formData.append("name", userData.name);
      formData.append("phone", userData.phone);
      // Stringifying address object to handle nested data in FormData
      formData.append("address", JSON.stringify(userData.address));
      formData.append("gender", userData.gender);
      formData.append("dob", userData.dob);
      image && formData.append("image", image);

      const { data } = await axios.patch(
        backendUrl + "/api/user/update-profile",
        formData,
        { headers: { token } }
      );

      if (data.success) {
        toast.success(data.message);
        await loadUserProfileData(); // Refresh MyProfile page with updated data from backend
        setIsEditing(false);
        setImage(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  // Return loading state if userData is false or empty
  // if (!userData) {
  //   return (
  //     <div className="min-h-[60vh] flex items-center justify-center">
  //       <p className="text-gray-500 animate-pulse">Loading profile data...</p>
  //     </div>
  //   );
  // }

  return userData ? (
    <div className="max-w-lg flex flex-col gap-2 text-sm">
      {/* -------------------- USER PFP -------------------- */}
      {isEditing ? (
        <label htmlFor="image">
          <div className="inline-block relative cursor-pointer">
            <img
              className="w-36 rounded opacity-75"
              src={image ? URL.createObjectURL(image) : userData.image}
              alt=""
            />
            <img
              className="w-10 absolute bottom-12 right-12"
              src={image ? "" : upload_icon}
              alt=""
            />
          </div>
          <input
            // onChange={(e) => setImage(e.target.files[0])}
            onChange={(e) => {
              const file = e.target.files[0];
              if (file) {
                // Check if file size is greater than 2MB (2 * 1024 * 1024 bytes)
                if (file.size > 2 * 1024 * 1024) {
                  toast.error("Image size must be less than 2MB");
                  e.target.value = null; // Reset the input
                  return;
                }
                setImage(file);
              }
            }}
            type="file"
            id="image"
            hidden
          />
        </label>
      ) : (
        <img className="w-36 rounded" src={userData.image} alt="" />
      )}

      {/* -------------------- USERNAME -------------------- */}
      {isEditing ? (
        <input
          type="text"
          className="bg-gray-100 border border-gray-300 text-3xl font-medium mt-4 p-1"
          value={userData.name}
          onChange={(event) =>
            setUserData((prev) => ({ ...prev, name: event.target.value }))
          }
        />
      ) : (
        <p className="font-medium text-3xl text-neutral-800 mt-4">
          {userData.name}
        </p>
      )}

      <hr className="bg-zinc-400 h-[1px] border-none" />

      {/* ----------- CONTACT INFORMATION ----------- */}
      <div>
        <p className="text-neutral-500 underline mt-3">CONTACT INFORMATION</p>
        <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700">
          <p className="font-medium">Email id:</p>
          <p className="text-blue-500">{userData.email}</p>

          <p className="font-medium">Phone:</p>
          {isEditing ? (
            <input
              type="text"
              value={userData.phone}
              onChange={(event) =>
                setUserData((prev) => ({ ...prev, phone: event.target.value }))
              }
              className="bg-gray-100 border border-gray-300 p-1"
            />
          ) : (
            <p className="text-blue-400">{userData.phone}</p>
          )}

          <p className="font-medium">Address:</p>
          {isEditing ? (
            <div className="flex flex-col gap-1">
              <input
                type="text"
                value={userData.address.line1}
                onChange={(event) =>
                  setUserData((prev) => ({
                    ...prev,
                    address: { ...prev.address, line1: event.target.value },
                  }))
                }
                className="bg-gray-100 border border-gray-300 p-1 w-full"
              />
              <input
                type="text"
                value={userData.address.line2}
                onChange={(event) =>
                  setUserData((prev) => ({
                    ...prev,
                    address: { ...prev.address, line2: event.target.value },
                  }))
                }
                className="bg-gray-100 border border-gray-300 p-1 w-full"
              />
            </div>
          ) : (
            <p className="text-gray-500">
              {userData.address.line1}
              <br />
              {userData.address.line2}
            </p>
          )}
        </div>
      </div>

      {/* ----------- BASIC INFORMATION ----------- */}
      <div>
        <p className="text-neutral-500 underline mt-3">BASIC INFORMATION</p>
        <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700">
          <p className="font-medium">Gender:</p>
          {isEditing ? (
            <select
              onChange={(event) =>
                setUserData((prev) => ({ ...prev, gender: event.target.value }))
              }
              value={userData.gender}
              className="bg-gray-100 border border-gray-300 max-w-28 p-1"
            >
              <option value="Not Selected">Not Selected</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          ) : (
            <p className="text-gray-400">{userData.gender}</p>
          )}

          <p className="font-medium">Birthday:</p>
          {isEditing ? (
            <input
              type="date"
              value={userData.dob}
              onChange={(event) =>
                setUserData((prev) => ({ ...prev, dob: event.target.value }))
              }
              className="bg-gray-100 border border-gray-300 max-w-28 p-1"
            />
          ) : (
            <p className="text-gray-400">{userData.dob}</p>
          )}
        </div>
      </div>

      {/* -------------- EDIT / SAVE BUTTON ---------------- */}
      <div className="mt-10">
        {isEditing ? (
          <button
            onClick={updateUserProfile}
            className="border border-primary px-8 py-2 rounded-full hover:bg-primary hover:text-white transition-all"
          >
            Save Info
          </button>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="border border-primary px-8 py-2 rounded-full hover:bg-primary hover:text-white transition-all"
          >
            Edit
          </button>
        )}
      </div>
    </div>
  ) : (
    <div className="min-h-[60vh] flex items-center justify-center">
      <p className="text-gray-500 animate-pulse">Loading profile data...</p>
    </div>
  );
};

export default MyProfile;
