import { useContext, useEffect } from "react";

import { DoctorContext } from "../../context/DoctorContext.jsx";
import { assets } from "../../assets/assets.js";
import { AppContext } from "../../context/AppContext.jsx";

const DoctorDashboard = () => {
  const {
    dtoken,
    dashboardData,
    getDashboardData,
    cancelAppointment,
    completeAppointment,
  } = useContext(DoctorContext);
  const { currency, slotDateFormat } = useContext(AppContext);

  useEffect(() => {
    if (dtoken) {
      getDashboardData();
    }
  }, [dtoken]);

  return (
    dashboardData && (
      <div className="m-5">
        {/* Top Stats Cards */}
        <div className="flex flex-wrap gap-3">
          {/* Earnings Card */}
          <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-sm">
            <img className="w-14" src={assets.doctor_icon} alt="doctors" />
            <div>
              <p className="text-xl font-semibold text-gray-700">
                {currency} {dashboardData.earnings}
              </p>
              <p className="text-gray-400">Earnings</p>
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
        {/* ----------------------------- */}

        {/* Latest Appointments Container */}
        <div className="bg-white">
          {/* Latest Bookings Heading */}
          <div className="flex items-center gap-2.5 px-4 py-4 mt-10 rounded-t border border-zinc-200">
            <img src={assets.list_icon} alt="" />
            <p className="font-semibold">Latest Bookings</p>
          </div>

          {/* 5 Latest Appointment List */}
          <div className="pt-4 border border-t-0 border-zinc-200">
            {dashboardData.latestAppointments
              .slice(0, 5)
              .map((appointment, index) => (
                <div
                  className="flex items-center px-6 py-3 gap-3 hover:bg-gray-50"
                  // key={index}
                  key={appointment._id}
                >
                  <img
                    src={appointment.userData.image}
                    className="w-8 h-8 rounded-full object-cover bg-gray-100"
                    alt="patient"
                  />
                  <div className="flex-1 text-sm">
                    <p className="text-gray-800 font-medium">
                      {appointment.userData.name}
                    </p>
                    <p className="text-gray-600 ">
                      Booking on {slotDateFormat(appointment.slotDate)}
                    </p>
                  </div>
                  {appointment.cancelled ? (
                    <p className="text-red-400 text-xs font-medium bg-red-50 px-2 py-1 rounded">
                      Cancelled
                    </p>
                  ) : appointment.isCompleted ? (
                    <p className="text-green-500 text-xs font-medium bg-green-50 px-2 py-1 rounded">
                      Completed
                    </p>
                  ) : (
                    <div className="flex">
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
              ))}
          </div>
        </div>
      </div>
    )
  );
};

export default DoctorDashboard;
