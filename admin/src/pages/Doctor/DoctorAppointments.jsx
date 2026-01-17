import React from "react";
import { useContext, useEffect } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { AppContext } from "../../context/AppContext";
import { assets } from "../../assets/assets";

const DoctorAppointments = () => {
  const {
    dtoken,
    appointments,
    getAppointments,
    cancelAppointment,
    completeAppointment,
  } = useContext(DoctorContext);
  const { currency, slotDateFormat, calculateAge } = useContext(AppContext);

  useEffect(() => {
    if (dtoken) {
      getAppointments();
    }
  }, [dtoken]);

  return (
    <div className="w-full max-w-6xl m-5">
      <p className="mb-3 text-lg font-medium text-gray-700">All Appointments</p>

      <div className="bg-white border border-gray-200 rounded-lg text-sm max-h-[80vh] overflow-y-auto shadow-sm">
        {/* Table Header - Simplified Grid */}
        <div className="hidden sm:grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-4 py-3 px-6 border-b border-gray-200 bg-gray-50/50 font-semibold text-gray-600">
          <p>#</p>
          <p>Patient</p>
          <p>Payment</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Fees</p>
          <p className="text-center">Action</p>
        </div>

        {/* Table Body */}
        {appointments.map((appointment, index) => (
          <div
            className="flex flex-wrap justify-between gap-5 py-3 px-6 border-b border-gray-100 items-center text-gray-500 hover:bg-gray-50/80 transition-colors sm:grid sm:grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] sm:gap-4 max-sm:text-base"
            key={appointment._id}
          >
            {/* Index - Fixed to start from 1 */}
            <p className="hidden sm:block">{index + 1}</p>

            {/* Patient Info */}
            <div className="flex items-center gap-3">
              <img
                src={appointment.userData.image}
                className="w-8 h-8 rounded-full object-cover bg-gray-100"
                alt="patient"
              />
              <p className="text-gray-900 font-medium">
                {appointment.userData.name}
              </p>
            </div>

            {/* Payment Status */}
            <div>
              <span
                className={`text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full border ${appointment.payment ? "border-primary text-primary bg-primary/5" : "border-gray-400 text-gray-500 bg-gray-50"}`}
              >
                {appointment.payment ? "Online" : "CASH"}
              </span>
            </div>

            {/* Age */}
            <p className="hidden sm:block">
              {calculateAge(appointment.userData.dob)}
            </p>

            {/* Timing */}
            <p className="text-gray-600">
              {slotDateFormat(appointment.slotDate)},{" "}
              <span className="font-medium">{appointment.slotTime}</span>
            </p>

            {/* Fees */}
            <p className="font-medium text-gray-700">
              {currency}
              {appointment.amount}
            </p>

            {/* Action Buttons */}
            <div className="flex justify-center gap-2">
              {appointment.cancelled ? (
                <p className="text-red-400 text-xs font-medium bg-red-50 px-2 py-1 rounded">
                  Cancelled
                </p>
              ) : appointment.isCompleted ? (
                <p className="text-green-500 text-xs font-medium bg-green-50 px-2 py-1 rounded">
                  Completed
                </p>
              ) : (
                <div className="flex items-center gap-1">
                  {/* <img
                    onClick={() => cancelAppointment(appointment._id)}
                    className="w-9 h-9 p-1 cursor-pointer hover:bg-red-50 rounded-full transition-all"
                    src={assets.cancel_icon}
                    alt="cancel"
                  />
                  <img
                    onClick={() => completeAppointment(appointment._id)}
                    className="w-9 h-9 p-1 cursor-pointer hover:bg-green-50 rounded-full transition-all"
                    src={assets.tick_icon}
                    alt="complete"
                  /> */}
                  <img
                    onClick={() => cancelAppointment(appointment._id)}
                    className="w-10 h-10 p-1 cursor-pointer hover:bg-red-50 rounded-full transition-all"
                    src={assets.cancel_icon}
                    alt="cancel"
                  />
                  <img
                    onClick={() => completeAppointment(appointment._id)}
                    className="w-10 h-10 p-1 cursor-pointer hover:bg-green-50 rounded-full transition-all"
                    src={assets.tick_icon}
                    alt="complete"
                  />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorAppointments;
