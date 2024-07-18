import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from 'dotenv';
import { userModel } from "./models/User.js";

dotenv.config({
    path: "./.env"
})

const PORT = process.env.PORT || 3000;

const app = express();
app.use(cors({credentials: true, origin:'http://localhost:5173'}));
app.use(express.json());

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
    } catch (error) {
        console.log(error);
    }
    
}

connectDB();

app.post('/register', async (req, res)=>{
    const {username, password} = req.body;

    try {
        const userDoc = await userModel.create({username, password});
        res.json(userDoc);
    } catch (error) {
        res.status(400).json(error)
    }

    
    
});

app.listen(PORT, ()=>{
    console.log(`Listening at PORT ${PORT}...`)
})

