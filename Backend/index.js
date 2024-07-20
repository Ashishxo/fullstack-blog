import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from 'dotenv';
import { userModel } from "./models/User.js";
import { postModel } from "./models/Post.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import cookieParser from "cookie-parser";
import multer from "multer";
import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';


const uploadMiddleware = multer({ dest: 'uploads/' })

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

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

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

    try {
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
    } 
    
    catch (error) {
        console.log(error)
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

app.post('/post', uploadMiddleware.single('file'), async (req, res) => {
    const {originalname, path} = req.file;
    const {title, summary, content} = req.body;
    const parts = originalname.split('.');
    const extension = parts[parts.length - 1];
    const newPath = path + '.' + extension;

    
    fs.renameSync(path, newPath);

    const {token} = req.cookies;
    jwt.verify(token, secret, {}, async (err, info)=>{
        if(err) throw err;

        const postDoc = await postModel.create({
            title,
            summary,
            content,
            cover: newPath,
            author: info.id
        })
        res.json(postDoc)
    })

    

    
})

app.get('/post', async (req, res)=>{
    res.json(await postModel.find().populate('author', ['username']).sort({createdAt: -1}).limit(20));
})


app.get('/post/:id', async (req, res) => {
    const {id} = req.params;
    const postDoc = await postModel.findById(id).populate('author', ['username']);
    res.json(postDoc);
})

app.put('/post',uploadMiddleware.single('file'), async (req,res) => {
    let newPath = null;
    if (req.file) {
      const {originalname,path} = req.file;
      const parts = originalname.split('.');
      const ext = parts[parts.length - 1];
      newPath = path+'.'+ext;
      fs.renameSync(path, newPath);
    }
  
    const {token} = req.cookies;
    jwt.verify(token, secret, {}, async (err,info) => {
      if (err) throw err;
      const {id,title,summary,content} = req.body;
      const postDoc = await postModel.findById(id);
      const isAuthor = JSON.stringify(postDoc.author) === JSON.stringify(info.id);
      if (!isAuthor) {
        return res.status(400).json('you are not the author');
      }
      postDoc.title = title;
      postDoc.summary = summary;
      postDoc.content = content;
      postDoc.cover = newPath? newPath : postDoc.cover;
      await postDoc.save()
  
      res.json(postDoc);
    });
  
  });

app.listen(PORT, ()=>{
    console.log(`Listening at PORT ${PORT}...`)
})

