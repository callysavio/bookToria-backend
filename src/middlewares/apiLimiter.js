import rateLimit from "express-rate-limit";
import httpStatus from "http-status";

const windowMinutes = parseInt(1);
const maxRequests = parseInt(2);

export const apiLimiter = rateLimit({
  windowMs: windowMinutes * 60 * 1000, // Convert minutes to milliseconds
  max: maxRequests, // Limit each IP to 100 requests per windowMs
  message: {
    status: 429,
    message: "Too many requests, please try again later.",
  },
  standardHeaders: true, // return rate limit info in the headers
  legacyHeaders: false,
});
