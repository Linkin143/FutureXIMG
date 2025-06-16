import cors from "cors";
import * as dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import GenerateImageRouter from "./routes/GenerateImage.js";
import PostRouter from "./routes/Posts.js";

dotenv.config();
const app = express();
app.use(cors());

// Allow large base64 payloads (e.g., 10MB)
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

const MONGODB_URL= process.env.MONGODB_URL;
const PORT= process.env.PORT || 8080;


//error handler
app.use((err,req,res,next)=>{
    const status = err.status || 500;
    const message = err.message || "Something is not working";
    return res.status(status).json({
        success: false,
        status,
        message,
    });
})


app.use("/api/post/", PostRouter);
app.use("/api/generateimage/",GenerateImageRouter);

//Default GET
app.get("/",  async (req,res)=>{
    res.status(200).json({
        message : "Hello Future Developers",
    });
    
})


// Function to start MDB server
 const connectDB = async () =>{
    
        mongoose.set("strictQuery", true);
        mongoose.connect(MONGODB_URL).then(()=>{
            console.log ("MongoDB Connected");
        })
     .catch ((err) => {
        console.error("Failed to Connect to DB server");
        console.error(err);
    });
 }


// Function to start server
const startServer = async()=>{

    try {
        
        app.listen(PORT, ()=>{
            console.log("server is running on the port 8080");
        });
        connectDB();
        

    } catch (error) {
        console.error("server not started");
        console.log(error);
    }

}

startServer();