import express from 'express';
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/auth.js"
import recipesRoutes from "./routes/recipes.js"
import { connectDB } from './config/db.js';

dotenv.config({ path: '../.env' });

const PORT = process.env.PORT || 5000

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/recipes", recipesRoutes);

app.get("/",(req,res) =>{
    res.send("server is running")
});

app.listen(PORT,()=>{
    connectDB();
    console.log(`server is running on port ${PORT}`)
})