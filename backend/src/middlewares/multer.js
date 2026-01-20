/**
 * NOTE: This is the file upload configuration optimized for PRODUCTION (Vercel).
 * Strategy: In-Memory Buffer Management.
 * * Reason: Vercel functions operate on a read-only filesystem. This setup:
 * 1. Memory Storage: Replaces 'diskStorage' with 'memoryStorage' to bypass
 * the lack of writable disk space in serverless environments.
 * 2. Payload Optimization: Implements a 2MB limit to stay within Vercel's
 * 4. 5MB total request body constraints.
 * 3. Serverless Compatibility: Buffers images in RAM, allowing them to be
 * converted to Data URIs for streaming directly to Cloudinary.
 */

import multer from "multer";

const storage = multer.memoryStorage();

const fileUpload = multer({
  storage: storage,
  limits: {
    // fileSize: 500000, // 500 KB limit
    fileSize: 2 * 1024 * 1024, // 2MB limit (2,000,000 bytes)
  },
});

export default fileUpload;
