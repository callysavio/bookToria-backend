import bcrypt from "bcryptjs";
import httpStatus from "http-status";
import User from "../../models/user.js";
import generateOtp from "../../utils/generateOtp.js";
import OTP from "../../models/otp.js";
import sendEmail from "../../utils/sendEmail.js";
import logger from "../../utils/logger.js";
//controller for user login
export const login = async (req, res) => {
  try {
    //1. Get user input
    const { email, password } = req.body;
    logger.info(`Login attempt: ${email}`);
    //2. Find user
    const user = await User.findOne({ email });

    if (!user) {
      logger.error(`User not found: ${email}`);
      return res.status(httpStatus.NOT_FOUND).json({
        statusCode: httpStatus.NOT_FOUND,
        message: "Invalid credentials",
      });
    }

    //3. Validate/compare password
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      logger.warn(`Wrong password attempt: ${email}`);
      return res.status(httpStatus.UNAUTHORIZED).json({
        statusCode: httpStatus.UNAUTHORIZED,
        success: false,
        message: "Invalid Credentials",
      });
    }

    //4. Generate OTP
    const otp = generateOtp();

    // 5. Delete old OTP if exists
    await OTP.deleteMany({ email });
    // 6. Save new OTP
    await OTP.create({
      email,
      otp,
      expiresAt: new Date(Date.now() + 5 * 60 * 1000),
    });

    // 7. Send OTP email
    await sendEmail(
      email,
      "Login OTP Code",
      `
       <div style="font-family: Arial;">
         <h2>OTP Verification</h2>
         <p>Your OTP code is:</p>
         <h1>${otp}</h1>
         <p>This OTP expires in 5 minutes.</p>
       </div>
     `,
    );

    logger.info(`OTP Successfully sent to: ${email}`);
    //8. Send response
    res.status(httpStatus.OK).json({
      statusCode: httpStatus.OK,
      success: true,
      message: "OTP sent to your email!",
    });
  } catch (error) {
    logger.error(`Login error: ${error.message}`);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      statusCode: httpStatus.INTERNAL_SERVER_ERROR,
      success: false,
      message: "An error occurred during login",
      error: error.message,
    });
  }
};
