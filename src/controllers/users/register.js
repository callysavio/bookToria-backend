import httpStatus from "http-status";
import User from "../../models/user.js";
//controller for user registration
export const register = async (req, res) => {
  try {
    //1. Get user input
    const { username, email, password, role } = req.body;
    //2.Define the user  variable to store the user data
    let user;
    //3. Check if the user already exists in the database
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(httpStatus.CONFLICT).json({
        statusCode: httpStatus.CONFLICT,
        success: false,
        message: "User already exists with this email",
      });
    }
    //4. Create a new user
    user = await User.create({ username, email, password, role });
    //5. Return a success response with the created user data
    return res.status(httpStatus.CREATED).json({
      statusCode: httpStatus.CREATED,
      success: true,
      message: "User registered successfully",
      data: {
        id: user._id,
        profilePicture: user.profilePicture,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      statusCode: httpStatus.INTERNAL_SERVER_ERROR,
      success: false,
      message: "An error occurred during registration",
      error: error.message,
    });
  }
};
