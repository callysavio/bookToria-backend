import User from "../../models/user.js";
import httpStatus from "http-status";
import cloudinary from "../../config/cloudinary.js";
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

    //4. Delete old image if new image exists
    if (req.file) {
      // Delete old Cloudinary image
      if (User.profilePicturePublicId) {
        await cloudinary.uploader.destroy(User.profilePicturePublicId);
      }

      // Save new image
      updatedUser.profilePicture = req.file.path;

      updatedUser.profilePicturePublicId = req.file.filename;
    }

    // Update other fields
    updatedUser.username = username || updatedUser.username;

    updatedUser.password = password || updatedUser.password;

    updatedUser.role = role || updatedUser.role;

    await updatedUser.save();

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
