import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

const storage = new CloudinaryStorage({
  cloudinary,

  params: {
    folder: "book-toria",
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
  },
});

const upload = multer({
  storage,
<<<<<<< HEAD

  limits: {
    fileSize: 2 * 1024 * 1024,
=======
  limits: {
    fileSize: 2 * 1024 * 1024, //Maximum size of 2MB
>>>>>>> 38e635b4e7ef2539f965217c7e409c84fe49e320
  },

  fileFilter: (req, file, cb) => {
    const allowedMimeTypes = [
      "image/png",
      "image/jpeg",
      "image/jpg",
      "image/webp",
    ];

    if (!allowedMimeTypes.includes(file.mimetype)) {
      return cb(new Error("Only image files are allowed"), false);
    }

    cb(null, true);
  },
});

export default upload;
