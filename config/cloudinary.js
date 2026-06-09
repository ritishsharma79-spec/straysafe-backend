import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";//browser cannot send an image as normal JSON in a complex package
        //Multer acts like a package opener
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key:    process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Tell multer to store uploads directly on Cloudinary
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "straysafe",        // images go into a "straysafe" folder on Cloudinary
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
    transformation: [{ width: 800, crop: "limit" }], // resize large images automatically
  },
});

export const upload = multer({ storage });