import jwt from "jsonwebtoken";
import httpStatus, { status } from "http-status";

const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(httpStatus.NOT_FOUND).json({
        status: httpStatus.NOT_FOUND,
        message: "No token provided",
      });
    }

    // Bearer token
    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;

    next();
  } catch (error) {
    return res.status(httpStatus.UNAUTHORIZED).json({
      message: "Invalid token",
    });
  }
};

export { authMiddleware };
