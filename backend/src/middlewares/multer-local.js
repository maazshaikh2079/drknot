import multer from "multer";

const storage = multer.diskStorage({
  filename: function (_, file, callback) {
    callback(null, file.originalname);
  },
});

const fileUpload = multer({ storage: storage });

export default fileUpload;
