import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext.jsx";

const RelatedDoctors = ({ speciality, docId }) => {
  const navigate = useNavigate();
  const { doctors } = useContext(AppContext);

  const [relDocs, setRelDocs] = useState([]);

  useEffect(() => {
    if (doctors.length > 0 && speciality) {
      const doctorsData = doctors.filter(
        (doc) => doc.speciality === speciality && doc._id !== docId
      );
      setRelDocs(doctorsData);
    }
  }, [doctors, docId, speciality]);

  return (
    <div className="flex flex-col items-center gap-4 my-16 text-gray-900">
      <h1 className="text-3xl font-medium">Related Doctors</h1>
      <p className="sm:w-1/3 text-center text-sm">
        Simply browse through our extensive list of trusted doctors.
      </p>

      {/* border */}
      <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6  pt-5 px-3 sm:px-0 ">
        {relDocs.map((doc, index) => (
          <div
            key={index}
            onClick={() => {
              navigate(`/appointment/${doc._id}`);
              window.scrollTo(0, 0);
            }}
            className="border border-blue-200 bg-white rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500  max-sm:mx-auto"
          >
            <img src={doc.image} alt="" className=" bg-blue-100" />
            <div className="p-4">
              <div
                className={`flex items-center gap-2 text-sm text-center ${doc.available ? "text-green-500" : "text-gray-500"}`}
              >
                <p
                  className={`w-2 h-2 rounded-full ${doc.available ? "bg-green-500" : "bg-gray-500"}`}
                ></p>
                <p>{doc.available ? "Available" : "Unavailable"}</p>
              </div>
              <p className="text-gray-900 text-lg font-medium">{doc.name}</p>
              <p className="text-gray-600 text-sm">{doc.speciality}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RelatedDoctors;
