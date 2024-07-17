import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { userModel } from "./models/User.js";

const app = express();
app.use(cors({credentials: true, origin:'http://localhost:5173'}));
app.use(express.json());

const connectDB = async () => {
    await mongoose.connect('mongodb+srv://ashishdhiwar:nW9vebZ7r6jqc47R@main.3hsboq8.mongodb.net/?retryWrites=true&w=majority&appName=main');
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

app.listen(4000, ()=>{
    console.log("Listening at PORT 4000...")
})


//nW9vebZ7r6jqc47R
//mongodb+srv://ashishdhiwar:<password>@main.3hsboq8.mongodb.net/?retryWrites=true&w=majority&appName=main