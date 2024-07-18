import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from 'dotenv';
import { userModel } from "./models/User.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import cookieParser from "cookie-parser";

dotenv.config({
    path: "./.env"
})

const PORT = process.env.PORT || 3000;


const salt = bcrypt.genSaltSync(10);
const secret = process.env.secret

const app = express();
app.use(cors({credentials: true, origin:'http://localhost:5173'}));
app.use(express.json());
app.use(cookieParser());

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
        const userDoc = await userModel.create({
            username, 
            password: bcrypt.hashSync(password, salt),
        });

        res.json(userDoc);
    } catch (error) {
        res.status(400).json(error)
    }

});

app.post('/login', async (req, res) => {
    const {username, password} = req.body;
    const userDoc = await userModel.findOne({username});
    const passOk = bcrypt.compareSync(password, userDoc.password);
    if(passOk){
        jwt.sign({ username, id:userDoc._id }, secret, {}, function(err, token) {
            if(err) throw err;
            res.cookie('token', token).json({
                id: userDoc._id,
                username,
            });
          });
    }else{
        res.status(400).json('Wrong Credentials.')
    }
})

app.get('/profile', (req, res) =>{
    const {token} = req.cookies;
    jwt.verify(token, secret, {}, (err, info)=>{
        if(err) throw err;
        res.json(info);
    })
    res.json(req.cookies)
})

app.post('/logout', (req, res)=>{
    res.cookie('token', '').json('ok')
})

app.listen(PORT, ()=>{
    console.log(`Listening at PORT ${PORT}...`)
})

