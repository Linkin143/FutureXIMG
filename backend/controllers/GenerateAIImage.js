import * as dotenv from "dotenv";
import OpenAI from "openai";
import Together from "together-ai";
import { createError } from "../error.js";

dotenv.config();

//SetUp OpenAI api key


const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

//SetUp TogetherAI api key
const together = new Together({
    apiKey: process.env.TOGETHER_API_KEY,
});

//controller to generate Image
export const generateAIImage = async (req, res, next) => {
    try {
        const { prompt } = req.body;

        if (!prompt || typeof prompt !== "string") {
            return next(createError(400, "Prompt is required and must be a string"));
        }

        const response = await together.images.create({
            model: "black-forest-labs/FLUX.1-dev",
            prompt,
            n: 1,
            width: 1024,
            height: 1024,
            response_format: "base64",
        });
        const generatedImage = response.data[0]?.b64_json;

        if (!generatedImage) {
            return next(createError(500, "Failed to generate image from Together AI"));
        }

        return res.status(200).json({ success: true, photo: generatedImage })
    } catch (error) {
        next(createError(error.status, error?.response?.data?.error?.message || error.message));
    }
}