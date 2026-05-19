import httpStatus from "http-status";
import mongoose from "mongoose";
import User from "../../models/user.js";
import {
  cleanupUploadedFiles,
  deleteCloudinaryAsset,
  getUploadedFile,
} from "../../utils/cloudinaryAssets.js";

const canUpdateProfilePicture = (req, userId) =>
  req.user?.role === "admin" || String(req.user?.id) === String(userId);

export const updateProfilePicture = async (req, res) => {
  const { id } = req.params;
  const profilePicture = getUploadedFile(req, "profilePicture");
  const uploadedFiles = profilePicture ? [profilePicture] : [];
  let saved = false;

  try {
    if (!profilePicture) {
      return res.status(httpStatus.BAD_REQUEST).json({
        statusCode: httpStatus.BAD_REQUEST,
        success: false,
        message: "profilePicture is required",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      await cleanupUploadedFiles(uploadedFiles);

      return res.status(httpStatus.BAD_REQUEST).json({
        statusCode: httpStatus.BAD_REQUEST,
        success: false,
        message: "Invalid user ID",
      });
    }

    if (!canUpdateProfilePicture(req, id)) {
      await cleanupUploadedFiles(uploadedFiles);

      return res.status(httpStatus.FORBIDDEN).json({
        statusCode: httpStatus.FORBIDDEN,
        success: false,
        message: "You can only update your own profile picture",
      });
    }

    const user = await User.findById(id);

    if (!user) {
      await cleanupUploadedFiles(uploadedFiles);

      return res.status(httpStatus.NOT_FOUND).json({
        statusCode: httpStatus.NOT_FOUND,
        success: false,
        message: "User not found",
      });
    }

    const oldPublicId = user.profilePicturePublicId;

    user.profilePicture = profilePicture.path;
    user.profilePicturePublicId = profilePicture.filename;
    await user.save();
    saved = true;

    if (oldPublicId !== profilePicture.filename) {
      await deleteCloudinaryAsset(oldPublicId);
    }

    return res.status(httpStatus.OK).json({
      statusCode: httpStatus.OK,
      success: true,
      message: "Profile picture updated successfully",
      data: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        profilePicture: user.profilePicture,
        profilePicturePublicId: user.profilePicturePublicId,
      },
    });
  } catch (error) {
    if (!saved) {
      await cleanupUploadedFiles(uploadedFiles);
    }

    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      statusCode: httpStatus.INTERNAL_SERVER_ERROR,
      success: false,
      message: "An error occurred while updating the profile picture",
      error: error.message,
    });
  }
};
