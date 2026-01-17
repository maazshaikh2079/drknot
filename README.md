# DrKnot - Seamless Doctor Appointment Booking Platform

DrKnot is a premier digital health partner dedicated to revolutionizing healthcare access. By combining cutting-edge technology with a user-centric approach, we simplify the appointment booking process and empower patients and providers to manage their health journey with ease.

## 🚀 Vision
Our vision at **DrKnot** is to create a seamless healthcare experience for every user. We aim to bridge the gap between patients and healthcare providers, making it easier for you to access the care you need, when you need it.

<h3>🔴 Live: <a href="">drknot.vercel.app</a></h3>
<hr>

## 🔐 Credentials for Access

### Admin Access
- **Email**: `admin@dknot.com`
- **Password**: `admin123`

### Doctor Credentials

| Doctor ID | Email Address | Password |
| --- | --- | --- |
| **Doc 01** | `drrichard@demo.com` | `drrichard1234` |
| **Doc 02** | `dremily@demo.com` | `dremily1234` |
| **Doc 03** | `drsarah@demo.com` | `drsarah1234` |
| **Doc 04** | `drchristopherlee@demo.com` | `drchristopherlee1234` |
| **Doc 05** | `drjennifer@demo.com` | `drjennifer1234` |
| **Doc 06** | `drandrew@demo.com` | `drandrew1234` |
| **Doc 07** | `drchristopherdavis@demo.com` | `drchristopherdavis1234` |
| **Doc 08** | `drtimothy@demo.com` | `drtimothy1234` |
| **Doc 09** | `drava@demo.com` | `drava1234` |
| **Doc 10** | `drjeffrey@demo.com` | `drjeffrey1234` |
| **Doc 11** | `drzoe@demo.com` | `drzoe1234` |
| **Doc 12** | `drpatrick@demo.com` | `drpatrick1234` |
| **Doc 13** | `drchloe@demo.com` | `drchloe1234` |
| **Doc 14** | `drryan@demo.com` | `drryan1234` |
| **Doc 15** | `dramelia@demo.com` | `dramelia1234` |

---

## 🛠️ Project Structure

The project is divided into three main repositories:
- **Frontend**: Patient-facing portal for booking and profile management.
- **Admin/Doctor Panel**: Unified dashboard for administrators to manage doctors and for doctors to manage appointments.
- **Backend**: Robust Node.js API with MongoDB integration.

---

## 💻 Tech Stack

- **Frontend**: React.js, Tailwind CSS v4, React Router DOM
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (dknot_db)
- **State Management**: React Context API
- **Payments**: Razorpay Integration
- **Cloud Storage**: Cloudinary (for Doctor/User profile images)
- **Toast Notifications**: React-Toastify

---

## 🔑 Key Features

### 👤 Patient Features (Frontend)
- **Auth**: Register and Login functionality.
- **Doctor Discovery**: Filter doctors by speciality (General Physician, Gynecologist, etc.).
- **Booking**: Interactive slot selection for appointments.
- **Payments**: Integrated Razorpay for secure online payments.
- **Profile**: Manage personal data and appointment history.

### 🛡️ Admin Features (Admin Panel)
- **Dashboard**: Real-time stats on total doctors, appointments, and unique patients.
- **Doctor Management**: Add new doctors, upload profile photos, and set expertise.
- **Availability**: Toggle doctor availability with a modern micro-switch.
- **Appointment Control**: View and cancel all global appointments.

### 🩺 Doctor Features (Doctor Panel)
- **Personal Dashboard**: View total earnings and daily appointment count.
- **Appointment Management**: Mark appointments as 'Completed' or 'Cancelled'.
- **Profile Edit**: Update personal bio, consultation fees, and availability in real-time.

---

## 📡 All API Endpoints

#### **Admin Routes** (`/api/admin`)

* `POST /login`: Admin Authentication.
* `POST /add-doctor`: Create a new doctor profile with image upload.
* `GET /all-doctors`: Retrieve list of all doctors for admin management.
* `POST /change-availability`: Toggle doctor's availability status.
* `GET /appointments`: View all appointments across the platform.
* `POST /cancel-appointment`: Cancel an appointment as an admin.
* `GET /dashboard`: Fetch administrative dashboard statistics.

#### **Doctor Routes** (`/api/doctor`)

* `GET /list`: Publicly accessible list of doctors.
* `POST /login`: Doctor-specific login.
* `GET /appointments`: Retrieve appointments specifically for the logged-in doctor.
* `PATCH /cancel-appointment`: Cancel a patient appointment.
* `PATCH /complete-appointment`: Mark an appointment as successfully completed.
* `GET /dashboard`: Fetch performance and appointment metrics for the doctor.
* `GET /profile`: Get private profile data for the doctor.
* `POST /update-profile`: Update doctor bio, fees, and contact details.

#### **User (Patient) Routes** (`/api/user`)

* `POST /register`: New user registration.
* `POST /login`: User authentication.
* `GET /get-profile`: Fetch user profile information.
* `PATCH /update-profile`: Update user details and profile image.
* `POST /book-appointment`: Schedule a new appointment slot.
* `GET /appointments`: List all appointments booked by the user.
* `PATCH /cancel-appointment`: Cancel a booked appointment.
* `POST /payment-razorpay`: Initiate payment via Razorpay.
* `POST /verifyRazorpay`: Confirm and verify payment transaction.

---

## 🛠️ Local Setup Instructions

1. **Clone the project**
2. **BE Environment Variables**: Create a `.env` in the backend folder:
   ```env
   CURRENCY=INR
   ADMIN_EMAIL=admin@dknot.com
   ADMIN_PASSWORD=admin123
   JWT_SECRET=...
   MONGODB_URI=...
   DB_NAME=...
   CLOUDINARY_CLOUD_NAME=...
   CLOUDINARY_API_KEY=...
   CLOUDINARY_API_SECRET=...
   RAZORPAY_KEY_ID=...
   RAZORPAY_KEY_SECRET=...
   STRIPE_SECRET_KEY=...

3. **FE Environment Variables**: Create a `.env` in the frontend folder:
   ```env
   VITE_BACKEND_URL="http://localhost:4000"
   VITE_RAZORPAY_KEY_ID=...

4. **Admin Environment Variables**: Create a `.env` in the admin folder:
   ```env
   VITE_CURRENCY=₹
   VITE_BACKEND_URL="http://localhost:4000"
