import jwt from "jsonwebtoken";
<<<<<<< HEAD
import httpStatus, { status } from "http-status";

=======
import httpStatus from "http-status";
>>>>>>> 38e635b4e7ef2539f965217c7e409c84fe49e320
const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(httpStatus.NOT_FOUND).json({
<<<<<<< HEAD
        status: httpStatus.NOT_FOUND,
=======
        statusCode: httpStatus.NOT_FOUND,
>>>>>>> 38e635b4e7ef2539f965217c7e409c84fe49e320
        message: "No token provided",
      });
    }

    // Bearer token
    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
<<<<<<< HEAD

=======
    if (!decoded) {
      return res.status(httpStatus.UNAUTHORIZED).json({
        statusCode: httpStatus.UNAUTHORIZED,
        message: "Invalid or Expired Token",
      });
    }
>>>>>>> 38e635b4e7ef2539f965217c7e409c84fe49e320
    req.user = decoded;

    next();
  } catch (error) {
<<<<<<< HEAD
    return res.status(httpStatus.UNAUTHORIZED).json({
      message: "Invalid token",
=======
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      statusCode: httpStatus.INTERNAL_SERVER_ERROR,
      message: "An error occurred while verifying Token",
      error: error.message,
>>>>>>> 38e635b4e7ef2539f965217c7e409c84fe49e320
    });
  }
};

<<<<<<< HEAD
export { authMiddleware };
=======
export default authMiddleware;
>>>>>>> 38e635b4e7ef2539f965217c7e409c84fe49e320
