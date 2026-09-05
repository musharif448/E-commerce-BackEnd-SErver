import {v2 as cloudinary} from 'cloudinary'
import dotenv from 'dotenv';
dotenv.config();

const connectCloudinary = async () =>{
  cloudinary.config({
   cloud_name: process.env.CLOUDINARY_CLOUD_NAME || "kd4icc0c",
  api_key: process.env.CLOUDINARY_API_KEY || "856174262995246",
  api_secret: process.env.CLOUDINARY_API_SECRET || "WfPAelylbn_0fAfmz1e3tm4zF1c"
  })
}

async function runTest() {
  try {
    // Try uploading a public image URL directly to see if your keys work
    const result = await cloudinary.uploader.upload("https://res.cloudinary.com/demo/image/upload/sample.jpg", {
      folder: "test"
    });
    console.log("SUCCESS:", result.secure_url);
  } catch (error) {
    console.error("CLOUDINARY TEST FAILED:", error);
  }
}

runTest();


console.log("Checking Cloudinary Config:", {
  name: process.env.CLOUDINARY_CLOUD_NAME ? "Loaded" : "Missing",
  key: process.env.CLOUDINARY_API_KEY ? "Loaded" : "Missing",
  secret: process.env.CLOUDINARY_API_SECRET ? "Loaded" : "Missing",
});


export default connectCloudinary;