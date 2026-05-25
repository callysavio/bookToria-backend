import httpStatus from "http-status";

const uploadBlogImages = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(httpStatus.BAD_REQUEST).json({
        statusCode: httpStatus.BAD_REQUEST,
        success: false,
        message: "No images uploaded",
      });
    }

    const uploadedImages = req.files.map((file) => ({
      url: file.path,
      public_id: file.filename,
    }));

    return res.status(httpStatus.OK).json({
      statusCode: httpStatus.OK,
      success: true,
      message: "Images uploaded successfully",
      data: uploadedImages,
    });
  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      statusCode: httpStatus.INTERNAL_SERVER_ERROR,
      success: false,
      message: "Error uploading images",
      error: error.message,
    });
  }
};

export { uploadBlogImages };
