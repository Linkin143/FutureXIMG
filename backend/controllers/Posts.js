import { v2 as cloudinary } from "cloudinary";
import * as dotenv from "dotenv";
import { createError } from "../error.js";
import Post from "../models/posts.js";

dotenv.config();

//// Configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET

});

//get All Posts
export const getAllPosts = async (req, res, next) => {
    try {
        const posts = await Post.find({});
        return res.status(200).json({ success: true, data: posts })
    } catch (error) {
        next(createError(error.status, error?.response?.data?.error?.message || error.message));
    }
}

//Create Posts
export const createPost = async (req, res, next) => {
    try {
        const { name, prompt, photo } = req.body;

        // ✅ Validate Input
        if (!name || !prompt || !photo) {
            return next(createError(400, "All fields (name, prompt, photo) are required"));
        }

        const photoUrl = await cloudinary.uploader.upload(photo,
            {
                //folder: "ai_posts",      // Optional: Cloudinary folder
                width: 512,
                height: 512,
                crop: "fill",            // Ensures the image is cropped to fit exactly 512x512
                gravity: "auto",         // Smart cropping based on content
            }
        );
        const newPost = await Post.create({
            name,
            prompt,
            photo: photoUrl.secure_url,
        })
        return res.status(201).json({ success: true, data: newPost })

    } catch (error) {
        next(createError(error.status, error?.response?.data?.error?.message || error.message));
    }
}