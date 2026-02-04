import React, { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";

const DoctorsList = () => {
  const { atoken, doctors, getAllDoctors, changeAvailability } =
    useContext(AdminContext);

  useEffect(() => {
    if (atoken) {
      getAllDoctors();
    }
  }, [atoken]);

  return (
    <div className="m-5 max-h-[90vh] overflow-y-scroll">
      <h1 className="text-lg font-medium">All Doctors</h1>
      <div className="w-full flex flex-wrap gap-4 pt-5 gap-y-6">
        {doctors && doctors.length > 0
          ? // Render Real Doctor Cards
            doctors.map((doc, index) => (
              <div
                className="border border-[#C9D8FF] rounded-xl max-w-56 overflow-hidden cursor-pointer group"
                // key={index}
                key={doc._id}
              >
                <img
                  className="bg-[#EAEFFF] group-hover:bg-primary transition-all duration-500"
                  src={doc.image}
                  alt=""
                />
                <div className="p-4">
                  <p className="text-[#262626] text-lg font-medium">
                    {doc.name}
                  </p>
                  <p className="text-[#5C5C5C] text-sm">{doc.speciality}</p>
                  {/* Avaibility Toggle Switch */}
                  <div className="mt-3 flex items-center gap-2 text-sm">
                    {/* Toggle Switch Container */}
                    <div
                      onClick={() => changeAvailability(doc._id)}
                      className={`relative inline-flex h-4 w-7 items-center rounded-full transition-colors duration-300 cursor-pointer shadow-xs ${
                        doc.available ? "bg-primary" : "bg-zinc-300"
                      }`}
                    >
                      {/* Toggle Circle (The Thumb) */}
                      <span
                        className={`inline-block h-2.5 w-2.5 transform rounded-full bg-white transition-transform duration-300 shadow-sm ${
                          doc.available ? "translate-x-3.5" : "translate-x-1"
                        }`}
                      />
                    </div>
                    {/* Avaibility Label */}
                    <p
                      className={`font-medium transition-colors ${
                        doc.available ? "text-primary" : "text-zinc-500"
                      }`}
                    >
                      {doc.available ? "Available" : "Unavailable"}
                    </p>
                  </div>
                </div>
              </div>
            ))
          : // Render Skeleton Loading Cards
            Array.from({ length: 10 }).map((_, index) => (
              <div
                key={index}
                className="border border-indigo-100 rounded-xl max-w-56 w-full overflow-hidden animate-pulse"
              >
                {/* Image Placeholder */}
                <div className="bg-slate-200 h-44 w-full"></div>
                <div className="p-4">
                  {/* Name Placeholder */}
                  <div className="h-6 w-3/4 bg-slate-200 rounded mb-2"></div>
                  {/* Speciality Placeholder */}
                  <div className="h-4 w-1/2 bg-slate-200 rounded mb-4"></div>

                  {/* Toggle Switch Placeholder */}
                  <div className="mt-3 flex items-center gap-2">
                    <div className="h-4 w-7 bg-slate-200 rounded-full"></div>
                    <div className="h-4 w-20 bg-slate-200 rounded"></div>
                  </div>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
};

export default DoctorsList;
