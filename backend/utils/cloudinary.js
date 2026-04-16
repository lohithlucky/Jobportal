import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config();

const isPlaceholder = (val) => 
  !val || 
  val.includes("your_") || 
  val === "yoursecretkeyhere";

if (isPlaceholder(process.env.CLOUD_NAME) || isPlaceholder(process.env.API_KEY) || isPlaceholder(process.env.API_SECRET)) {
  console.log("⚠️ Cloudinary using placeholder keys. Enabling Mock Mode for development.");
  
  // Mock uploader to prevent "Server Error" during tests
  cloudinary.uploader.upload = async (file) => {
    console.log("🛠️ Mock Cloudinary Upload: File received (mock URL returned)");
    return {
      secure_url: "https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg"
    };
  };
} else {
  cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
  });
}

export default cloudinary;
