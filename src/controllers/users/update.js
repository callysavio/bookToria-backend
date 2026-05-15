import User from "../../models/user.js";
import httpStatus from "http-status";
// Controller for updating user details
const updateUser = async (req, res) => {
  try {
    // 1. Get user ID from the request parameters
    const { id } = req.params;
    // 2. Get the data to be updated user data from the request body
    const { username, password, role } = req.body;
    // 3. Find the user by ID and update the details
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { username: username, password: password, role: role },
      { new: true },
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
