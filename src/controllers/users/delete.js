import User from "../../models/user.js";
import httpStatus from "http-status";
import cloudinary from "../../config/cloudinary.js";
//controller for deleting a user
export const deleteUser = async (req, res) => {
  try {
    //1. get user id from the request parameter
    const { id } = req.params;
    //2. check if user exists
    let user = await User.findById(id);
    if (!user) {
      return res.status(httpStatus.NOT_FOUND).json({
        status: httpStatus.NOT_FOUND,
        success: false,
        message: "User not found",
      });
    }

    // delete profile picture from cloudinary
    if (user.profilePicturePublicId) {
      await cloudinary.uploader.destroy(
        user.profilePicturePublicId,
      )
    }

    //3. delete the user
    await User.findByIdAndDelete(id);
    //4. return success response
    return res.status(httpStatus.OK).json({
      statusCode: httpStatus.OK,
      success: true,
      message: "User deleted successfully",
    });
    //5. handle errors
  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      statusCode: httpStatus.INTERNAL_SERVER_ERROR,
      success: false,
      message: "Error deleting user",
      error: error.message,
    });
  }
};
