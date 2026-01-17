import React, { useEffect } from "react";
import { assets } from "../../assets/assets";
import { useContext } from "react";
import { AdminContext } from "../../context/AdminContext";
import { AppContext } from "../../context/AppContext";

const AllAppointments = () => {
  const { atoken, appointments, getAllAppointments, cancelAppointment } =
    useContext(AdminContext);
  const { slotDateFormat, calculateAge, currency } = useContext(AppContext);

  useEffect(() => {
    if (atoken) {
      getAllAppointments();
    }
  }, [atoken]);

  return (
    <div className="w-full max-w-6xl m-5">
      <p className="mb-3 text-lg font-medium">All Appointments</p>

      <div className="bg-white border border-zinc-200 rounded text-sm max-h-[80vh] overflow-y-auto">
        {/* Table Header */}
        <div className="hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] py-3 px-6 border-b border-gray-200 bg-gray-50/50">
          <p className="font-semibold">#</p>
          <p className="font-semibold">Patient</p>
          <p className="font-semibold">Age</p>
          <p className="font-semibold">Date & Time</p>
          <p className="font-semibold">Doctor</p>
          <p className="font-semibold">Fees</p>
          <p className="font-semibold text-center">Action</p>
        </div>

        {/* Table Body */}
        {appointments.map((appointment, index) => (
          <div
            className="flex flex-wrap justify-between gap-2 sm:grid sm:grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] items-center text-gray-500 py-3 px-6 border-b border-gray-100 hover:bg-gray-50/80 transition-colors"
            key={appointment._id || index}
          >
            {/* Index - Hidden on Mobile */}
            <p className="hidden sm:block">{index + 1}</p>

            {/* Patient Info */}
            <div className="flex items-center gap-2">
              <img
                src={appointment.userData.image}
                className="w-8 h-8 rounded-full object-cover bg-gray-100"
                alt="patient"
              />
              <p className="text-gray-900 font-medium">
                {appointment.userData.name}
              </p>
            </div>

            {/* Age - Hidden on Mobile */}
            <p className="hidden sm:block">
              {calculateAge(appointment.userData.dob)}
            </p>

            {/* Date & Time */}
            <p>
              {slotDateFormat(appointment.slotDate)}, {appointment.slotTime}
            </p>

            {/* Doctor Info */}
            <div className="flex items-center gap-2">
              <img
                src={appointment.docData.image}
                className="w-8 h-8 rounded-full bg-gray-100 object-cover"
                alt="doctor"
              />
              <p className="text-gray-900">{appointment.docData.name}</p>
            </div>

            {/* Amount */}
            <p className="font-medium text-gray-700">
              {currency}
              {appointment.amount}
            </p>

            {/* Status Actions */}
            <div className="flex justify-center">
              {appointment.cancelled ? (
                <p className="text-red-400 text-xs font-medium bg-red-50 px-2 py-1 rounded">
                  Cancelled
                </p>
              ) : appointment.isCompleted ? (
                <p className="text-green-500 text-xs font-medium bg-green-50 px-2 py-1 rounded">
                  Completed
                </p>
              ) : (
                <img
                  onClick={() => cancelAppointment(appointment._id)}
                  className="w-8 cursor-pointer hover:scale-110 transition-transform"
                  src={assets.cancel_icon}
                  alt="cancel"
                />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllAppointments;
