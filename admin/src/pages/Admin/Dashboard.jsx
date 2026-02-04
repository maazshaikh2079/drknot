import React, { useContext, useEffect } from "react";
import { assets } from "../../assets/assets.js";
import { AdminContext } from "../../context/AdminContext.jsx";
import { AppContext } from "../../context/AppContext.jsx";

const Dashboard = () => {
  const { atoken, dashboardData, getDashboardData, cancelAppointment } =
    useContext(AdminContext);
  const { slotDateFormat } = useContext(AppContext);

  useEffect(() => {
    if (atoken) {
      getDashboardData();
    }
  }, [atoken]);

  return dashboardData ? (
    <div className="m-5">
      {/* --- Stat Cards --- */}
      <div className="flex flex-wrap gap-3">
        {/* Doctors Card */}
        <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-sm">
          <img className="w-14" src={assets.doctor_icon} alt="doctors" />
          <div>
            <p className="text-xl font-semibold text-gray-700">
              {dashboardData.doctors}
            </p>
            <p className="text-gray-400">Doctors</p>
          </div>
        </div>

        {/* Appointments Card */}
        <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-sm">
          <img
            className="w-14"
            src={assets.appointments_icon}
            alt="appointments"
          />
          <div>
            <p className="text-xl font-semibold text-gray-700">
              {dashboardData.appointments}
            </p>
            <p className="text-gray-400">Appointments</p>
          </div>
        </div>

        {/* Patients Card */}
        <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-sm">
          <img className="w-14" src={assets.patients_icon} alt="patients" />
          <div>
            <p className="text-xl font-semibold text-gray-700">
              {dashboardData.patients}
            </p>
            <p className="text-gray-400">Patients</p>
          </div>
        </div>
      </div>

      {/* --- Latest Bookings List --- */}
      <div className="bg-white rounded-lg shadow-xs overflow-hidden mt-10">
        {" "}
        {/* Added mt-5 for a smaller, consistent gap */}
        <div className="flex items-center gap-2.5 px-4 py-4 border border-gray-200 rounded-t-lg">
          {" "}
          {/* Removed mt-10 here */}
          <img className="w-5" src={assets.list_icon} alt="list" />
          <p className="font-semibold text-gray-800">Latest Bookings</p>
        </div>
        <div className="border border-t-0 border-gray-200">
          {dashboardData.latestAppointments.slice(0, 5).map((appointment) => (
            <div
              className="flex items-center px-6 py-3 gap-3 hover:bg-gray-50 transition-colors"
              key={appointment._id}
            >
              <img
                className="rounded-full w-10 h-10 object-cover bg-gray-100"
                src={appointment.docData.image}
                alt="doctor"
              />
              <div className="flex-1 text-sm">
                <p className="text-gray-900 font-medium">
                  {appointment.docData.name}
                </p>
                <p className="text-gray-500">
                  Booking on {slotDateFormat(appointment.slotDate)}
                </p>
              </div>

              <div className="flex items-center">
                {appointment.cancelled ? (
                  <span className="text-red-400 text-xs font-medium bg-red-50 px-2 py-1 rounded">
                    Cancelled
                  </span>
                ) : appointment.isCompleted ? (
                  <span className="text-green-500 text-xs font-medium bg-green-50 px-2 py-1 rounded">
                    Completed
                  </span>
                ) : (
                  <img
                    onClick={() => cancelAppointment(appointment._id)}
                    className="w-10 cursor-pointer hover:scale-110 transition-transform p-1"
                    src={assets.cancel_icon}
                    alt="cancel"
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  ) : (
    // Skeleton Loading State
    <div className="m-5 animate-pulse">
      {/* --- Stat Cards Skeleton --- */}
      <div className="flex flex-wrap gap-3">
        {[...Array(3)].map((_, index) => (
          <div
            key={index}
            className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100"
          >
            <div className="w-14 h-14 bg-gray-200 rounded-full"></div>
            <div>
              <div className="h-6 w-10 bg-gray-200 rounded mb-1"></div>
              <div className="h-4 w-20 bg-gray-200 rounded"></div>
            </div>
          </div>
        ))}
      </div>

      {/* --- Latest Bookings List Skeleton --- */}
      <div className="bg-white rounded-lg shadow-xs overflow-hidden mt-10">
        <div className="flex items-center gap-2.5 px-4 py-4 border border-gray-200 rounded-t-lg">
          <div className="w-5 h-5 bg-gray-200 rounded"></div>
          <div className="h-5 w-32 bg-gray-200 rounded"></div>
        </div>
        <div className="border border-t-0 border-gray-200">
          {[...Array(5)].map((_, index) => (
            <div
              key={index}
              className="flex items-center px-6 py-3 gap-3 hover:bg-gray-50"
            >
              <div className="rounded-full w-10 h-10 bg-gray-200"></div>
              <div className="flex-1">
                <div className="h-4 w-32 bg-gray-200 rounded mb-1"></div>
                <div className="h-3 w-24 bg-gray-200 rounded"></div>
              </div>
              <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
