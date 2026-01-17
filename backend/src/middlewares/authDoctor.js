import jwt from "jsonwebtoken";

// doctor authentication middleware
const authDoctor = async (req, res, next) => {
  const { dtoken } = req.headers;

  if (!dtoken) {
    return res.json({
      success: false,
      message: "Not Authorized! Login Doctor",
    });
  }
  try {
    const decodedToken = jwt.verify(dtoken, process.env.JWT_SECRET);
    // req.body.docId = decodedToken.id;
    req.docData = { docId: decodedToken.id };
    next();
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export default authDoctor;
