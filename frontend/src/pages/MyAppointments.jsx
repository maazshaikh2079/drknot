import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
// import razorpay from "razorpay";

import { AppContext } from "../context/AppContext.jsx";

const MyAppointments = () => {
  const navigate = useNavigate();

  // const { doctors } = useContext(AppContext);
  const { backendUrl, token, getDoctorsData } = useContext(AppContext);

  const [appointments, setAppointments] = useState([]);
  // const [payment, setPayment] = useState("");

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  // Function to format the date eg. ( 20_01_2000 => 20 Jan 2000 )
  const slotDateFormat = (slotDate) => {
    const dateArray = slotDate.split("_");
    return (
      dateArray[0] + " " + months[Number(dateArray[1])] + " " + dateArray[2]
    );
  };

  // ------ Functions for Getting User Appointments Data Using API ------
  const getUserAppointments = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/user/appointments", {
        headers: { token },
      });
      setAppointments(data.appointments.reverse());
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (token) {
      getUserAppointments();
    }
  }, [token]);
  // -------------------------------------

  // ------ Function to cancel appointment Using API ------
  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.patch(
        backendUrl + "/api/user/cancel-appointment",
        { appointmentId },
        { headers: { token } }
      );

      if (data.success) {
        toast.success(data.message);
        getUserAppointments();
        getDoctorsData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  // -------------------------------------

  // ------ Functions for razorpay payment ------

  const initPay = (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: "Appointment Payment",
      description: "Appoint ment Payment",
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response) => {
        console.log("Razorpay payment response:-");
        console.log(response); // { razorpay_payment_id: '', razorpay_order_id: '', razorpay_signature: '' }

        // verify razorpay payment and mark `payment` field `true` in appointment document
        try {
          const { data } = await axios.post(
            // url:
            backendUrl + "/api/user/verifyRazorpay",
            // body:
            response, // { razorpay_payment_id: '', razorpay_order_id: '', razorpay_signature: '' }
            // headers:
            { headers: { token } }
          );
          if (data.success) {
            navigate("/my-appointments");
            getUserAppointments();
            toast.success(data.message);
          }
        } catch (error) {
          console.log(error);
          toast.error(error.message);
        }
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const appointmentRazorpay = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        // url:
        backendUrl + "/api/user/payment-razorpay",
        // body:
        { appointmentId },
        // headers:
        { headers: { token } }
      );

      if (data.success) {
        console.log(
          "log> MyAppointments.jsx - appointmentRazorpay() - data.order:-"
        );
        console.log(data.order);
        initPay(data.order);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  // -------------------------------------

  // Return if no appointments
  if (!appointments.length) {
    return (
      <>
        <p className="pb-3 mt-12 font-medium text-zinc-700 border-b border-stone-400">
          My appointments
        </p>
        <div className="min-h-[60vh] flex items-center justify-center">
          <p className="text-gray-500 ">No appointments booked</p>
        </div>
      </>
    );
  }

  return (
    <div>
      <p className="pb-3 mt-12 font-medium text-zinc-700 border-b border-stone-400">
        My appointments
      </p>
      <div className="">
        {/* {doctors.slice(0, 2).map((doctors, index) => ( */}
        {appointments.map((appointment, index) => (
          <div
            // key={index}
            key={appointment._id}
            className="grid grid-cols-[1fr_2fr] gap-4 md:flex sm:gap-6 py-2 border-b border-stone-400 "
          >
            <div className="">
              <img
                src={appointment.docData.image}
                alt=""
                className="w-32 rounded-xl bg-indigo-50 max-md:w-auto max-md:h-auto"
              />
            </div>
            <div className=" flex-1 text-sm text-zinc-600">
              <p className="text-neutral-800 font-semibold">
                {appointment.docData.name}
              </p>
              <p>{appointment.docData.speciality}</p>
              <p className="text-zinc-700 font-medium mt-1">Address:</p>
              <p className="text-xs">{appointment.docData.address.line1}</p>
              <p className="text-xs">{appointment.docData.address.line2}</p>
              <p className="text-xs mt-1">
                <span className="text-sm text-neutral-700 font-medium">
                  Date & Time:{" "}
                </span>
                {slotDateFormat(appointment.slotDate)} | {appointment.slotTime}
              </p>
            </div>

            <div className=""></div>

            {/* Here-> */}
            <div className=" flex flex-col gap-2 justify-end">
              {/* <button
                className="text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded border-stone-400 hover:bg-primary hover:text-white transition-all duration-300"
                on
              >
                Pay Online
              </button> */}

              {!appointment.cancelled &&
                !appointment.payment &&
                !appointment.isCompleted && (
                  <button
                    onClick={() => appointmentRazorpay(appointment._id)}
                    className="text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded border-stone-400  hover:bg-primary hover:text-white transition-all duration-300"
                  >
                    Pay Online
                  </button>
                )}

              {!appointment.cancelled &&
                appointment.payment &&
                !appointment.isCompleted && (
                  <button className="sm:min-w-48 py-2 border border-stone-400 rounded text-stone-500 bg-[#EAEFFF]">
                    Paid
                  </button>
                )}

              {/* <button className="text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded border-stone-400 hover:bg-red-600 hover:text-white transition-all duration-300">
                Cancel appointment
              </button> */}

              {!appointment.cancelled && !appointment.isCompleted && (
                <button
                  onClick={() => cancelAppointment(appointment._id)}
                  className="text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded border-stone-400 hover:bg-red-600 hover:text-white transition-all duration-300"
                >
                  Cancel appointment
                </button>
              )}

              {appointment.cancelled && !appointment.isCompleted && (
                <button className="sm:min-w-48 py-2 border border-red-500 rounded text-red-500">
                  Appointment cancelled
                </button>
              )}

              {!appointment.cancelled && appointment.isCompleted && (
                <button className="sm:min-w-48 py-2 border border-green-500 rounded text-green-500">
                  Appointment completed
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyAppointments;
