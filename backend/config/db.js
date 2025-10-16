import mongoose from "mongoose";

export const connectDB = async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Database connected successfully!🟢")
    } catch (error) {
        console.error("Database connection failed❌" , error.message);
        throw error;
    }
}

