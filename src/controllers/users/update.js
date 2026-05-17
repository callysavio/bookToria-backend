import User from "../../models/user.js";
import httpStatus from "http-status";
import bcrypt from "bcryptjs";
// Controller for updating user details
const updateUser = async (req, res) => {
  try {
    // 1. Get user ID from the request parameters
    const { id } = req.params;
    // 2. Get the data to be updated user data from the request body
    const { username, email, password, role } = req.body;
    const updateData = {};

    if (username !== undefined) updateData.username = username;
    if (email !== undefined) updateData.email = email;
    if (role !== undefined) updateData.role = role;

    if (password !== undefined) {
      const salt = await bcrypt.genSalt(10);
      updateData.password = await bcrypt.hash(password, salt);
    }

    // 3. Find the user by ID and update the details
    const updatedUser = await User.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true },
    );
    if (!updatedUser) {
      return res.status(httpStatus.NOT_FOUND).json({
        statusCode: httpStatus.NOT_FOUND,
        success: false,
        message: "User not found",
      });
    }
    res.status(httpStatus.OK).json({
      statusCode: httpStatus.OK,
      success: true,
      message: "User details updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      statusCode: httpStatus.INTERNAL_SERVER_ERROR,
      success: false,
      message: "Error updating user details",
      error: error.message,
    });
  }
};
export { updateUser };
