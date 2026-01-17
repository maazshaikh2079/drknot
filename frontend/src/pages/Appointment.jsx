import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

import { AppContext } from "../context/AppContext.jsx";
import { info_icon, verified_icon } from "../assets/assets.js";
import RelatedDoctors from "../components/RelatedDoctors.jsx";

const Appointment = () => {
  const navigate = useNavigate();

  const { docId } = useParams();
  const { doctors, currencySymbol, backendUrl, token, getDoctorsData } =
    useContext(AppContext);

  const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  const [docInfo, setDocInfo] = useState(null);

  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0); // For UI Slots / Days
  const [slotTime, setSlotTime] = useState(""); // For Printing / Alerting

  // Functions for Doctor Details :-
  const fetchDocInfo = async () => {
    const docInfo = doctors.find((doc) => doc._id === docId);
    setDocInfo(docInfo);
  };

  useEffect(() => {
    if (doctors.length > 0) {
      fetchDocInfo();
    }
  }, [doctors, docId]);
  // -------------------------------------

  // Functions for Booking slot :-
  const getAvailableSlots = async () => {
    setDocSlots([]);

    // getting current date
    let today = new Date();

    // loop for 7 days slots
    for (let i = 0; i < 7; i++) {
      // getting date with index
      let currentDate = new Date(today);

      currentDate.setDate(today.getDate() + i);

      // setting end time of the date with index
      let endTime = new Date();
      endTime.setDate(today.getDate() + i);
      endTime.setHours(21, 0, 0, 0);

      // dynamically setting starting hours for today
      if (today.getDate() === currentDate.getDate()) {
        currentDate.setHours(
          currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10
        );
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
      } else {
        currentDate.setHours(10);
        currentDate.setMinutes(0);
      }

      let timeSlots = [];

      // loop for 22 time slots (from: 10:00 AM to 08:30 PM)
      // Keep adding slots until 9 PM (21 hrs) (endTime).
      while (currentDate < endTime) {
        let formattedTime = currentDate.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });

        let day = currentDate.getDate();
        let month = currentDate.getMonth() + 1;
        let year = currentDate.getFullYear();

        const slotDate = day + "_" + month + "_" + year;
        const slotTime = formattedTime;

        const isSlotAvailable =
          docInfo.slots_booked[slotDate] &&
          docInfo.slots_booked[slotDate].includes(slotTime)
            ? false
            : true;

        // // Add slot to array
        // timeSlots.push({
        //   datetime: new Date(currentDate),
        //   time: formattedTime,
        // });

        // Add available(unbooked) time slots to array `timeSlots`
        if (isSlotAvailable) {
          timeSlots.push({
            datetime: new Date(currentDate),
            time: formattedTime,
          });
        }

        // Increment current time by 30 minutes
        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }

      // if (timeSlots.length > 0):
      timeSlots.length && setDocSlots((prev) => [...prev, timeSlots]);
    }
  };

  // Automatically select the first available slot when the day (slotIndex) changes
  useEffect(() => {
    if (
      docSlots.length > 0 &&
      docSlots[slotIndex] &&
      docSlots[slotIndex].length > 0
    ) {
      setSlotTime(docSlots[slotIndex][0].time);
    }
  }, [docSlots, slotIndex]);

  // const bookAppointment = async () => {
  //   const date = docSlots[slotIndex][0].datetime;

  //   let day = date.getDate();
  //   let month = date.getMonth() + 1; // JAN = 0 and DEC = 11
  //   let year = date.getFullYear();

  //   const slotDate = `${day}-${month}-${year}`;
  //   console.log(slotDate, slotTime);
  //   alert(`Appointment Booked!\nDate: ${slotDate}, Time: ${slotTime}`);
  // };

  const bookAppointment = async () => {
    if (!token) {
      toast.warning("Login to book appointment");
      return navigate("/auth/Sign-In");
    }

    const date = docSlots[slotIndex][0].datetime;

    let day = date.getDate();
    let month = date.getMonth() + 1; // JAN = 0 and DEC = 11
    let year = date.getFullYear();

    const slotDate = day + "_" + month + "_" + year; // Eg. 12_10_2005

    try {
      const { data } = await axios.post(
        backendUrl + "/api/user/book-appointment",
        { docId, slotDate, slotTime },
        { headers: { token } }
      );
      if (data.success) {
        toast.success(data.message);
        getDoctorsData();
        navigate("/my-appointments");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (docInfo) {
      getAvailableSlots();
    }
  }, [docInfo]);
  // -------------------------------------

  return docInfo ? (
    <div>
      {/* ---------- Doctor Details Card ----------- */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div>
          <img
            src={docInfo.image}
            alt=""
            className="bg-primary w-full sm:max-w-72 rounded-lg"
          />
        </div>

        <div className="flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0">
          {/* ----- Doc Info : name, degree, experience ----- */}
          <p className="flex items-center gap-2 text-2xl font-medium text-gray-900">
            {docInfo.name}
            <img src={verified_icon} alt="" className="w-5" />
          </p>
          <div className="flex items-center gap-2 text-sm mt-1 text-gray-600">
            <p>
              {docInfo.degree} - {docInfo.speciality}
            </p>
            <button className="py-0.5 px-2 border text-xs rounded-full">
              {docInfo.experience}
            </button>
          </div>

          {/* ----- Doc About ----- */}
          <div>
            <p className="flex items-center gap-1 text-sm font-medium text-gray-900 mt-3">
              About <img className="w-3" src={info_icon} alt="" />
            </p>
            <p className="text-sm text-gray-500 max-w-[700px] mt-1">
              {docInfo.about}
            </p>
          </div>

          <p className="text-gray-500 font-medium mt-4">
            Appointment fee:{" "}
            <span className="text-gray-600">
              {currencySymbol}
              {docInfo.fees}
            </span>
          </p>

          <div
            className={`mt-5 flex items-center gap-2 text-md font-medium text-center ${docInfo.available ? "text-green-500" : "text-gray-500"}`}
          >
            <p
              className={`w-2 h-2 rounded-full ${docInfo.available ? "bg-green-500" : "bg-gray-500"}`}
            ></p>
            <p>{docInfo.available ? "Available" : "Unavailable"}</p>
          </div>
        </div>
      </div>
      {/* ----------------------------------- */}

      {/* ------------- Booking slots ------------- */}
      <div className="sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700">
        <p>Booking slots</p>
        <div className="flex gap-3 items-center w-full overflow-x-scroll mt-4">
          {
            // docSlots = [ [{}, {}, ...], [{}, {}, ...], ... [{}, {}, ...] ]
            docSlots.length &&
              docSlots.map((item, index) => (
                <div
                  key={index}
                  onClick={() => setSlotIndex(index)}
                  className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${slotIndex === index ? "bg-primary text-white" : "border border-gray-200"}`}
                >
                  <p>{item[0] && daysOfWeek[item[0].datetime.getDay()]}</p>
                  <p>{item[0] && item[0].datetime.getDate()}</p>
                </div>
              ))
          }
        </div>

        <div className="flex items-center gap-3 w-full overflow-x-scroll mt-4">
          {docSlots.length &&
            docSlots[slotIndex].map((item, index) => (
              <p
                key={index}
                onClick={() => setSlotTime(item.time)}
                className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${item.time === slotTime ? "bg-primary text-white" : "text-gray-400 border border-gray-300"}`}
              >
                {/* {item.time.toUpperCase()} */}
                {item.time}
              </p>
            ))}
        </div>

        <button
          onClick={bookAppointment}
          className="bg-primary text-white text-sm font-light px-14 py-3 rounded-full my-6"
        >
          Book an Appointment
        </button>
      </div>
      {/* ----------------------------------- */}

      {/* Listing Related Doctors */}
      <RelatedDoctors speciality={docInfo.speciality} docId={docId} />
    </div>
  ) : null;
};

export default Appointment;
