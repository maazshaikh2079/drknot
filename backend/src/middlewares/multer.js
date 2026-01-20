import multer from "multer";

const storage = multer.memoryStorage();

const fileUpload = multer({
    storage: storage,
    limits: {
        // fileSize: 500000, // 500 KB limit
        fileSize: 2 * 1024 * 1024, // 2MB limit (2,000,000 bytes)
    }
});

export default fileUpload;
