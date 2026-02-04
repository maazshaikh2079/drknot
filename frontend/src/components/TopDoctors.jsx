import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { AppContext } from "../context/AppContext";

const TopDoctors = () => {
  const navigate = useNavigate();
  const { doctors } = useContext(AppContext);

  // Skeleton Component for loading state
  const DoctorSkeleton = () => (
    <div className="border border-blue-200 rounded-xl overflow-hidden animate-pulse max-sm:w-2/3 max-sm:m-auto">
      <div className="bg-slate-200 h-60 w-full"></div>
      <div className="p-4">
        <div className="flex items-center gap-2 text-sm text-center mb-2">
          <div className="w-2 h-2 rounded-full bg-slate-200"></div>
          <div className="h-4 w-16 bg-slate-200 rounded"></div>
        </div>
        <div className="h-6 w-3/4 bg-slate-200 rounded mb-2"></div>
        <div className="h-4 w-1/2 bg-slate-200 rounded"></div>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col items-center gap-4 my-16 text-gray-900 md:mx-10">
      <h1 className="text-3xl font-medium">Top Doctors to Book</h1>
      <p className="sm:w-1/3 text-center text-sm">
        Simply browse through our extensive list of trusted doctors.
      </p>

      {/* Grid of top doctors */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pt-5 gap-y-6 px-3 sm:px-0">
        {doctors && doctors.length > 0
          ? // Render Actual Data
            doctors.slice(0, 8).map((doc, index) => (
              <div
                // key={index}
                key={doc._id}
                onClick={() => {
                  navigate(`/appointment/${doc._id}`);
                  window.scrollTo(0, 0);
                }}
                className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500 max-sm:w-2/3 max-sm:m-auto"
              >
                <img
                  className=" bg-blue-50 max-sm:w-full"
                  src={doc.image}
                  alt=""
                />
                <div className="p-4">
                  <div
                    className={`flex items-center gap-2 text-sm text-center ${
                      doc.available ? "text-green-500" : "text-gray-500"
                    }`}
                  >
                    <p
                      className={`w-2 h-2 rounded-full ${
                        doc.available ? "bg-green-500" : "bg-gray-500"
                      }`}
                    ></p>
                    <p>{doc.available ? "Available" : "Unavailable"}</p>
                  </div>
                  <p className="text-gray-900 text-lg font-medium">
                    {doc.name}
                  </p>
                  <p className="text-gray-600 text-sm">{doc.speciality}</p>
                </div>
              </div>
            ))
          : // Render Skeleton Loaders while waiting for data
            Array.from({ length: 8 }).map((_, index) => (
              <DoctorSkeleton key={index} />
            ))}
      </div>
      {/* ---------------------- */}

      <button
        onClick={() => {
          navigate("/doctors");
          window.scrollTo(0, 0);
        }}
        className="bg-blue-50 text-gray-600 px-12 py-3 rounded-full mt-10"
      >
        more
      </button>
    </div>
  );
};

export default TopDoctors;
