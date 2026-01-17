import appointment_img from "./appointment_img.png";
import header_img from "./header_img.png";
import group_profiles from "./group_profiles.png";
import profile_pic from "./profile_pic.png";
import contact_image from "./contact_image.png";
import about_image from "./about_image.png";

// import logo from "./logo.svg";
import logo from "./logo-title-removebg-preview.png";
import dropdown_icon from "./dropdown_icon.svg";
import menu_icon from "./menu_icon.svg";
import cross_icon from "./cross_icon.png";
import chats_icon from "./chats_icon.svg";
import verified_icon from "./verified_icon.svg";
import arrow_icon from "./arrow_icon.svg";
import info_icon from "./info_icon.svg";
import upload_icon from "./upload_icon.png";
import stripe_logo from "./stripe_logo.png";
import razorpay_logo from "./razorpay_logo.png";

import doc1 from "./doc1.png";
import doc2 from "./doc2.png";
import doc3 from "./doc3.png";
import doc4 from "./doc4.png";
import doc5 from "./doc5.png";
import doc6 from "./doc6.png";
import doc7 from "./doc7.png";
import doc8 from "./doc8.png";
import doc9 from "./doc9.png";
import doc10 from "./doc10.png";
import doc11 from "./doc11.png";
import doc12 from "./doc12.png";
import doc13 from "./doc13.png";
import doc14 from "./doc14.png";
import doc15 from "./doc15.png";

import Dermatologist from "./Dermatologist.svg";
import Gastroenterologist from "./Gastroenterologist.svg";
import General_physician from "./General_physician.svg";
import Gynecologist from "./Gynecologist.svg";
import Neurologist from "./Neurologist.svg";
import Pediatricians from "./Pediatricians.svg";

// export const assets = {
//   appointment_img,
//   header_img,
//   group_profiles,
//   logo,
//   chats_icon,
//   verified_icon,
//   info_icon,
//   profile_pic,
//   arrow_icon,
//   contact_image,
//   about_image,
//   menu_icon,
//   cross_icon,
//   dropdown_icon,
//   upload_icon,
//   stripe_logo,
//   razorpay_logo,
// };

export {
  appointment_img,
  header_img,
  group_profiles,
  logo,
  chats_icon,
  verified_icon,
  info_icon,
  profile_pic,
  arrow_icon,
  contact_image,
  about_image,
  menu_icon,
  cross_icon,
  dropdown_icon,
  upload_icon,
  stripe_logo,
  razorpay_logo,
};

export const specialityData = [
  {
    speciality: "General-Physician",
    image: General_physician,
  },
  {
    speciality: "Gynecologist",
    image: Gynecologist,
  },
  {
    speciality: "Dermatologist",
    image: Dermatologist,
  },
  {
    speciality: "Pediatricians",
    image: Pediatricians,
  },
  {
    speciality: "Neurologist",
    image: Neurologist,
  },
  {
    speciality: "Gastroenterologist",
    image: Gastroenterologist,
  },
];

export const doctors = [
  {
    _id: "doc1",
    name: "Dr. Richard James",
    image: doc1,
    speciality: "General-Physician",
    degree: "MBBS",
    experience: "4 Years",
    about:
      "Dr. Richard James has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies as a General Physician.",
    fees: 50,
    address: {
      line1: "17th Cross, Richmond",
      line2: "Circle, Ring Road, London",
    },
    string_address:
      '{"line1":"17th Cross, Richmond","line2":"Circle, Ring Road, London"}',
  },
  {
    _id: "doc2",
    name: "Dr. Emily Larson",
    image: doc2,
    speciality: "Gynecologist",
    degree: "MBBS",
    experience: "3 Years",
    about:
      "Dr. Emily Larson is dedicated to women's health, offering expert care in gynecology with a focus on comprehensive wellness and patient-centered treatment strategies.",
    fees: 60,
    address: {
      line1: "27th Cross, Richmond",
      line2: "Circle, Ring Road, London",
    },
    string_address:
      '{"line1":"27th Cross, Richmond","line2":"Circle, Ring Road, London"}',
  },
  {
    _id: "doc3",
    name: "Dr. Sarah Patel",
    image: doc3,
    speciality: "Dermatologist",
    degree: "MBBS",
    experience: "1 Years",
    about:
      "Dr. Sarah Patel specializes in dermatological care, focusing on skin health, early diagnosis of skin conditions, and providing effective aesthetic and medical treatments.",
    fees: 30,
    address: {
      line1: "37th Cross, Richmond",
      line2: "Circle, Ring Road, London",
    },
    string_address:
      '{"line1":"37th Cross, Richmond","line2":"Circle, Ring Road, London"}',
  },
  {
    _id: "doc4",
    name: "Dr. Christopher Lee",
    image: doc4,
    speciality: "Pediatricians",
    degree: "MBBS",
    experience: "2 Years",
    about:
      "Dr. Christopher Lee is passionate about pediatric care, ensuring that infants, children, and adolescents receive the best possible medical attention and preventive health guidance.",
    fees: 40,
    address: {
      line1: "47th Cross, Richmond",
      line2: "Circle, Ring Road, London",
    },
    string_address:
      '{"line1":"47th Cross, Richmond","line2":"Circle, Ring Road, London"}',
  },
  {
    _id: "doc5",
    name: "Dr. Jennifer Garcia",
    image: doc5,
    speciality: "Neurologist",
    degree: "MBBS",
    experience: "4 Years",
    about:
      "Dr. Jennifer Garcia focuses on diagnosing and treating complex neurological disorders, committed to improving patient quality of life through advanced medical strategies.",
    fees: 50,
    address: {
      line1: "57th Cross, Richmond",
      line2: "Circle, Ring Road, London",
    },
    string_address:
      '{"line1":"57th Cross, Richmond","line2":"Circle, Ring Road, London"}',
  },
  {
    _id: "doc6",
    name: "Dr. Andrew Williams",
    image: doc6,
    speciality: "Neurologist",
    degree: "MBBS",
    experience: "4 Years",
    about:
      "Dr. Andrew Williams provides specialized care in neurology, with a strong emphasis on early intervention and personalized treatment plans for nervous system health.",
    fees: 50,
    address: {
      line1: "57th Cross, Richmond",
      line2: "Circle, Ring Road, London",
    },
    string_address:
      '{"line1":"57th Cross, Richmond","line2":"Circle, Ring Road, London"}',
  },
  {
    _id: "doc7",
    name: "Dr. Christopher Davis",
    image: doc7,
    speciality: "General-Physician",
    degree: "MBBS",
    experience: "4 Years",
    about:
      "Dr. Christopher Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.",
    fees: 50,
    address: {
      line1: "17th Cross, Richmond",
      line2: "Circle, Ring Road, London",
    },
    string_address:
      '{"line1":"17th Cross, Richmond","line2":"Circle, Ring Road, London"}',
  },
  {
    _id: "doc8",
    name: "Dr. Timothy White",
    image: doc8,
    speciality: "Gynecologist",
    degree: "MBBS",
    experience: "3 Years",
    about:
      "Dr. Timothy White brings extensive knowledge to gynecological health, focusing on patient education and the delivery of high-quality reproductive medical care.",
    fees: 60,
    address: {
      line1: "27th Cross, Richmond",
      line2: "Circle, Ring Road, London",
    },
    string_address:
      '{"line1":"27th Cross, Richmond","line2":"Circle, Ring Road, London"}',
  },
  {
    _id: "doc9",
    name: "Dr. Ava Mitchell",
    image: doc9,
    speciality: "Dermatologist",
    degree: "MBBS",
    experience: "1 Years",
    about:
      "Dr. Ava Mitchell is committed to excellence in dermatology, providing modern solutions for skin care and focusing on the long-term dermatological health of her patients.",
    fees: 30,
    address: {
      line1: "37th Cross, Richmond",
      line2: "Circle, Ring Road, London",
    },
    string_address:
      '{"line1":"37th Cross, Richmond","line2":"Circle, Ring Road, London"}',
  },
  {
    _id: "doc10",
    name: "Dr. Jeffrey King",
    image: doc10,
    speciality: "Pediatricians",
    degree: "MBBS",
    experience: "2 Years",
    about:
      "Dr. Jeffrey King provides compassionate pediatric services, specializing in the physical and emotional development of children from birth through adolescence.",
    fees: 40,
    address: {
      line1: "47th Cross, Richmond",
      line2: "Circle, Ring Road, London",
    },
    string_address:
      '{"line1":"47th Cross, Richmond","line2":"Circle, Ring Road, London"}',
  },
  {
    _id: "doc11",
    name: "Dr. Zoe Kelly",
    image: doc11,
    speciality: "Neurologist",
    degree: "MBBS",
    experience: "4 Years",
    about:
      "Dr. Zoe Kelly is dedicated to neurological excellence, employing the latest diagnostic tools to treat brain and spinal cord disorders with precision and care.",
    fees: 50,
    address: {
      line1: "57th Cross, Richmond",
      line2: "Circle, Ring Road, London",
    },
    string_address:
      '{"line1":"57th Cross, Richmond","line2":"Circle, Ring Road, London"}',
  },
  {
    _id: "doc12",
    name: "Dr. Patrick Harris",
    image: doc12,
    speciality: "Neurologist",
    degree: "MBBS",
    experience: "4 Years",
    about:
      "Dr. Patrick Harris specializes in neurology, offering comprehensive care for chronic neurological conditions and focusing on innovative recovery strategies.",
    fees: 50,
    address: {
      line1: "57th Cross, Richmond",
      line2: "Circle, Ring Road, London",
    },
    string_address:
      '{"line1":"57th Cross, Richmond","line2":"Circle, Ring Road, London"}',
  },
  {
    _id: "doc13",
    name: "Dr. Chloe Evans",
    image: doc13,
    speciality: "General-Physician",
    degree: "MBBS",
    experience: "4 Years",
    about:
      "Dr. Chloe Evans provides holistic general medical services, emphasizing the importance of preventive health screenings and effective primary care management.",
    fees: 50,
    address: {
      line1: "17th Cross, Richmond",
      line2: "Circle, Ring Road, London",
    },
    string_address:
      '{"line1":"17th Cross, Richmond","line2":"Circle, Ring Road, London"}',
  },
  {
    _id: "doc14",
    name: "Dr. Ryan Martinez",
    image: doc14,
    speciality: "Gynecologist",
    degree: "MBBS",
    experience: "3 Years",
    about:
      "Dr. Ryan Martinez offers expert gynecological care, committed to providing a supportive environment for women's health concerns and surgical needs.",
    fees: 60,
    address: {
      line1: "27th Cross, Richmond",
      line2: "Circle, Ring Road, London",
    },
    string_address:
      '{"line1":"27th Cross, Richmond","line2":"Circle, Ring Road, London"}',
  },
  {
    _id: "doc15",
    name: "Dr. Amelia Hill",
    image: doc15,
    speciality: "Dermatologist",
    degree: "MBBS",
    experience: "1 Years",
    about:
      "Dr. Amelia Hill focuses on clinical dermatology, helping patients manage skin conditions through evidence-based treatments and proactive skin health education.",
    fees: 30,
    address: {
      line1: "37th Cross, Richmond",
      line2: "Circle, Ring Road, London",
    },
    string_address:
      '{"line1":"37th Cross, Richmond","line2":"Circle, Ring Road, London"}',
  },
];
