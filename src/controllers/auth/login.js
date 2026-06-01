import bcrypt from "bcryptjs";
import httpStatus from "http-status";
import User from "../../models/user.js";
import jwt from "jsonwebtoken";
//controller for user login
export const login = async (req, res) => {
  try {
    //1. Get user input
    const { email, password } = req.body;
    //2. Find user
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(httpStatus.NOT_FOUND).json({
        statusCode: httpStatus.NOT_FOUND,
        message: "Invalid credentials",
      });
    }

    //3. Validate/compare password
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(httpStatus.UNAUTHORIZED).json({
        statusCode: httpStatus.UNAUTHORIZED,
        success: false,
        message: "Invalid Credentials",
      });
    }

    //4. Generate JWT token
    const accessToken = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN },
    );

    //5. Send response
    res.status(httpStatus.OK).json({
      statusCode: httpStatus.OK,
      success: true,
      message: "Login successful",
      data: { accessToken },
    });
  } catch (error) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      statusCode: httpStatus.INTERNAL_SERVER_ERROR,
      success: false,
      message: "An error occurred during login",
      error: error.message,
    });
  }
};
