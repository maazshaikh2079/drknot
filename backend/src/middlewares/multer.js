import multer from "multer";

const storage = multer.diskStorage({
  filename: function (req, file, callback) {
    callback(null, file.originalname);
  },
});

const fileUpload = multer({ storage: storage });

export default fileUpload;

// ----------------------------------------------------

// import multer from "multer";
// import { v4 as uuidv4 } from "uuid";

// const MIME_TYPE_MAP = {
//   "image/png": "png",
//   "image/jpeg": "jpeg",
//   "image/jpg": "jpg",
// };

// export const fileUpload = multer({
//   // limits: 500000, // 500 KB limit
//   storage: multer.diskStorage({
//     destination: (req, file, cb) => {
//       cb(null, "uploads/images");
//     },
//     filename: (req, file, cb) => {
//       const ext = MIME_TYPE_MAP[file.mimetype];
//       cb(null, `${uuidv4()}.${ext}`);
//     },
//   }),
//   fileFilter: (req, file, cb) => {
//     const isValid = !!MIME_TYPE_MAP[file.mimetype]; // `!!` does implicit type casting of undefined(null) to boolean(true/false)
//     let error = isValid ? null : new Error("Invalid mime type!");
//     cb(error, isValid);
//   },
// });

// ----------------------------------------------------

// import multer from "multer";

// const MIME_TYPE_MAP = {
//   "image/png": "png",
//   "image/jpeg": "jpeg",
//   "image/jpg": "jpg",
// };

// export const fileUpload = multer({
//   // limits: {
//   //   fileSize: 500000, // 500 KB limit
//   // },
//   // Switch to memoryStorage for Vercel/Serverless compatibility
//   storage: multer.memoryStorage(),
//   fileFilter: (req, file, cb) => {
//     const isValid = !!MIME_TYPE_MAP[file.mimetype];
//     let error = isValid ? null : new Error("Invalid mime type!");
//     cb(error, isValid);
//   },
// });
