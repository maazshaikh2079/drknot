import jwt from "jsonwebtoken";

// admin authentication middleware
const authAdmin = async (req, res, next) => {
  try {
    const { atoken } = req.headers; // atoken: Admin Token

    if (!atoken) {
      return res.json({
        success: false,
        message: "Not Authorized! Login Admin 1",
      });
    }

    const decodedToken = jwt.verify(atoken, process.env.JWT_SECRET);
    if (decodedToken !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
      return res.json({
        success: false,
        message: "Not Authorized! Login Admin 2",
      });
    }
    next();
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export default authAdmin;
