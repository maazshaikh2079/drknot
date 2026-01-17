import { createContext } from "react";

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const currency = import.meta.env.VITE_CURRENCY;
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

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

  // // Function to calculate the age eg. ( 20_01_2000 => 26 )
  // const calculateAge = (dob) => {
  //   const today = new Date();
  //   const birthDate = new Date(dob);
  //   let age = today.getFullYear() - birthDate.getFullYear();
  //   return age;
  // };

  // Function to calculate the age accurately (e.g., 20_01_2000 => 26)
  const calculateAge = (dob) => {
    const today = new Date();
    const birthDate = new Date(dob);

    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    // If the current month is before the birth month,
    // or if it's the birth month but the current day is before the birth day,
    // subtract one year from the age.
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age;
  };



  const value = {
    backendUrl,
    currency,
    slotDateFormat,
    calculateAge,
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export default AppContextProvider;
