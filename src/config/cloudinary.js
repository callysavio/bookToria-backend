import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
<<<<<<< HEAD

dotenv.config();

=======
dotenv.config();
>>>>>>> 38e635b4e7ef2539f965217c7e409c84fe49e320
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
<<<<<<< HEAD

=======
>>>>>>> 38e635b4e7ef2539f965217c7e409c84fe49e320
export default cloudinary;
