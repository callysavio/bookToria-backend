import httpStatus from "http-status";
import jwt from "jsonwebtoken";
import User from "../../models/user.js";
import OTP from "../../models/otp.js";

export const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const numericOtp = Number(otp);

    // 1. Find OTP record using the converted number
    const otpRecord = await OTP.findOne({ email, otp: numericOtp });

    if (!otpRecord) {
      return res.status(httpStatus.BAD_REQUEST).json({
        statusCode: httpStatus.BAD_REQUEST,
        success: false,
        message: "Invalid OTP",
      });
    }

    // 2. Check expiration
    if (otpRecord.expiresAt < new Date()) {
      return res.status(httpStatus.BAD_REQUEST).json({
        statusCode: httpStatus.BAD_REQUEST,
        success: false,
        message: "OTP expired",
      });
    }

    // 3. Find user
    const user = await User.findOne({ email });

    // 4. Generate JWT
    const accessToken = jwt.sign(
      {
        id: user._id,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRES_IN || "1d",
      },
    );

    // 5. Delete OTP after successful verification
    await OTP.deleteMany({ email });

    // 6. Response
    res.status(httpStatus.OK).json({
      statusCode: httpStatus.OK,
      success: true,
      message: "OTP verified successfully",
      data: {
        accessToken,
      },
    });
  } catch (error) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      statusCode: httpStatus.INTERNAL_SERVER_ERROR,
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};
