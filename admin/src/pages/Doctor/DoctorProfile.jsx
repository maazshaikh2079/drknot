import React, { useContext, useEffect, useState } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { AppContext } from "../../context/AppContext";
import { toast } from "react-toastify";
import axios from "axios";

const DoctorProfile = () => {
  const { dtoken, docProfileData, setDocProfileData, getDocProfileData } =
    useContext(DoctorContext);
  const { currency, backendUrl } = useContext(AppContext);
  const [isEditing, setIsEditing] = useState(false);

  const updateProfile = async () => {
    try {
      const newDocData = {
        address: docProfileData.address,
        fees: docProfileData.fees,
        about: docProfileData.about,
        available: docProfileData.available,
      };

      const { data } = await axios.post(
        // url:
        backendUrl + "/api/doctor/update-profile",
        // body:
        newDocData,
        // headers:
        { headers: { dtoken } }
      );

      if (data.success) {
        toast.success(data.message);
        setIsEditing(false);
        getDocProfileData();
      } else {
        toast.error(data.message);
      }

      setIsEditing(false);
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };

  useEffect(() => {
    if (dtoken) {
      getDocProfileData();
    }
  }, [dtoken]);

  return (
    docProfileData && (
      <div className="max-w-6xl">
        <div className="flex flex-col gap-4 m-5 sm:flex-row">
          {/* --- Doctor Image --- */}
          <div className="flex-shrink-0">
            <img
              className="bg-primary/80 w-full sm:max-w-64 rounded-lg shadow-sm object-cover"
              src={docProfileData.image}
              alt="doctor"
            />
          </div>

          {/* --- Profile Information Card --- */}
          <div className="flex-1 border border-zinc-200 rounded-lg p-8 py-7 bg-white shadow-xs">
            {/* Doc Name & Basic Info */}
            <p className="flex items-center gap-2 text-2xl font-semibold text-zinc-800">
              {docProfileData.name}
            </p>
            <div className="flex items-center gap-2 mt-1 text-zinc-600">
              <p className="text-sm">
                {docProfileData.degree} - {docProfileData.speciality}
              </p>
              <span className="py-0.5 px-2 border border-zinc-200 text-xs rounded-full bg-zinc-50 text-nowrap">
                {docProfileData.experience}
              </span>
            </div>

            {/* About Section */}
            <div className="mt-6">
              <p className="flex items-center gap-1 text-md font-medium text-zinc-800">
                About :
              </p>
              <div className="text-sm text-zinc-600 leading-relaxed max-w-[700px] mt-2">
                {isEditing ? (
                  <textarea
                    onChange={(e) =>
                      setDocProfileData((prev) => ({
                        ...prev,
                        about: e.target.value,
                      }))
                    }
                    className="w-full border border-zinc-200 rounded-md outline-primary p-3 bg-zinc-50 focus:bg-white transition-all"
                    rows={6}
                    value={docProfileData.about}
                  />
                ) : (
                  <p>{docProfileData.about}</p>
                )}
              </div>
            </div>

            {/* Appointment Fees */}
            <p className="text-zinc-600 mt-6 font-semibold">
              Appointment fee:{" "}
              <span className="text-zinc-800 font-medium">
                {currency}{" "}
                {isEditing ? (
                  <input
                    type="number"
                    className="border border-zinc-200 rounded-md px-2 py-1 bg-zinc-50 outline-primary w-24 ml-1"
                    onChange={(e) =>
                      setDocProfileData((prev) => ({
                        ...prev,
                        fees: e.target.value,
                      }))
                    }
                    value={docProfileData.fees}
                  />
                ) : (
                  docProfileData.fees
                )}
              </span>
            </p>

            {/* Address Section */}
            <div className="flex gap-3 py-4 text-zinc-700">
              <p className="font-medium">Address:</p>
              <div className="text-sm text-zinc-600 flex flex-col gap-1 flex-1">
                {isEditing ? (
                  <>
                    <input
                      type="text"
                      className="border border-zinc-200 rounded-md px-2 py-1 bg-zinc-50 outline-primary w-full max-w-sm"
                      onChange={(e) =>
                        setDocProfileData((prev) => ({
                          ...prev,
                          address: { ...prev.address, line1: e.target.value },
                        }))
                      }
                      value={docProfileData.address.line1}
                    />
                    <input
                      type="text"
                      className="border border-zinc-200 rounded-md px-2 py-1 bg-zinc-50 outline-primary w-full max-w-sm"
                      onChange={(e) =>
                        setDocProfileData((prev) => ({
                          ...prev,
                          address: { ...prev.address, line2: e.target.value },
                        }))
                      }
                      value={docProfileData.address.line2}
                    />
                  </>
                ) : (
                  <>
                    <p>{docProfileData.address.line1}</p>
                    <p>{docProfileData.address.line2}</p>
                  </>
                )}
              </div>
            </div>

            {/* Availability Toggle Switch */}
            <div className="flex items-center gap-3 pt-2">
              {/* Toggle Container */}
              <div
                className={`relative inline-flex h-5 w-10 items-center rounded-full transition-colors duration-300 shadow-xs ${!isEditing ? "cursor-not-allowed opacity-70" : "cursor-pointer"} ${docProfileData.available ? "bg-primary" : "bg-zinc-300"}`}
                onClick={() =>
                  isEditing &&
                  setDocProfileData((prev) => ({
                    ...prev,
                    available: !prev.available,
                  }))
                }
              >
                {/* Toggle Circle */}
                <span
                  className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform duration-300 shadow-sm ${docProfileData.available ? "translate-x-6" : "translate-x-1"}`}
                />
              </div>
              {/* Availability Label */}
              <label
                htmlFor="availability"
                className={`text-md font-medium transition-colors ${!isEditing ? "cursor-default" : "cursor-pointer"} ${docProfileData.available ? "text-primary" : "text-zinc-500"}`}
              >
                {docProfileData.available ? "Available" : "Unavailable"}
              </label>
            </div>

            {/* Action Buttons */}
            <div className="mt-8">
              {isEditing ? (
                <button
                  onClick={updateProfile}
                  className="px-8 py-2 bg-primary text-white text-sm font-medium rounded-full shadow-sm hover:brightness-110 transition-all active:scale-95 cursor-pointer"
                >
                  Save Changes
                </button>
              ) : (
                <button
                  onClick={() => setIsEditing((prev) => !prev)}
                  className="px-8 py-2 border border-primary text-primary text-sm font-medium rounded-full hover:bg-primary hover:text-white transition-all active:scale-95 cursor-pointer"
                >
                  Edit Profile
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default DoctorProfile;
