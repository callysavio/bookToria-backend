import jwt from "jsonwebtoken";
import httpStatus from "http-status";

const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    // 1. Check if header exists
    if (!authHeader) {
      return res.status(httpStatus.UNAUTHORIZED).json({
        statusCode: httpStatus.UNAUTHORIZED,
        success: false,
        message: "No authorization header provided",
      });
    }

    // 2. Validate Bearer format
    if (!authHeader.startsWith("Bearer ")) {
      return res.status(httpStatus.UNAUTHORIZED).json({
        statusCode: httpStatus.UNAUTHORIZED,
        success: false,
        message: "Invalid authorization format. Expected Bearer token",
      });
    }

    const token = authHeader.split(" ")[1];

    // 3. Validate token exists
    if (!token) {
      return res.status(httpStatus.UNAUTHORIZED).json({
        statusCode: httpStatus.UNAUTHORIZED,
        success: false,
        message: "Token missing",
      });
    }

    // 4. Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 5. Attach user to request
    req.user = decoded;

    next();
  } catch (error) {
    let message = "Invalid or expired token";

    if (error.name === "TokenExpiredError") {
      message = "Token expired. Please login again.";
    }

    if (error.name === "JsonWebTokenError") {
      message = "Invalid token";
    }

    return res.status(httpStatus.UNAUTHORIZED).json({
      statusCode: httpStatus.UNAUTHORIZED,
      success: false,
      message,
      error: error.message,
    });
  }
};

export default authMiddleware;
