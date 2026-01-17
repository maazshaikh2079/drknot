import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { AppContext } from "../context/AppContext.jsx";
import { useContext } from "react";

const Doctors = () => {
  const navigate = useNavigate();

  const { speciality } = useParams();

  const { doctors } = useContext(AppContext);

  const [showFilter, setShowFilter] = useState(false);
  const [filterDoc, setFilterDoc] = useState([]);

  const applyFilter = () => {
    if (speciality) {
      setFilterDoc(doctors.filter((doc) => doc.speciality === speciality));
    } else {
      setFilterDoc(doctors);
    }
  };

  useEffect(() => {
    applyFilter();
  }, [doctors, speciality]);

  return (
    <div>
      <p className="text-gray-600">Browse through the doctors specialist.</p>

      {/* border */}
      <div className=" flex flex-col sm:flex-row items-start gap-5 mt-5">
        {/* Mobile view filter button */}
        <button
          onClick={() => setShowFilter(!showFilter)}
          className={`sm:hidden py-1 px-3 border border-zinc-300 rounded text-sm transition-all ${showFilter ? "bg-primary text-white" : ""}`}
        >
          Filters
        </button>

        {/* Filter aside-bar */}
        <ul
          className={`${showFilter ? "flex" : "hidden sm:flex"} flex-col gap-4 text-sm text-gray-600`}
        >
          <li
            onClick={() =>
              speciality === "General-Physician"
                ? navigate("/doctors")
                : navigate("/doctors/General-Physician")
            }
            className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "General-Physician" ? "bg-indigo-100 text-black" : ""}`}
          >
            General Physician
          </li>
          <li
            onClick={() =>
              speciality === "Gynecologist"
                ? navigate("/doctors")
                : navigate("/doctors/Gynecologist")
            }
            className={`w-[94vw] sm:w-auto pr-16 pl-3 py-1.5 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "Gynecologist" ? "bg-indigo-100 text-black" : ""}`}
          >
            Gynecologist
          </li>
          <li
            onClick={() =>
              speciality === "Dermatologist"
                ? navigate("/doctors")
                : navigate("/doctors/Dermatologist")
            }
            className={`w-[94vw] sm:w-auto pr-16 pl-3 py-1.5 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "Dermatologist" ? "bg-indigo-100 text-black" : ""}`}
          >
            Dermatologist
          </li>
          <li
            onClick={() =>
              speciality === "Pediatricians"
                ? navigate("/doctors")
                : navigate("/doctors/Pediatricians")
            }
            className={`w-[94vw] sm:w-auto pr-16 pl-3 py-1.5 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "Pediatricians" ? "bg-indigo-100 text-black" : ""}`}
          >
            Pediatricians
          </li>
          <li
            onClick={() =>
              speciality === "Neurologist"
                ? navigate("/doctors")
                : navigate("/doctors/Neurologist")
            }
            className={`w-[94vw] sm:w-auto pr-16 pl-3 py-1.5 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "Neurologist" ? "bg-indigo-100 text-black" : ""}`}
          >
            Neurologist
          </li>
          <li
            onClick={() =>
              speciality === "Gastroenterologist"
                ? navigate("/doctors")
                : navigate("/doctors/Gastroenterologist")
            }
            className={`w-[94vw] sm:w-auto pr-16 pl-3 py-1.5 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "Gastroenterologist" ? "bg-indigo-100 text-black" : ""}`}
          >
            Gastroenterologist
          </li>
        </ul>

        {/* filtered doctors display grind */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-6">
          {filterDoc.map((doc, index) => (
            <div
              key={index}
              onClick={() => {
                navigate(`/appointment/${doc._id}`);
                window.scrollTo(0, 0);
              }}
              className="border border-indigo-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500 max-sm:w-2/3 max-sm:m-auto"
            >
              <img src={doc.image} alt="" className="bg-indigo-50" />
              <div className="p-4">
                <div
                  className={`flex items-center gap-2 text-sm text-center ${doc.available ? "text-green-500" : "text-gray-500"}`}
                >
                  <p
                    className={`w-2 h-2 rounded-full ${doc.available ? "bg-green-500" : "bg-gray-500"}`}
                  ></p>
                  <p>{doc.available ? "Available" : "Unavailable"}</p>
                </div>
                <p className="text-neutral-800 text-lg font-medium">
                  {doc.name}
                </p>
                <p className="text-zinc-600 text-sm">{doc.speciality}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Doctors;
