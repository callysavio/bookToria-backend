import rateLimit from "express-rate-limit";
import httpStatus from "http-status";

const windowMinutes = parseInt(5);
const maxRequests = parseInt(2);

const apiLimiter = rateLimit({
  windowMs: windowMinutes * 60 * 1000, // convert minutes → ms
  max: maxRequests,
  message: {
    status: httpStatus.TOO_MANY_REQUESTS,
    message: "Too many requests, please try again later.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

export { apiLimiter };
