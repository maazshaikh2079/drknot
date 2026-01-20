/**
 * NOTE: This is the file upload configuration for LOCAL DEVELOPMENT (Persistent).
 * Strategy: Disk Storage Engine.
 * * Reason: This setup is designed for traditional server environments where the
 * server has full write access to the local filesystem. It features:
 * 1. Persistent Storage: Saves files temporarily to a physical 'uploads' directory.
 * 2. Original Naming: Retains the original filename provided by the client.
 * 3. Local Cleanup: Ideal for testing upload logic where you want to manually
 * verify file integrity on your hard drive.
 */

import multer from "multer";

const storage = multer.diskStorage({
  filename: function (_, file, callback) {
    callback(null, file.originalname);
  },
});

const fileUpload = multer({ storage: storage });

export default fileUpload;
