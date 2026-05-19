import cloudinary from "../config/cloudinary.js";

const uniquePublicIds = (publicIds) => [
  ...new Set(publicIds.filter((publicId) => Boolean(publicId))),
];

export const deleteCloudinaryAsset = async (publicId) => {
  if (!publicId) {
    return null;
  }

  return cloudinary.uploader.destroy(publicId, { invalidate: true });
};

export const deleteCloudinaryAssets = async (publicIds = []) => {
  const ids = uniquePublicIds(publicIds);

  return Promise.all(ids.map((publicId) => deleteCloudinaryAsset(publicId)));
};

export const cleanupUploadedFiles = async (files = []) => {
  const publicIds = uniquePublicIds(files.map((file) => file?.filename));

  return Promise.allSettled(
    publicIds.map((publicId) => deleteCloudinaryAsset(publicId)),
  );
};

export const getUploadedFile = (req, fieldName) => {
  if (req.file?.fieldname === fieldName) {
    return req.file;
  }

  const files = req.files?.[fieldName];

  return Array.isArray(files) ? files[0] : undefined;
};

export const getUploadedFiles = (req, fieldName) => {
  if (Array.isArray(req.files)) {
    return req.files.filter((file) => file.fieldname === fieldName);
  }

  const files = req.files?.[fieldName];

  return Array.isArray(files) ? files : [];
};

export const toCloudinaryImage = (file) => ({
  url: file.path,
  publicId: file.filename,
});
